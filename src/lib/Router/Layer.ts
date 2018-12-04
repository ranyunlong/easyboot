/**
 * @class Layer
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
import { Route, IModule, MappingDataParams, Validator } from './Route';
import { Context } from '../Context';
import { TClass } from '../Module';
import { createHash } from 'crypto'
import { HttpException } from '../HttpException';

export class Layer {
    // Route path
    public path: string;
    // Route Regexp
    public regexp: RegExp;
    // Controller handle key
    public handleKey: string;
    // Http request url
    public requestUrl: string;
    // Http request path
    public requestPath: string;
    // Http request method
    public requestMethod: string;
    // controller
    public controller: object;
    public arguments: any[] = []
    // metadata
    public metadata: object[];
    constructor(options: Route, context: Context) {
        this.requestPath = context.path
        this.requestUrl = context.url
        this.requestMethod = context.method
        this.path = options.path
        this.regexp = options.regexp
        this.handleKey = options.handleKey
        this.createMetaData(options.decorators.metadata, options.module)
        this.createController(options.controller)
        this.parseParam(options, context)
    }

    /**
     * Create MetaData
     */
    private createMetaData(metadata: TClass[] = [], imodule: IModule) {
        const provides = imodule.providers || []
        this.metadata = metadata.map((Service) => {
            const token = createHash('md5').update(Service.toString()).digest('hex')
            const data = provides.find((service) => {
                return service.token === token && service.provide === Service.name
            })

            if (!data) {
                throw new Error(`${imodule.name} does not have '${Service.name}' service .`)
            }

            return data.value
        })
    }

    /**
     * Create Controller
     */
    private createController(Controller: TClass) {
        this.controller = new Controller(...this.metadata)
    }

    /**
     * Parse params
     */
    private parseParam(options: Route, context: Context) {
        const { pathParamsKeys = [], regexp } = options
        if (options.decorators.params && options.decorators.params.size > 0) {
            const params: any = {}
            if (pathParamsKeys.length > 0) {
                const execParams = regexp.exec(context.path)
                pathParamsKeys.forEach((k, i) => {
                    params[k.name] = execParams[i + 1]
                })
            }
            options.decorators.params.forEach((opts = {}, index) => {
                const { Entity, keys, validators, rule } = opts
                if (!Entity && !keys && !validators && !rule) {
                    this.arguments[index] = params
                } else if (Entity) {
                    console.log(Entity)
                } else if (keys && validators) {
                    const value = params[keys as string]
                    const validates = validators as Validator[]
                    validates.forEach((validator) => {
                        if (validator) {
                            let result: boolean = true
                            if (validator.options) {
                                result = (validator as any).validator(value, validator.options)
                            } else {
                                result = (validator as any).validator(value)
                            }
                            if (!result) {
                                throw new HttpException({
                                    data: validator.message || `Invalid ${keys}`
                                })
                            }
                        }
                    })
                    this.arguments[index] = value
                } else if (rule) {
                    const data: any = {}
                    Object.keys(rule).forEach((k) => {
                        const value = params[k]
                        const validators = rule[k]
                        if (Array.isArray(validators)) {
                            validators.forEach((validator) => {
                                let result = true;
                                if (validator.options) {
                                    result = (validator as any).validator(value, validator.options)
                                } else {
                                    result = (validator as any).validator(value)
                                }
                                if (!result) {
                                    throw new HttpException({
                                        data: validator.message || `Invalid ${k}`
                                    })
                                }
                            })
                        } else {
                            let result = true;
                                if (validators.options) {
                                    result = (validators as any).validator(value, validators.options)
                                } else {
                                    result = (validators as any).validator(value)
                                }
                                if (!result) {
                                    throw new HttpException({
                                        data: validators.message || `Invalid ${k}`
                                    })
                                }
                        }
                        data[k] = value
                    })
                    this.arguments[index] = data
                } else if (keys) {
                    if (Array.isArray(keys)) {
                        const data: any = {}
                        keys.forEach((k) => {
                            data[k] = params[k]
                        })
                    } else {
                        this.arguments[index] = params[keys]
                    }
                }
            })
        }
    }

    /**
     * parseQuery
     */
    private parseQuery(params: MappingDataParams = new Map(), context: Context) {
        return;
    }
}
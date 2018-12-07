/**
 * @class Layer
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
import { Route, IModule} from './Route';
import { Context } from '../Context';
import { TClass } from '../Module';
import { createHash } from 'crypto'
import { HttpException, HttpExceptionConstructor } from '../HttpException';
import { requestValidator } from '../EasyBootValidators/requestValidator';
import { BodyParserService } from '../BodyParserService';
import { RequestParameterDecoratorOptions } from '../Controller';

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
    // Http response status code
    public statusCode: number;
    // Http response status message
    public statusMessage: string;
    // Http response set headers;
    public setHeaders: { [key: string]: string };
    // Http response set content type;
    public contentType: string;
    // Http response HttpException;
    public exception: HttpException;
    public exceptionCatch: HttpExceptionConstructor;
    // controller
    public controller: { [key: string]: any };
    // Contrllor handler inject arguments
    public handleArguments: any[] = []
    // metadata
    public metadata: object[];
    constructor(private options: Route, context: Context) {
        this.requestPath = context.path
        this.requestUrl = context.url
        this.requestMethod = context.method
        this.path = options.path
        this.regexp = options.regexp
        this.handleKey = options.handleKey
        this.statusCode = options.decorators.statusCode
        this.statusMessage = options.decorators.statusMessage
        this.contentType = options.decorators.contentType
        this.exception = options.decorators.exception
        this.exceptionCatch = options.decorators.exceptionCatch
        if (options.decorators.setHeaders) {
            this.setHeaders = this.setHeaders || {}
            options.decorators.setHeaders.forEach((value, key) => {
                this.setHeaders[key] = value
            })
        }
        this.createMetaData(options.decorators.metadata, options.module)
        this.createController(options.controller)
    }

    /**
     * Create MetaData
     */
    private async createMetaData(metadata: TClass[] = [], imodule: IModule) {
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
     * Parse Param
     */
    public async parseParam(context: Context) {
        const { options } = this
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
                const result = requestValidator('query', params, opts, index)
                this.handleArguments[index] = result
            })
        }
    }

    /**
     * Parse Query
     */
    public async parseQuery(context: Context) {
        const { options } = this
        const requestQuerys = context.query
        const querys = options.decorators.querys || new Map()
        querys.forEach((query, index) => {
           const result = requestValidator('query', requestQuerys, query, index)
           this.handleArguments[index] = result
        })
    }

    /**
     * Parse Body
     */
    public async parseBody(context: Context, service: BodyParserService) {
        const { options} = this
        const { decorators = {} } = options
        const { bodys = new Map<number, RequestParameterDecoratorOptions>() } = decorators
        const requestBody = await service.parseBody(context)
        bodys.forEach((body, index) => {
            const result = requestValidator('body', requestBody, body, index)
            this.handleArguments[index] = result
        })
    }

    /**
     * Parse File
     */
    public async parseFile(context: Context, service: BodyParserService) {
        //
    }
}
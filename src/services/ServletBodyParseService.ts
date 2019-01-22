/**
 * @class ServletBodyParseService
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { ServletService } from '../core/ServletService';
import { ServiceMetadata } from '../core/ServiceMetadata';
import { ServletContext } from '../core/ServletContext';
import * as parse from 'co-body'
import * as typeIs from 'type-is'

export class ServletBodyParseService extends ServletService {
    constructor(
        public strict: boolean = true,
        public limit: Limit = {
            json: '1mb',
            form: '56kb',
            text: '56kb'
        },
        public opts: Options = {}
    ) {
        super('body')
    }
    public async onLaunch(metadata: ServiceMetadata): Promise<null | undefined | object> {
        return await this.parse(metadata.context)
    }

    public async parse(context: ServletContext): Promise<object> {
        const { isParseJson = true, isParseText = true, isParseUrlencoded = true } = this.opts
        let body: any = {}
        if (/(GET|DELETE|HEAD|COPY|PURGE|UNLOCK)/.test(context.method)) return null
        if (isParseJson && typeIs(context.req, 'json') === 'json') {
            body = await parse.json(context.req, {
                limit: this.limit.json,
                strict: this.strict
            })
        }

        if (isParseText && typeIs(context.req, 'urlencoded') === 'urlencoded') {
            body = await parse.form(context.req, {
                limit: this.limit.form,
                strict: this.strict
            })
        }

        if (isParseUrlencoded && typeIs(context.req, 'text') === 'text') {
            body = await parse.text(context.req, {
                limit: this.limit.text,
                strict: this.strict
            })
        }

        return body
    }
}

interface Limit {
    /**
     * The byte (if integer) limit of the JSON body, default 1mb
     */
    json?: string;
    /**
     * The byte (if integer) limit of the form body, default 56kb
     */
    form?: string;
    /**
     * The byte (if integer) limit of the text body, default 56kb
     */
    text?: string;
}

interface Options {
    /**
     * Parse json bodies, default true
     */
    isParseJson?: boolean;
    /**
     * Parse text bodies, default true
     */
    isParseText?: boolean;
    /**
     * Parse urlencoded bodies, default true
     */
    isParseUrlencoded?: boolean;
}
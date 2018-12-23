/**
 * @namepace MetadataEnums
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

export const PREFIX = 'easyboot:'

export namespace MetadataEnums {
    export enum Base {
        PARAMTYPES = 'design:paramtypes',
        TYPE = 'design:type',
        RETURNTYPES = 'design:returntype',
        CONFIGURATION = 'easyboot:configuration',
        VALIDATORS = 'easyboot:validators',
        EASYBOOTMODULE= 'easyboot:module'
    }
    export enum Controller {
        CONTROLLER = 'easyboot:controller',
        IS_CONTROLLER = 'easyboot:is:controller',
        RESPONSE = 'easyboot:response',
        REQUEST = 'easyboot:request',
        SESSION = 'easyboot:session',
        REQUEST_MAPPING = 'easyboot:request:mapping',
        REQUEST_PARAM = 'easyboot:request:param',
        REQUEST_BODY = 'easyboot:request:body',
        REQUEST_FILE = 'easyboot:request:file',
        REQUEST_QUERY = 'easyboot:request:query',
        EXCEPTION_CAPTURE = 'easyboot:exception:capture',
        EXCEPTION = 'easyboot:exception',
        STATUS_CODE = 'easyboot:status:code',
        STATUS_MESSAGE = 'easyboot:status:message',
        CONTENT_TYPE = 'easyboot:content:type'
    }
    export enum Module {
        IMPORTS = 'easyboot:imports',
        PROVIDERS = 'easyboot:providers',
        CONTROLLERS = 'easyboot:controllers',
        EXPORTS = 'easyboot:exports'
    }
}
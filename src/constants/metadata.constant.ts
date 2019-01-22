export const BASE: BASE = {
    CONFIGURATION: 'easyboot:decorator:configuration',
    ENTITY: 'easyboot:decorator:entity',
    CONTROLLER: 'easyboot:decorator:controller',
    INJECTABLE: 'easyboot:decorator:injectable',
    TYPE: 'design:type',
    PARAMTYPES: 'design:paramtypes',
    RETURNTYPE: 'design:returntype',
    VALIDATE: 'easyboot:decorator:validate',
    FORM: 'easyboot:decorator:form',
    SERVICE: 'easyboot:decorator:service',
    GLOBAL_SERVICE: 'easyboot:decorator:service:global'
}

export interface BASE {
    CONFIGURATION: string;
    ENTITY: string;
    CONTROLLER: string;
    INJECTABLE: string;
    TYPE: string;
    PARAMTYPES: string;
    RETURNTYPE: string;
    VALIDATE: string;
    SERVICE: string;
    FORM: String;
    GLOBAL_SERVICE: string;
}

export const CONTROLLER: CONTROLLER = {
    CONTENT_TYPE: 'easyboot:decorator:response:content:type',
    EXCEPTION_CAPTURE: 'easyboot:decorator:response:exception:capture',
    EXCEPTION: 'easyboot:decorator:response:exception:default',
    REQUEST_MAPPING: 'easyboot:decorator:request:mapping',
    REQUEST: 'easyboot:decorator:request',
    REQUEST_QUERY: 'easyboot:decorator:request:query',
    REQUEST_BODY: 'easyboot:decorator:request:body',
    REQUEST_PARAM: 'easyboot:decorator:request:param',
    REQUEST_FILE: 'easyboot:decorator:request:file',
    RESPONSE: 'easyboot:decorator:response',
    STATUS_CODE: 'easyboot:decorator:response:status:code',
    STATUS_MESSAGE: 'easyboot:decorator:response:status:message',
    SESSION: 'easyboot:decorator:session'
}

export interface CONTROLLER {
    CONTENT_TYPE: string;
    EXCEPTION_CAPTURE: string;
    EXCEPTION: string;
    REQUEST_MAPPING: string;
    REQUEST: string;
    RESPONSE: string;
    STATUS_CODE: string;
    STATUS_MESSAGE: string;
    REQUEST_QUERY: string;
    REQUEST_BODY: string;
    REQUEST_PARAM: string;
    REQUEST_FILE: string;
    SESSION: string;
}

export const MODULE: MODULE = {
    CONTROLLERS: 'easyboot:decorator:module:controllers',
    PROVIDERS: 'easyboot:decorator:module:providers',
    BOOTSTRAP: 'easyboot:decorator:module:bootstrap'
    // IMPORTS: 'easyboot:decorator:module:imports',
    // EXPORTS: 'easyboot:decorator:module:exports'
}

export interface MODULE {
    CONTROLLERS: string;
    PROVIDERS: string;
    BOOTSTRAP: string
    // IMPORTS: string;
    // EXPORTS: string;
}
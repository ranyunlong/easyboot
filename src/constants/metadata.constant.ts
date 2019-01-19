export const BASE: BASE = {
    CONFIGURATION: 'easyboot:decorator:configuration',
    ENTITY: 'easyboot:decorator:entity',
    CONTROLLER: 'easyboot:decorator:controller',
    INJECTABLE: 'easyboot:decorator:injectable',
    TYPE: 'design:type',
    PARAMTYPES: 'design:paramtypes',
    RETURNTYPE: 'design:returntype',
    IS: 'easyboot:decorator:is',
    FORM: 'easyboot:decorator:form'
}

export interface BASE {
    CONFIGURATION: string;
    ENTITY: string;
    CONTROLLER: string;
    INJECTABLE: string;
    TYPE: string;
    PARAMTYPES: string;
    RETURNTYPE: string;
    IS: string;
    FORM: String;
}

export const CONTROLLER: CONTROLLER = {
    CONTENT_TYPE: 'easyboot:decorator:response:content:type',
    EXCEPTION_CAPTURE: 'easyboot:decorator:response:exception:capture',
    EXCEPTION: 'easyboot:decorator:response:exception:default',
    REQUEST_MAPPING: 'easyboot:decorator:request:mapping',
    REQUEST: 'easyboot:decorator:request',
    RESPONSE: 'easyboot:decorator:response',
    STATUS_CODE: 'easyboot:decorator:response:status:code',
    STATUS_MESSAGE: 'easyboot:decorator:response:status:message'
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
}

export const MODULE: MODULE = {
    CONTROLLERS: 'easyboot:decorator:module:controllers',
    PROVIDERS: 'easyboot:decorator:module:providers',
    BOOTSTRAP: 'easyboot:decorator:module:bootstrap',
    GLOBAL: 'easyboot:decorator:module:global'
    // IMPORTS: 'easyboot:decorator:module:imports',
    // EXPORTS: 'easyboot:decorator:module:exports'
}

export interface MODULE {
    CONTROLLERS: string;
    PROVIDERS: string;
    BOOTSTRAP: string;
    GLOBAL: string;
    // IMPORTS: string;
    // EXPORTS: string;
}
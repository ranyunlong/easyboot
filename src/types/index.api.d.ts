export interface Ctor {
    new (...args: any): any;
}
export type Env = 'development' | 'production'

export interface Modules {
    [key: string]: Ctor;
}
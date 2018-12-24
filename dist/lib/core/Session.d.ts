export declare const Session: SessionConstructor;
export declare type Session<T> = T;
interface SessionConstructor {
    new <T extends object>(arg: T): T;
}
export {};

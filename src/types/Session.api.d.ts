export interface SessionConstructor {
    new <T extends object>(arg: T): T;
}

export type Session<T> = T;
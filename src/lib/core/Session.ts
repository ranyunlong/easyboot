export const Session = class {
    constructor(sessions: any) {
        if (typeof sessions === 'object' && !Array.isArray(sessions)) {
            Object.keys(sessions).forEach((k: any) => {
                (this as any)[k] = (sessions as any)[k]
            })
        }
    }
} as SessionConstructor

export type Session<T> = T;

interface SessionConstructor {
    new <T extends object>(arg: T): T;
}
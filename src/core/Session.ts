/**
 * @class SessionEntity
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

class SessionEntity {
    constructor(sessions: any) {
        if (typeof sessions === 'object' && !Array.isArray(sessions)) {
            Object.keys(sessions).forEach((k: any) => {
                (this as any)[k] = (sessions as any)[k]
            })
        }
    }
}

interface SessionConstructor {
    new <T extends object>(arg: T): T;
}

export const Session = SessionEntity as SessionConstructor
export type Session<T> = T;
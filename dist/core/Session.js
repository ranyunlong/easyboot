"use strict";
/**
 * @class SessionEntity
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
class SessionEntity {
    constructor(sessions) {
        if (typeof sessions === 'object' && !Array.isArray(sessions)) {
            Object.keys(sessions).forEach((k) => {
                this[k] = sessions[k];
            });
        }
    }
}
exports.Session = SessionEntity;
//# sourceMappingURL=Session.js.map
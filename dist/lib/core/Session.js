"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = class {
    constructor(sessions) {
        if (typeof sessions === 'object' && !Array.isArray(sessions)) {
            Object.keys(sessions).forEach((k) => {
                this[k] = sessions[k];
            });
        }
    }
};

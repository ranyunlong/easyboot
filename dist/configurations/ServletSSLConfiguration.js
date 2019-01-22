"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServletSSLConfiguration {
    constructor(configuration) {
        if (typeof configuration !== 'object' || Array.isArray(configuration))
            return;
        Object.keys(configuration).forEach((key) => {
            this[key] = configuration[key];
        });
    }
}
exports.ServletSSLConfiguration = ServletSSLConfiguration;
//# sourceMappingURL=ServletSSLConfiguration.js.map
"use strict";
/**
 * @class ServletConfiguration
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const RouterConfiguration_1 = require("./RouterConfiguration");
const BodyParseConfiguration_1 = require("./BodyParseConfiguration");
const SessionConfiguration_1 = require("./SessionConfiguration");
class ServletConfiguration {
    constructor() {
        // Server http port config
        this.port = 3000;
        // Server http host config
        this.host = 'localhost';
        // Server keys config
        this.keys = ['easyboot:sess'];
        // Server env mode config
        this.env = 'development';
        // Server subdomainOffset config
        this.subdomainOffset = 2;
        // Server router RegExp config
        this.router = new RouterConfiguration_1.RouterConfiguration();
        // Server body parse config;
        this.bodyConfig = new BodyParseConfiguration_1.BodyParseConfiguration();
        // Server session config
        this.sessionConfig = new SessionConfiguration_1.SessionConfiguration();
    }
}
exports.ServletConfiguration = ServletConfiguration;

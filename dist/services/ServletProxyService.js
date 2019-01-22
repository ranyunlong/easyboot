"use strict";
/**
 * @class ServletProxyService
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const httpProxy = require("http-proxy");
const parseUrl = require("parseurl");
const ServletService_1 = require("../core/ServletService");
const _proxy = httpProxy.createProxyServer({});
class ServletProxyService extends ServletService_1.ServletService {
    constructor(options) {
        super('staic-serve');
        this.options = options;
        this._proxy = _proxy;
    }
    async onBeforeController(metadata) {
        const { context } = metadata;
        if (context.finished || context.headerSent || !context.writable)
            return;
        if (!Object.keys(this.options).length)
            return;
        await this.proxyTable(context);
    }
    async proxyTable(context) {
        const { options } = this;
        for (let key in options) {
            await this.proxy(key, context, options[key]);
        }
    }
    async proxy(path, context, proxyOptions) {
        return new Promise((next, reject) => {
            const { changeOrigin, pathRewrite, target } = proxyOptions;
            if (!/^\//.test(path))
                path = `/${path}`;
            if (!/\^/.test(path))
                path = `^${path}`;
            if (RegExp(path).test(context.path)) {
                if (typeof changeOrigin === 'undefined')
                    proxyOptions.changeOrigin = true;
                const requestPath = context.path;
                for (let item in pathRewrite) {
                    const originItem = item;
                    if (!/\^/.test(item))
                        item = '^' + item;
                    if (RegExp(item).test(requestPath)) {
                        const search = parseUrl(context.req).search;
                        context.req.url = requestPath.replace(RegExp(item), pathRewrite[originItem]).replace(/[\/]{2,}/, '/') + (search ? search : '');
                    }
                }
                // proxy
                _proxy.web(context.req, context.res, proxyOptions);
                _proxy.on('error', function (err) {
                    reject(err);
                });
            }
            else {
                next();
            }
        });
    }
}
exports.ServletProxyService = ServletProxyService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmxldFByb3h5U2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlcy9TZXJ2bGV0UHJveHlTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7R0FLRzs7QUFFSCx3Q0FBdUM7QUFNdkMscUNBQW9DO0FBRXBDLDJEQUF3RDtBQUd4RCxNQUFNLE1BQU0sR0FBYyxTQUFTLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUE7QUFFekQsTUFBYSxtQkFBb0IsU0FBUSwrQkFBYztJQUVuRCxZQUNXLE9BQW1CO1FBRTFCLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQTtRQUZiLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFGdkIsV0FBTSxHQUFjLE1BQU0sQ0FBQTtJQUtqQyxDQUFDO0lBQ00sS0FBSyxDQUFDLGtCQUFrQixDQUFDLFFBQXlCO1FBQ3JELE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxRQUFRLENBQUE7UUFDNUIsSUFBSSxPQUFPLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxVQUFVLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUTtZQUFFLE9BQU87UUFDeEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU07WUFBRSxPQUFPO1FBQzlDLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNsQyxDQUFDO0lBRU0sS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUF1QjtRQUMzQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFBO1FBQ3hCLEtBQUssSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFO1lBQ3JCLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1NBQy9DO0lBQ0wsQ0FBQztJQUVNLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBWSxFQUFFLE9BQXVCLEVBQUUsWUFBMEI7UUFDaEYsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNoQyxNQUFNLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsR0FBRyxZQUFZLENBQUE7WUFDMUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUFFLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFBO1lBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFBRSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQTtZQUN2QyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNqQyxJQUFJLE9BQU8sWUFBWSxLQUFLLFdBQVc7b0JBQUUsWUFBWSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUE7Z0JBQ3pFLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUE7Z0JBQ2hDLEtBQUssSUFBSSxJQUFJLElBQUksV0FBVyxFQUFFO29CQUMxQixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUE7b0JBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzt3QkFBRSxJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQTtvQkFDdkMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFO3dCQUNoQyxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQTt3QkFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQTtxQkFDakk7aUJBQ0o7Z0JBQ0QsUUFBUTtnQkFDUixNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRSxZQUFZLENBQUMsQ0FBQTtnQkFDbEQsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBUyxHQUFHO29CQUMzQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQ2YsQ0FBQyxDQUFDLENBQUE7YUFDTDtpQkFBTTtnQkFDSCxJQUFJLEVBQUUsQ0FBQTthQUNUO1FBQ0wsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0NBQ0o7QUEvQ0Qsa0RBK0NDIn0=
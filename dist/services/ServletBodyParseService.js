"use strict";
/**
 * @class ServletBodyParseService
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const ServletService_1 = require("../core/ServletService");
const parse = require("co-body");
const typeIs = require("type-is");
class ServletBodyParseService extends ServletService_1.ServletService {
    constructor(strict = true, limit = {
        json: '1mb',
        form: '56kb',
        text: '56kb'
    }, opts = {}) {
        super('body');
        this.strict = strict;
        this.limit = limit;
        this.opts = opts;
    }
    async onLaunch(metadata) {
        return await this.parse(metadata.context);
    }
    async parse(context) {
        const { isParseJson = true, isParseText = true, isParseUrlencoded = true } = this.opts;
        let body = {};
        if (/(GET|DELETE|HEAD|COPY|PURGE|UNLOCK)/.test(context.method))
            return null;
        if (isParseJson && typeIs(context.req, 'json') === 'json') {
            body = await parse.json(context.req, {
                limit: this.limit.json,
                strict: this.strict
            });
        }
        if (isParseText && typeIs(context.req, 'urlencoded') === 'urlencoded') {
            body = await parse.form(context.req, {
                limit: this.limit.form,
                strict: this.strict
            });
        }
        if (isParseUrlencoded && typeIs(context.req, 'text') === 'text') {
            body = await parse.text(context.req, {
                limit: this.limit.text,
                strict: this.strict
            });
        }
        return body;
    }
}
exports.ServletBodyParseService = ServletBodyParseService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmxldEJvZHlQYXJzZVNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvU2VydmxldEJvZHlQYXJzZVNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7OztHQUtHOztBQUVILDJEQUF3RDtBQUd4RCxpQ0FBZ0M7QUFDaEMsa0NBQWlDO0FBRWpDLE1BQWEsdUJBQXdCLFNBQVEsK0JBQWM7SUFDdkQsWUFDVyxTQUFrQixJQUFJLEVBQ3RCLFFBQWU7UUFDbEIsSUFBSSxFQUFFLEtBQUs7UUFDWCxJQUFJLEVBQUUsTUFBTTtRQUNaLElBQUksRUFBRSxNQUFNO0tBQ2YsRUFDTSxPQUFnQixFQUFFO1FBRXpCLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQVJOLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQ3RCLFVBQUssR0FBTCxLQUFLLENBSVg7UUFDTSxTQUFJLEdBQUosSUFBSSxDQUFjO0lBRzdCLENBQUM7SUFDTSxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQXlCO1FBQzNDLE9BQU8sTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUM3QyxDQUFDO0lBRU0sS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUF1QjtRQUN0QyxNQUFNLEVBQUUsV0FBVyxHQUFHLElBQUksRUFBRSxXQUFXLEdBQUcsSUFBSSxFQUFFLGlCQUFpQixHQUFHLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUE7UUFDdEYsSUFBSSxJQUFJLEdBQVEsRUFBRSxDQUFBO1FBQ2xCLElBQUkscUNBQXFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFBRSxPQUFPLElBQUksQ0FBQTtRQUMzRSxJQUFJLFdBQVcsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsS0FBSyxNQUFNLEVBQUU7WUFDdkQsSUFBSSxHQUFHLE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFO2dCQUNqQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJO2dCQUN0QixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07YUFDdEIsQ0FBQyxDQUFBO1NBQ0w7UUFFRCxJQUFJLFdBQVcsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxZQUFZLENBQUMsS0FBSyxZQUFZLEVBQUU7WUFDbkUsSUFBSSxHQUFHLE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFO2dCQUNqQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJO2dCQUN0QixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07YUFDdEIsQ0FBQyxDQUFBO1NBQ0w7UUFFRCxJQUFJLGlCQUFpQixJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxLQUFLLE1BQU0sRUFBRTtZQUM3RCxJQUFJLEdBQUcsTUFBTSxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUU7Z0JBQ2pDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUk7Z0JBQ3RCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTthQUN0QixDQUFDLENBQUE7U0FDTDtRQUVELE9BQU8sSUFBSSxDQUFBO0lBQ2YsQ0FBQztDQUNKO0FBM0NELDBEQTJDQyJ9
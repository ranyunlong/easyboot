"use strict";
/**
 * @class Validation
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../core/HttpException");
class Validation {
    constructor(typeId, message, validator, required, opts) {
        this.typeId = typeId;
        this.message = message;
        this.validator = validator;
        this.required = required;
        this.opts = opts;
    }
    toValidate(value, field) {
        if (typeof value !== 'undefined') {
            if (typeof value === 'object')
                value = JSON.stringify(value);
            if (typeof value === 'number')
                value = String(value);
            if (typeof value === 'boolean')
                value ? value = 'true' : value = 'false';
            if (this.opts && this.opts.length > 0) {
                if (!this.validator(value, ...this.opts)) {
                    throw new HttpException_1.HttpException({
                        statusCode: 400,
                        data: {
                            msg: this.message || `Parameter ${field} expected ${this.typeId}, got ${typeof value}.`
                        }
                    });
                }
            }
            else {
                if (!this.validator(value)) {
                    throw new HttpException_1.HttpException({
                        statusCode: 400,
                        data: {
                            msg: this.message || `Parameter ${field} expected ${this.typeId}, got ${typeof value}.`
                        }
                    });
                }
            }
        }
        else {
            if (this.required) {
                throw new HttpException_1.HttpException({
                    statusCode: 400,
                    data: {
                        msg: this.message || `Parameter ${field} expected ${this.typeId}, got ${typeof value}.`
                    }
                });
            }
        }
    }
}
exports.Validation = Validation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmFsaWRhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92YWxpZGF0aW9ucy9WYWxpZGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7R0FLRzs7QUFFSCx5REFBc0Q7QUFHdEQsTUFBYSxVQUFVO0lBQ25CLFlBQ29CLE1BQWMsRUFDZCxPQUFlLEVBQ2YsU0FBa0QsRUFDbEQsUUFBaUIsRUFDakIsSUFBWTtRQUpaLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2YsY0FBUyxHQUFULFNBQVMsQ0FBeUM7UUFDbEQsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUNqQixTQUFJLEdBQUosSUFBSSxDQUFRO0lBQzdCLENBQUM7SUFDRyxVQUFVLENBQUMsS0FBVSxFQUFFLEtBQWE7UUFDdkMsSUFBSSxPQUFPLEtBQUssS0FBSyxXQUFXLEVBQUU7WUFDOUIsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRO2dCQUFFLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQzVELElBQUksT0FBTyxLQUFLLEtBQUssUUFBUTtnQkFBRSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQ3BELElBQUksT0FBTyxLQUFLLEtBQUssU0FBUztnQkFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUE7WUFDeEUsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDbkMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUN0QyxNQUFNLElBQUksNkJBQWEsQ0FBQzt3QkFDcEIsVUFBVSxFQUFFLEdBQUc7d0JBQ2YsSUFBSSxFQUFFOzRCQUNGLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxJQUFJLGFBQWEsS0FBSyxhQUFhLElBQUksQ0FBQyxNQUFNLFNBQVMsT0FBTyxLQUFLLEdBQUc7eUJBQzFGO3FCQUNKLENBQUMsQ0FBQTtpQkFDTDthQUNKO2lCQUFNO2dCQUNILElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUN4QixNQUFNLElBQUksNkJBQWEsQ0FBQzt3QkFDcEIsVUFBVSxFQUFFLEdBQUc7d0JBQ2YsSUFBSSxFQUFFOzRCQUNGLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxJQUFJLGFBQWEsS0FBSyxhQUFhLElBQUksQ0FBQyxNQUFNLFNBQVMsT0FBTyxLQUFLLEdBQUc7eUJBQzFGO3FCQUNKLENBQUMsQ0FBQTtpQkFDTDthQUNKO1NBQ0o7YUFBTTtZQUNILElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDZixNQUFNLElBQUksNkJBQWEsQ0FBQztvQkFDcEIsVUFBVSxFQUFFLEdBQUc7b0JBQ2YsSUFBSSxFQUFFO3dCQUNGLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxJQUFJLGFBQWEsS0FBSyxhQUFhLElBQUksQ0FBQyxNQUFNLFNBQVMsT0FBTyxLQUFLLEdBQUc7cUJBQzFGO2lCQUNKLENBQUMsQ0FBQTthQUNMO1NBQ0o7SUFDTCxDQUFDO0NBQ0o7QUEzQ0QsZ0NBMkNDIn0=
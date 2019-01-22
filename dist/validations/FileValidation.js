"use strict";
/**
 * @class Validation
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Validation_1 = require("./Validation");
const HttpException_1 = require("../core/HttpException");
class FileValidation extends Validation_1.Validation {
    toValidate(value, field) {
        if (typeof value !== 'undefined') {
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
exports.FileValidation = FileValidation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlsZVZhbGlkYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdmFsaWRhdGlvbnMvRmlsZVZhbGlkYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7OztHQUtHOztBQUVILDZDQUEwQztBQUMxQyx5REFBc0Q7QUFFdEQsTUFBYSxjQUFlLFNBQVEsdUJBQVU7SUFDbkMsVUFBVSxDQUFDLEtBQVcsRUFBRSxLQUFhO1FBQ3hDLElBQUksT0FBTyxLQUFLLEtBQUssV0FBVyxFQUFFO1lBQzlCLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDdEMsTUFBTSxJQUFJLDZCQUFhLENBQUM7d0JBQ3BCLFVBQVUsRUFBRSxHQUFHO3dCQUNmLElBQUksRUFBRTs0QkFDRixHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sSUFBSSxhQUFhLEtBQUssYUFBYSxJQUFJLENBQUMsTUFBTSxTQUFTLE9BQU8sS0FBSyxHQUFHO3lCQUMxRjtxQkFDSixDQUFDLENBQUE7aUJBQ0w7YUFDSjtpQkFBTTtnQkFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDeEIsTUFBTSxJQUFJLDZCQUFhLENBQUM7d0JBQ3BCLFVBQVUsRUFBRSxHQUFHO3dCQUNmLElBQUksRUFBRTs0QkFDRixHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sSUFBSSxhQUFhLEtBQUssYUFBYSxJQUFJLENBQUMsTUFBTSxTQUFTLE9BQU8sS0FBSyxHQUFHO3lCQUMxRjtxQkFDSixDQUFDLENBQUE7aUJBQ0w7YUFDSjtTQUNKO2FBQU07WUFDSCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2YsTUFBTSxJQUFJLDZCQUFhLENBQUM7b0JBQ3BCLFVBQVUsRUFBRSxHQUFHO29CQUNmLElBQUksRUFBRTt3QkFDRixHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sSUFBSSxhQUFhLEtBQUssYUFBYSxJQUFJLENBQUMsTUFBTSxTQUFTLE9BQU8sS0FBSyxHQUFHO3FCQUMxRjtpQkFDSixDQUFDLENBQUE7YUFDTDtTQUNKO0lBQ0wsQ0FBQztDQUNKO0FBakNELHdDQWlDQyJ9
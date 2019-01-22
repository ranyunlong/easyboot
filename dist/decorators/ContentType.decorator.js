"use strict";
/**
 * @module ContentType
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_constant_1 = require("../constants/metadata.constant");
const mime_types_1 = require("mime-types");
const DevStackTrace_1 = require("../core/DevStackTrace");
/**
 * ContentType decorator
 *
 * The decorator apply to Contorllor propertys, use to set response content type.
 *
 * Example
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @GetMapping
 *     public async index(){}
 *
 *     @GetMapping
 *     @ContentType('application/json')
 *     public async test(){}
 *
 *     @GetMapping
 *     @ContentType('text/html')
 *     public async test1(){}
 * }
 * ```
 */
function ContentType(type) {
    return (target, propertyKey) => {
        const trace = new DevStackTrace_1.DevStackTrace(`Invalid decorator: @ContentType('${type}'), '${type}' is not mime-type.`, {
            value: 'ContentType',
            scopes: ['meta.decorator.ts']
        });
        if (!mime_types_1.contentType(type)) {
            trace.throw();
        }
        Reflect.defineMetadata(metadata_constant_1.CONTROLLER.CONTENT_TYPE, mime_types_1.contentType(type), target.constructor, propertyKey);
    };
}
exports.ContentType = ContentType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udGVudFR5cGUuZGVjb3JhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2RlY29yYXRvcnMvQ29udGVudFR5cGUuZGVjb3JhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7R0FLRzs7QUFFSCxzRUFBNEQ7QUFDNUQsMkNBQXdDO0FBQ3hDLHlEQUFzRDtBQUV0RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILFNBQWdCLFdBQVcsQ0FBQyxJQUFZO0lBQ3BDLE9BQU8sQ0FBQyxNQUFjLEVBQUUsV0FBbUIsRUFBUSxFQUFFO1FBQ2pELE1BQU0sS0FBSyxHQUFHLElBQUksNkJBQWEsQ0FBQyxvQ0FBb0MsSUFBSSxRQUFRLElBQUkscUJBQXFCLEVBQUU7WUFDdkcsS0FBSyxFQUFFLGFBQWE7WUFDcEIsTUFBTSxFQUFFLENBQUUsbUJBQW1CLENBQUU7U0FDbEMsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxDQUFDLHdCQUFXLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDcEIsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFBO1NBQ2hCO1FBQ0QsT0FBTyxDQUFDLGNBQWMsQ0FBQyw4QkFBVSxDQUFDLFlBQVksRUFBRSx3QkFBVyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDdkcsQ0FBQyxDQUFBO0FBQ0wsQ0FBQztBQVhELGtDQVdDIn0=
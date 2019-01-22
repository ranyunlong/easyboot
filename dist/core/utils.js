"use strict";
/**
 * @module utils
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Stream = require("stream");
const mimeTypes = require("mime-types");
const LRU_1 = require("./LRU");
function isJSON(body) {
    if (!body)
        return false;
    if ('string' === typeof body)
        return false;
    if ('function' === typeof body.pipe)
        return false;
    if (Buffer.isBuffer(body))
        return false;
    return true;
}
exports.isJSON = isJSON;
function ensureErrorHandler(stream, error) {
    if (stream instanceof Stream && !~stream.listeners('error').indexOf(error)) {
        stream.on('error', error);
    }
    return stream;
}
exports.ensureErrorHandler = ensureErrorHandler;
const typeLRUCache = new LRU_1.LRU(100);
function getType(type) {
    let mimeType = typeLRUCache.get(type);
    if (!mimeType) {
        mimeType = mimeTypes.contentType(type);
        typeLRUCache.set(type, mimeType);
    }
    return mimeType;
}
exports.getType = getType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29yZS91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7OztHQUdHOztBQUVILGlDQUFnQztBQUNoQyx3Q0FBdUM7QUFDdkMsK0JBQTRCO0FBRTVCLFNBQWdCLE1BQU0sQ0FBQyxJQUFTO0lBQzVCLElBQUksQ0FBQyxJQUFJO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFDeEIsSUFBSSxRQUFRLEtBQUssT0FBTyxJQUFJO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFDM0MsSUFBSSxVQUFVLEtBQUssT0FBTyxJQUFJLENBQUMsSUFBSTtRQUFFLE9BQU8sS0FBSyxDQUFDO0lBQ2xELElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUN4QyxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBTkQsd0JBTUM7QUFFRCxTQUFnQixrQkFBa0IsQ0FBQyxNQUFjLEVBQUUsS0FBK0I7SUFDOUUsSUFBSSxNQUFNLFlBQVksTUFBTSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUN4RSxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztLQUM3QjtJQUNELE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUM7QUFMRCxnREFLQztBQUVELE1BQU0sWUFBWSxHQUFHLElBQUksU0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBRWxDLFNBQWdCLE9BQU8sQ0FBQyxJQUFZO0lBQ2hDLElBQUksUUFBUSxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEMsSUFBSSxDQUFDLFFBQVEsRUFBRTtRQUNYLFFBQVEsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQ3BDO0lBQ0QsT0FBTyxRQUFrQixDQUFDO0FBQzlCLENBQUM7QUFQRCwwQkFPQyJ9
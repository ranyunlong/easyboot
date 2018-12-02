/**
 * @namespace ElementType
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
export namespace ElementType {
    export enum METHOD {
        GET = 'GET',
        PUT = 'PUT',
        POST = 'POST',
        HEAD = 'HEAD',
        PATCH = 'PATCH',
        DELETE = 'DELETE',
        COPY = 'COPY',
        OPTIONS = 'OPTIONS',
        LINK = 'LINK',
        UNLINK = 'UNLINK',
        PURGE = 'PURGE',
        LOCK = 'LOCK',
        UNLOCK = 'UNLOCK',
        PROPFIND = 'PROPFIND',
        VIEW = 'VIEW',
        ALL = 'ALL'
    }
}
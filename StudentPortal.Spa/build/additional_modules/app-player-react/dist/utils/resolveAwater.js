/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
export default function resolveAwaiter() {
    var statusHandler = { status: "pending" }, resolve, awaiter = new Promise(function (r) {
        resolve = function (arg) {
            statusHandler.status = "resolved";
            r(arg);
        };
    });
    return {
        resolve: resolve,
        awaiter: awaiter,
        statusHandler: statusHandler
    };
}

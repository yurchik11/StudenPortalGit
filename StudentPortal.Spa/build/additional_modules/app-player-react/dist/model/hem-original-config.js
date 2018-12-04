/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as traverse from "traverse";
import { isObject, isArray } from "util";
export default function hemOriginalConfig(linkedConfig, originalConfig) {
    traverse.forEach(originalConfig, function (node) {
        if (isObject(node) && !isArray(node)) {
            var enclosedNode = traverse.get(linkedConfig, this.path);
            enclosedNode._originalConfig = node;
        }
    });
    return linkedConfig;
}

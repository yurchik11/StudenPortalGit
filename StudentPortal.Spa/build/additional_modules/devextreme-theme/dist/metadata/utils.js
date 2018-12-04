/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
export function patchMetadata(metadata, hacks) {
    var items = tslib_1.__spread(metadata.items, hacks);
    return tslib_1.__assign({}, metadata, { items: items });
}
export function makePlaceholders(metadata, map) {
    metadata.items.forEach((function (item) {
        var placeholder = map[item.value];
        if (placeholder) {
            item.value = placeholder;
        }
    }));
    return metadata;
}

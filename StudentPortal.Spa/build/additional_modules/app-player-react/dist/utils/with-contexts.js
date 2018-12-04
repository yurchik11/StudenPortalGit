/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import * as React from "react";
export var WithContexts = function (props) {
    var contexts = props.contexts, children = props.children, items = Object.keys(contexts).map(function (key) { return ({ key: key, value: contexts[key] }); });
    return renderContexts(items, children);
};
function renderContexts(contexts, children, values) {
    if (values === void 0) { values = {}; }
    var current = contexts[0], rest = contexts.slice(1);
    if (current) {
        var key_1 = current.key, Context = current.value;
        return (React.createElement(Context.Consumer, null, function (value) {
            var _a;
            return renderContexts(rest, children, tslib_1.__assign({}, values, (_a = {}, _a[key_1] = value, _a)));
        }));
    }
    else {
        return children(values);
    }
}

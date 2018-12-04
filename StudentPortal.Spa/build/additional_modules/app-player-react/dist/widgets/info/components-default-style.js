/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
export var componentDefaultStyles = {};
export function getDefaultStyle(type, scope) {
    if (scope === void 0) { scope = "root"; }
    return componentDefaultStyles[scope === "root" ? type : type + "_scope_" + scope];
}
export function getScopedName(type, scope) {
    if (scope === void 0) { scope = "root"; }
    return type && (scope === "root" ? type : type + "_scope_" + scope);
}
export function registerDefaultStyles(options) {
    var type = options.type, _a = options.inherit, inherit = _a === void 0 ? { type: undefined } : _a, styles = options.styles, _b = options.scope, scope = _b === void 0 ? "root" : _b, inheritType = inherit.type, _c = inherit.scope, inheritScope = _c === void 0 ? "root" : _c, inheritStyles = componentDefaultStyles[getScopedName(inheritType, inheritScope)];
    if (Array.isArray(scope)) {
        scope.forEach(function (s) {
            componentDefaultStyles[getScopedName(type, s)] = tslib_1.__assign({}, inheritStyles, styles);
        });
    }
    else {
        componentDefaultStyles[getScopedName(type, scope)] = tslib_1.__assign({}, inheritStyles, styles);
    }
}

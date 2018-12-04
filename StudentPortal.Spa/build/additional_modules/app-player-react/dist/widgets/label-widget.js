/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import * as React from "react";
import * as sanitize from "sanitize-html";
import { createWithStyleComponent } from "./with-style";
import { createSelector } from "reselect";
var WithStyle = createWithStyleComponent({
    label: {
        WhiteSpace: "normal",
        flexDirection: "column"
    },
    value: {
        overflow: "hidden"
    }
});
export var createStyleSelector = function () { return createSelector([
    function (args) { return args.style; }
], function (style) {
    var textOverflow = style.textOverflow, wordWrap = style.wordWrap, whiteSpace = style.whiteSpace, widgetStyle = tslib_1.__rest(style, ["textOverflow", "wordWrap", "whiteSpace"]);
    return {
        style: widgetStyle,
        textStyle: { textOverflow: textOverflow, wordWrap: wordWrap, whiteSpace: whiteSpace }
    };
}); };
var ReactLabel = /** @class */ (function (_super) {
    tslib_1.__extends(ReactLabel, _super);
    function ReactLabel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.textSelector = createSelector([
            function (args) { return args.text || ""; },
            function (args) { return args.encode; }
        ], function (text, encode) { return encode === false ? text : sanitize(text, { allowedTags: ["br"] }); });
        _this.styleSelector = createStyleSelector();
        return _this;
    }
    ReactLabel.prototype.render = function () {
        var _this = this;
        var _a = this.styleSelector(this.props), style = _a.style, textStyle = _a.textStyle, text = this.textSelector(this.props);
        return (React.createElement(WithStyle, { className: this.props.className }, function (classes) { return (React.createElement("div", { style: style, className: classes.label + " " + classes.main, onClick: _this.props.onClick },
            React.createElement("div", { className: classes.value, style: textStyle, dangerouslySetInnerHTML: { __html: text } }))); }));
    };
    ReactLabel.defaultProps = { text: "", style: {} };
    return ReactLabel;
}(React.Component));
export { ReactLabel };

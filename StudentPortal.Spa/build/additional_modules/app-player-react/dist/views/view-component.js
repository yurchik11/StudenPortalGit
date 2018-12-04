/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import * as React from "react";
import compileEventHandlers from "../logic/event-compiler";
import hemOriginalConfig from "../model/hem-original-config";
import ObservableComponentModel from "../model/observable-component-model";
var ViewComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ViewComponent, _super);
    function ViewComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ViewComponent.prototype.render = function () {
        var _this = this;
        var _a = this.props, runContext = _a.runContext, config = _a.config, configWithCompiledEvents = compileEventHandlers(config, runContext);
        return (React.createElement(ObservableComponentModel, { componentConfig: configWithCompiledEvents, runContext: runContext }, function (componentModel) {
            return _this.props.children(hemOriginalConfig(componentModel, config));
        }));
    };
    return ViewComponent;
}(React.Component));
export { ViewComponent };

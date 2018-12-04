/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import * as React from "react";
import * as shortcuts from "../common/shortcuts";
import { ViewComponent } from "./view-component";
import { FlexAppPlayerComponent } from "../widgets/app-player-component";
import { ShortcutsScope } from '../common/shortcuts';
var View = /** @class */ (function (_super) {
    tslib_1.__extends(View, _super);
    function View() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    View.prototype.render = function () {
        var _a = this.props, viewConfig = _a.viewConfig, runContext = _a.runContext;
        shortcuts.setRootScope(viewConfig.id);
        return (React.createElement(ShortcutsScope.Provider, { value: viewConfig.id },
            React.createElement(ViewComponent, { config: viewConfig, runContext: runContext }, function (componentModel) {
                var _a = componentModel.components, components = _a === void 0 ? [] : _a;
                return (React.createElement(React.Fragment, null, components.map(function (component, index) { return (React.createElement(FlexAppPlayerComponent, { key: index, widgetProps: component })); })));
            })));
    };
    return View;
}(React.PureComponent));
export { View };

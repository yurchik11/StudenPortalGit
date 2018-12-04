/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import * as React from "react";
import { ReactStackPanel } from "../../widgets/stack-panel-widget";
import { FlexAppPlayerComponent } from "../../widgets/app-player-component";
import { ThemeScope } from "../../widgets/theme-scope";
var WithApplicationInfo = /** @class */ (function (_super) {
    tslib_1.__extends(WithApplicationInfo, _super);
    function WithApplicationInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WithApplicationInfo.prototype.render = function () {
        return this.props.applicationInfo
            ? (React.createElement(ReactStackPanel, { style: { height: "100%" } },
                this.props.children,
                React.createElement(ThemeScope.Provider, { value: "root" },
                    React.createElement(FlexAppPlayerComponent, { widgetProps: tslib_1.__assign({}, this.props.applicationInfo) }))))
            : this.props.children;
    };
    return WithApplicationInfo;
}(React.Component));
export { WithApplicationInfo };

/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import * as React from "react";
import * as traverse from "traverse";
import createLinkedModel, { isExpression } from "./linked-model";
export function createObservableConfig(_a) {
    var componentConfig = _a.componentConfig, runContext = _a.runContext;
    var newComponentModel = createLinkedModel(componentConfig, runContext, { callerId: "", callerType: "" });
    newComponentModel._observables.forEach(function (observable) {
        observable.pushObservable(observable);
    });
    delete newComponentModel._observables;
    var state = {
        componentModel: newComponentModel
    };
    return state;
}
var ObservableComponentModel = /** @class */ (function (_super) {
    tslib_1.__extends(ObservableComponentModel, _super);
    function ObservableComponentModel(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    ObservableComponentModel.getDerivedStateFromProps = function (props, prevState) {
        var componentConfig = props.componentConfig, componentModel = prevState.componentModel, maps = new Map();
        if (!componentModel) {
            return createObservableConfig(props);
        }
        else {
            maps.set(componentConfig, componentModel);
            traverse(componentConfig).forEach(function (v) {
                if (this.isRoot) {
                    return;
                }
                var componentModelNode = maps.get(this.parent.node);
                // TODO Beresnev: temporary solution, need rewrite and test;
                var isObservableProp = this.isLeaf && componentModelNode._originalConfig && isExpression(componentModelNode._originalConfig[this.key])
                    || (componentModelNode._observables || []).map(function (o) { return o.propName; }).indexOf(this.key) !== -1;
                if (isObservableProp) {
                    return;
                }
                if (this.isLeaf) {
                    maps.get(this.parent.node)[this.key] = v;
                }
                else {
                    if (!maps.get(this.parent.node)[this.key]) {
                        maps.get(this.parent.node)[this.key] = v;
                    }
                    maps.set(v, maps.get(this.parent.node)[this.key]);
                }
            });
            return prevState;
        }
    };
    ObservableComponentModel.prototype.render = function () {
        return this.props.children(this.state.componentModel);
    };
    return ObservableComponentModel;
}(React.Component));
export default ObservableComponentModel;

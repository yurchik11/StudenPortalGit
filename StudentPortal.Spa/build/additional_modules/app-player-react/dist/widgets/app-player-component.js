/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import "./info/components-registration";
import "./info/commands-registration";
import * as React from "react";
import * as traverse from "traverse";
import { ComponentRenderer } from "./component-renderer";
import { withFlexStyle } from "./with-flex-style";
import update from "immutability-helper";
var AppPlayerComponent = /** @class */ (function (_super) {
    tslib_1.__extends(AppPlayerComponent, _super);
    function AppPlayerComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.subscriptions = [];
        var self = _this, nodes = tslib_1.__assign({}, props), state = traverse(nodes).forEach(function (node) {
            var _this = this;
            if (node && Array.isArray(node._observables)) {
                node._observables.forEach(function (observable) {
                    if (observable.propName === "value") {
                        node["onValueChanged"] = function (_a) {
                            var value = _a.value;
                            // console.log("onValueChanged", observable.propName, value);
                            observable.value = value;
                        };
                    }
                    observable.dispose();
                    var subscription = observable.subscribe(function (value) {
                        // console.log("subscription", observable.propName, value);
                        var componentProps = setImmutable(self.state.componentProps, _this.path.concat([observable.propName]), value);
                        self.setState(function (prevState) { return (tslib_1.__assign({}, prevState, { componentProps: componentProps })); });
                    });
                    self.subscriptions.push(subscription);
                });
            }
        });
        _this.state = { prevProps: props, componentProps: state };
        return _this;
    }
    AppPlayerComponent.getDerivedStateFromProps = function (nextProps, prevState) {
        if (nextProps !== prevState.prevProps) {
            var state = { prevProps: nextProps, componentProps: update(prevState.componentProps, { $merge: nextProps }) };
            return state;
        }
        return prevState;
    };
    AppPlayerComponent.prototype.render = function () {
        var componentProps = this.state.componentProps;
        return (React.createElement(ComponentRenderer, tslib_1.__assign({}, componentProps)));
    };
    AppPlayerComponent.prototype.componentWillUnmount = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.dispose();
        });
        this.subscriptions = [];
    };
    return AppPlayerComponent;
}(React.PureComponent));
export default AppPlayerComponent;
export var FlexAppPlayerComponent = withFlexStyle(AppPlayerComponent);
function setImmutable(object, path, value) {
    var updateObjectValue = path
        .reduceRight(function (a, i) {
        var _a;
        return _a = {}, _a[i] = a, _a;
    }, { $set: value });
    return update(object, updateObjectValue);
}

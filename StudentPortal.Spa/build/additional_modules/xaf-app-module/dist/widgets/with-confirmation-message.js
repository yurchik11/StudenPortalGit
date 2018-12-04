/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import * as React from "react";
import { showDialog } from "../dialogs";
import * as shortcuts from "app-player-react/dist/common/shortcuts";
export function withConfirmationMessage(Component) {
    return /** @class */ (function (_super) {
        tslib_1.__extends(WithConfirmationMessage, _super);
        function WithConfirmationMessage(props) {
            var _this = _super.call(this, props) || this;
            _this.state = {};
            return _this;
        }
        WithConfirmationMessage.getDerivedStateFromProps = function (props, state) {
            var _a = props.items, items = _a === void 0 ? [] : _a, needUpdate = (state.items !== items);
            if (needUpdate) {
                var patchedItems = items.map(function (command, index) {
                    var hasMessage = command.onExecute && command.confirmationMessage;
                    if (hasMessage) {
                        var messageChanged = !state.items || state.items[index].confirmationMessage !== command.confirmationMessage;
                        if (messageChanged) {
                            return tslib_1.__assign({}, command, { onExecute: function () {
                                    shortcuts.pushScope("confirmation");
                                    showDialog({
                                        title: command.text,
                                        message: command.confirmationMessage,
                                        success: command.onExecute
                                    }).then(function () {
                                        shortcuts.popScope();
                                    });
                                } });
                        }
                        else {
                            return state.patchedItems[index];
                        }
                    }
                    else {
                        return command;
                    }
                });
                return { items: items, patchedItems: patchedItems };
            }
            else {
                return null;
            }
        };
        WithConfirmationMessage.prototype.render = function () {
            var _a = this.props, items = _a.items, rest = tslib_1.__rest(_a, ["items"]);
            return React.createElement(Component, tslib_1.__assign({}, rest, { items: this.state.patchedItems }));
        };
        return WithConfirmationMessage;
    }(React.Component));
}

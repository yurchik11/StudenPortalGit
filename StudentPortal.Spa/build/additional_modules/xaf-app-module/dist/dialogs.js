/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
var _this = this;
import * as tslib_1 from "tslib";
function asyncDialogs() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var dialogs;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, import("devextreme/ui/dialog")];
                case 1:
                    dialogs = _a.sent();
                    return [2 /*return*/, function (_a) {
                            var _b = _a.yesText, yesText = _b === void 0 ? "Yes" : _b, _c = _a.noText, noText = _c === void 0 ? "No" : _c;
                            return function (_a) {
                                var _b = _a.message, message = _b === void 0 ? "" : _b, _c = _a.title, title = _c === void 0 ? "" : _c, success = _a.success;
                                var options = {
                                    message: message,
                                    title: title,
                                    buttons: [
                                        {
                                            text: yesText,
                                            onClick: success
                                        },
                                        {
                                            text: noText,
                                        }
                                    ]
                                };
                                return dialogs
                                    .custom(options)
                                    .show()
                                    .then(function (result) {
                                    return result;
                                });
                            };
                        }];
            }
        });
    });
}
export var showDialog = function (props) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        throw new Error("Show confirmation dialog are not initialized. Call setupConfirmationDialog before call showDialog");
    });
}); };
export function setupConfirmationDialog(config) {
    if (config === void 0) { config = {}; }
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var dialogs;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, asyncDialogs()];
                case 1:
                    dialogs = _a.sent();
                    showDialog = dialogs(config);
                    return [2 /*return*/];
            }
        });
    });
}

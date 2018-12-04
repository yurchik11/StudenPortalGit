/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
var _this = this;
import * as tslib_1 from "tslib";
import { registerStore } from "app-player-react/dist/data/store-factory-creators";
import { createDataStore, createModelActionStore } from "./xaf-data-store";
import "./widgets/widgets-registration";
registerStore("xaf-data", function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
    return [2 /*return*/, createDataStore];
}); }); });
registerStore("xaf-model-action", function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
    return [2 /*return*/, createModelActionStore];
}); }); });
export var xafModule = {};

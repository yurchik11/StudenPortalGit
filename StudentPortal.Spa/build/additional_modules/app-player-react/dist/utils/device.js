/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import Devices from "devextreme/core/devices";
import Browser from "devextreme/core/utils/browser";
export default function getDeviceType(currentDevice) {
    if (currentDevice === void 0) { currentDevice = Devices.current(); }
    return currentDevice.deviceType || "pnone";
}
export function isSafariBasedBrowser() {
    var realDevice = Devices.real();
    return !!(Browser && Browser.safari) || !!realDevice.ios;
}
export function getDeviceValue(source) {
    if (source == null) {
        return undefined;
    }
    else if (typeof source === "object") {
        var device = getDeviceType();
        return source[device];
    }
    else {
        return source;
    }
}

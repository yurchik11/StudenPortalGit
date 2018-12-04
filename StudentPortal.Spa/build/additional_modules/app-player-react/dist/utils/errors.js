/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import viewPortUtils from "devextreme/core/utils/view_port";
import dxNotify from "devextreme/ui/notify";
import { DataLogicError, LogicError } from "../logic/operations";
import { replaceAll } from "./";
export function showError(error) {
    if (!error) {
        return;
    }
    if (typeof error === "string") {
        showErrorToast(error);
    }
    else if (error instanceof LogicError || error instanceof DataLogicError) {
        var stringMessage = error.message, htmlMessage = error.message;
        if (error.callerInfo && error.callerInfo.callerType && error.callerInfo.callerId) {
            stringMessage = "Error occurred when trying to evaluate the \"" + error.callerInfo.callerId + "\" " + error.callerInfo.callerType + ":\n " + stringMessage;
            htmlMessage = "Error occurred when trying to evaluate the \"" + error.callerInfo.callerId + "\" " + error.callerInfo.callerType + ":<br> " + htmlMessage;
        }
        console.error(stringMessage);
        showErrorToast(htmlMessage);
    }
    else {
        var stringMessage = error.message, htmlMessage = error.message;
        if (error["initiatorId"]) {
            stringMessage += "\nInitiated by '" + error["initiatorId"] + "'";
            htmlMessage += "<br>Initiated by '" + error["initiatorId"] + "'";
        }
        console.error(stringMessage);
        showErrorToast(htmlMessage);
    }
}
function showErrorToast(htmlMessage) {
    var toastOptions = {
        closeOnOutsideClick: true,
        closeOnSwipe: false,
        contentTemplate: function () {
            var element = document.createElement("div");
            element.setAttribute("class", "dx-toast-message");
            element.style.wordBreak = "break-word";
            element.innerHTML = htmlEncode(htmlMessage);
            return element;
        }
    };
    viewPortAwaiter.then(function () {
        dxNotify(toastOptions, "error", 10000);
    });
}
function htmlEncode(value) {
    var div = document.createElement("div");
    div.innerText = value;
    var encoded = div.innerHTML, excludeBrOld = replaceAll(encoded, "&lt;br&gt;", "<br>"), excludeBr = replaceAll(excludeBrOld, "&lt;br/&gt;", "<br/>");
    return excludeBr;
}
var viewPortAwaiter = new Promise(function (resolve, reject) {
    if (viewPortUtils) {
        viewPortUtils.changeCallback.add(function () {
            resolve();
        });
    }
});

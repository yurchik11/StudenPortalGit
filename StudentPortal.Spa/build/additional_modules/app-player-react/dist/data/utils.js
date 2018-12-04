/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import { getQueryVariable } from "../utils";
import $ from "../utils/jquery.stub";
import * as ko from "knockout";
export function setHeaders(headers, request) {
    (headers || []).forEach(function (header) { return request.headers[header.name] = header.value; });
}
var dxStatusTextMessages = {
    timeout: "Network connection timeout",
    error: "Unspecified network error",
    parsererror: "Unexpected server response"
};
export function getDataErrorMessage(statusText, errorThrown) {
    var message;
    if (statusText === "parsererror") {
        message = dxStatusTextMessages.parsererror;
    }
    else if (statusText === "timeout") {
        message = dxStatusTextMessages.timeout;
    }
    else if (errorThrown) {
        message = errorThrown;
    }
    else if (statusText === "error") {
        message = dxStatusTextMessages.error;
    }
    else {
        message = "Unknown error with status \"" + statusText + "\"";
    }
    return message;
}
export function getDataError(settings, xhr, statusText, errorThrown) {
    var message = getDataErrorMessage(statusText, errorThrown), error = new Error(message);
    error.httpStatus = xhr.status;
    error.statusText = statusText;
    error.response = xhr.response || convertData(xhr, settings.dataType) || xhr.responseText;
    return error;
}
export function correctODataError(error) {
    var xhr = error["errorDetails"];
    error.statusText = xhr.statusText;
    error.response = xhr.response || xhr.responseText;
    return error;
}
function isLocalUrl(url) {
    var parser = document.createElement("a");
    parser.href = url;
    return parser.hostname.toLowerCase() === "localhost" || parser.hostname === "127.0.0.1";
}
var productName = "TODO";
var originToProxy = {
    "http://localhost:51395": "http://localhost:1337",
    "http://localhost:9876": "http://localhost:1337"
};
originToProxy["https://" + productName + "-app-stage.azurewebsites.net"] = "https://" + productName + "-proxy-stage.azurewebsites.net";
originToProxy["https://app." + productName + ".net"] = "https://" + productName + "-proxy.azurewebsites.net";
originToProxy["file://"] = "https://" + productName + "-proxy-stage.azurewebsites.net";
export function getProxyUrl() {
    return originToProxy[document.location.origin];
}
export function proxyRequest(useProxy, request) {
    useProxy = getQueryVariable("proxy") === "true" || useProxy;
    if (useProxy && !isLocalUrl(request.url)) {
        request.url = getProxyUrl() + "/proxy/?url=" + encodeURIComponent(request.url);
    }
}
export function getOriginalUrl(request) {
    var proxyPattern = "/proxy/?url=", proxyIndex = request.url.indexOf(proxyPattern);
    if (proxyIndex !== -1) {
        var proxyLength = proxyPattern.length, encodedUrl = request.url.substr(proxyIndex + proxyLength);
        return decodeURIComponent(encodedUrl);
    }
    return request.url;
}
export function ajax(settings) {
    return $.ajax(settings)
        .then(function (data, statusText, xhr) {
        if (data instanceof Document) {
            data = convertData(xhr, "xml");
        }
        return data;
    }, function (xhr, statusText, errorThrown) {
        var result = $.Deferred();
        if (statusText === "parsererror") {
            var data = convertData(xhr, settings.dataType);
            if (data) {
                result.resolve(data);
            }
        }
        if (result.state() !== "resolved") {
            var error = getDataError(settings, xhr, statusText, errorThrown);
            result.reject(error);
        }
        return result;
    });
}
var dataConverters = {
    csv: function (xhr) {
        if (xhr.responseText) {
            var text = xhr.responseText, separator;
            // Detect separators
            if (text.indexOf("\";\"") >= 0) {
                separator = ";";
            }
            else if (text.indexOf("\",\"") >= 0) {
                separator = ",";
            }
            else if (text.indexOf(";") >= 0) {
                separator = ";";
            }
            else {
                separator = ",";
            }
            // Do conversion
            return csv2array(text, separator);
        }
        else {
            return void 0;
        }
    },
    xml: function (xhr) {
        var result;
        try {
            var xml = xhr.responseXML || $.parseXML(xhr.responseText);
            if (xml) {
                result = xmlToJs(xml);
            }
        }
        catch (ignored) { } // tslint:disable-line:no-empty
        return result;
    },
    json: function (xhr) {
        var result;
        try {
            result = xhr["responseJson"] || JSON.parse(xhr.responseText);
        }
        catch (ignored) { } // tslint:disable-line:no-empty
        return result;
    }
};
function xmlToJs(node) {
    var data = {}, c, cn, attr;
    function appendValue(name, value) {
        var prop = data[name];
        if (prop) {
            if (!Array.isArray(prop)) {
                data[name] = prop = [prop];
            }
            prop.push(value);
        }
        else {
            data[name] = value;
        }
    }
    function allChildrenAreValues(cn) {
        var len = cn.childNodes.length, i, childNode;
        if (len > 0) {
            for (i = 0; i < len; i++) {
                childNode = cn.childNodes[i];
                if (childNode.nodeType !== 3 && childNode.nodeType !== 4) {
                    return false;
                }
            }
            return true;
        }
        else {
            return false;
        }
    }
    function getNodeValue(cn) {
        var len = cn.childNodes.length, nodeValue, i;
        if (len === 1) {
            return cn.firstChild.nodeValue;
        }
        else if (len > 0) {
            nodeValue = "";
            for (i = 0; i < len; i++) {
                nodeValue += (cn.childNodes[i].nodeValue || "").trim();
            }
            return nodeValue;
        }
        else {
            return void 0;
        }
    }
    // element attributes
    if (node.attributes) {
        for (c = 0; attr = node.attributes[c]; c++) {
            if (!attr.name.startsWith("xmlns")) {
                appendValue(attr.name, attr.value);
            }
        }
    }
    // child elements
    for (c = 0; cn = node.childNodes[c]; c++) {
        if (cn.nodeType === 1) {
            if (allChildrenAreValues(cn)) {
                // text or CDATA node
                appendValue(cn.nodeName, getNodeValue(cn));
            }
            else {
                // sub-object
                appendValue(cn.nodeName, xmlToJs(cn));
            }
        }
    }
    return data;
}
var contentTypeMap = {
    "text/csv": "csv",
    "text/xml": "xml",
    "application/xml": "xml",
    "application/json": "json"
};
export function convertData(xhr, dataType) {
    var result = dataConverters[dataType] ? dataConverters[dataType](xhr) : void 0;
    if (!result) {
        // Try to figure out dataType from response headers
        var contentType = xhr.getResponseHeader("Content-Type");
        if (contentType) {
            for (var mime in contentTypeMap) {
                if (contentType.startsWith(mime)) {
                    dataType = contentTypeMap[mime];
                    result = dataConverters[dataType] ? dataConverters[dataType](xhr) : void 0;
                    break;
                }
            }
        }
    }
    return result;
}
function csv2array(strData, strDelimiter) {
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");
    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp((
    // Delimiters.
    "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
        // Quoted fields.
        "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
        // Standard fields.
        "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");
    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];
    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;
    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec(strData)) {
        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[1];
        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter) {
            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push([]);
        }
        var strMatchedValue;
        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[2]) {
            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[2].replace(new RegExp("\"\"", "g"), "\"");
        }
        else {
            // We found a non-quoted value.
            strMatchedValue = arrMatches[3];
        }
        // Now that we have our value string, let's add
        // it to the data array.
        arrData[arrData.length - 1].push(strMatchedValue);
    }
    // Return the parsed data.
    return (arrData);
}
// export function bindStore(store: dxdata.Store, dependent: KnockoutObservable<any>) {
//     var keyName: string = store.key(),
//         oldArray = <Array<any>> dependent() || [];
//     store.on("loaded", (data) => {
//         dependent(data);
//     });
//     store.on("removed", (key: string) => {
//         var newValue = oldArray.filter((item) => {
//             return item[keyName] !== key;
//         });
//         dependent(newValue);
//     });
//     store.on("inserted", (values: any) => {
//         oldArray.push(values);
//         dependent(oldArray);
//     });
//     store.on("updated", (key: string, newValue) => {
//         var updatedItem = oldArray.filter((item) => {
//             return item[keyName] === key;
//         })[0],
//             index = oldArray.indexOf(updatedItem);
//         oldArray[index] = newValue;
//         dependent(oldArray);
//     });
// }
export function computedFilter(filterFunc, callback) {
    var computedFilters = [];
    return function (item) {
        var itemCopy = tslib_1.__assign({}, item);
        var computed = ko.computed(function () {
            if (ko.computedContext.isInitial()) { // first call: subscribe
                return filterFunc(itemCopy);
            }
            else { // second call: unsubscribe and reload
                computedFilters.forEach(function (c) { return c.dispose(); });
                callback();
            }
        });
        computedFilters.push(computed);
        return computed();
    };
}
var DataStoreDiag = /** @class */ (function () {
    function DataStoreDiag() {
        this.requests = {};
        this.currentTag = "tag";
    }
    DataStoreDiag.prototype.getRequest = function (tag) {
        return this.requests[tag];
    };
    DataStoreDiag.prototype.setRequest = function (tag, request) {
        this.requests[tag] = request;
    };
    DataStoreDiag.prototype.clear = function () {
        this.requests = {};
    };
    return DataStoreDiag;
}());
export { DataStoreDiag };

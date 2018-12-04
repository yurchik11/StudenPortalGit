/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
var ModelStorage = /** @class */ (function () {
    function ModelStorage(applicationId) {
        if (applicationId === void 0) { applicationId = "all-apps"; }
        this.applicationId = applicationId;
    }
    ModelStorage.prototype.put = function (modelId, id, val) {
        var key = this.getKey(modelId, id);
        if (val === undefined || val === null) {
            localStorage.removeItem(key);
        }
        else {
            localStorage.setItem(key, JSON.stringify(val));
        }
    };
    ModelStorage.prototype.get = function (modelId, id) {
        var key = this.getKey(modelId, id);
        var val = localStorage.getItem(key);
        return val ? JSON.parse(val) : undefined;
    };
    ModelStorage.prototype.getKey = function (modelId, id) {
        var applicationPrefix = this.applicationId + "-", modelPrefix = modelId && modelId !== this.applicationId ? modelId + "-" : "";
        return applicationPrefix + modelPrefix + id;
    };
    ModelStorage.prototype.removeAll = function () {
        var applicationPrefix = this.applicationId + "-", keysToRemove = [];
        for (var i = 0, len = localStorage.length; i < len; ++i) {
            var key = localStorage.key(i);
            if (key.indexOf(applicationPrefix) === 0) {
                keysToRemove.push(key);
            }
        }
        keysToRemove.forEach(function (key) { localStorage.removeItem(key); });
    };
    return ModelStorage;
}());
export { ModelStorage };

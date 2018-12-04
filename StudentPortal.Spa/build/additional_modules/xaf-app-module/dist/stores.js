/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
// rootServiceUrl = "http://kaluga-03-w10.corp.devexpress.com:63956/",
// rootServiceUrl = "./", // "http://localhost:51328/",
export var viewsStoreId = "viewsStore", actionsStoreId = "actionsStore", actionsAuthStoreId = "ActionsAuthStore", authStoreId = "AuthStore", stateStoreId = "stateStoreId";
export function getStores(rootServiceUrl) {
    var rootDataServiceUrl = rootServiceUrl + "api", viewsStore = {
        id: viewsStoreId,
        url: rootDataServiceUrl + "/data",
        type: "xaf-data",
        key: "Oid"
    }, stateStore = {
        id: stateStoreId,
        url: rootDataServiceUrl + "/models",
        type: "xaf-model-action",
        key: "Oid"
    }, actionsStore = {
        id: actionsStoreId,
        url: rootDataServiceUrl + "/actions",
        type: "xaf-model-action",
        key: "Oid" // used for get key from selectedObjects
    }, authStore = {
        id: authStoreId,
        url: rootServiceUrl + "authentication/models",
        type: "xaf-model-action",
        key: "Oid"
    }, actionsAuthStore = {
        id: actionsAuthStoreId,
        url: rootServiceUrl + "authentication/actions",
        type: "xaf-model-action"
    };
    return [
        viewsStore,
        actionsStore,
        actionsAuthStore,
        authStore,
        stateStore
    ];
}

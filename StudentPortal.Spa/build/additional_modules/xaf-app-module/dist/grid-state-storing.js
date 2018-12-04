/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as hash from "string-hash";
export function createStateStoring(config, view) {
    if (!config.id) {
        console.warn("Grid won't use state storing because it has no id", config);
        return undefined;
    }
    if (!view.id) {
        console.warn("Grid won't use state storing because View has no id", view);
        return undefined;
    }
    return createLocalStorageStateStoring(config, view);
}
var GRID_CONFIG_HASH_KEY_PREFIX = "grid-config-hash.";
var GRID_STATE_KEY_PREFIX = "grid-state.";
function createLocalStorageStateStoring(config, view) {
    function customLoad() {
        var gridConfigHashKey = GRID_CONFIG_HASH_KEY_PREFIX + view.id + "." + config.id, gridConfigHashActual = hash(JSON.stringify(config)).toString(), gridConfigHashCached = localStorage.getItem(gridConfigHashKey);
        if (gridConfigHashActual === gridConfigHashCached) {
            var gridStateKey = GRID_STATE_KEY_PREFIX + view.id + "." + config.id, gridStateValue = JSON.parse(localStorage.getItem(gridStateKey));
            return Promise.resolve(gridStateValue);
        }
        return Promise.resolve();
    }
    function customSave(gridState) {
        var gridConfigHashKey = GRID_CONFIG_HASH_KEY_PREFIX + view.id + "." + config.id, gridConfigHashActual = hash(JSON.stringify(config)).toString(), gridStateKey = GRID_STATE_KEY_PREFIX + view.id + "." + config.id, gridStateValue = JSON.stringify(gridState);
        try {
            localStorage.setItem(gridStateKey, gridStateValue);
            localStorage.setItem(gridConfigHashKey, gridConfigHashActual);
        }
        catch (error) {
            console.warn("This browser doesn't support grid state caching", error);
        }
    }
    return {
        enabled: true,
        type: "custom",
        customLoad: customLoad,
        customSave: customSave,
        savingTimeout: 500
    };
}

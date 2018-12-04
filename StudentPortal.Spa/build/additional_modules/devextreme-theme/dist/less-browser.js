/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import * as lessModule from "less/lib/less";
import * as fileManagerModule from "less/lib/less-browser/file-manager";
import * as AbstractPluginLoader from "less/lib/less/environment/abstract-plugin-loader";
var PluginLoader = /** @class */ (function (_super) {
    tslib_1.__extends(PluginLoader, _super);
    function PluginLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PluginLoader.prototype.loadPlugin = function (filename, basePath, context, environment, fileManager) {
        return new Promise(function (fulfill, reject) {
            fileManager.loadFile(filename, basePath, context, environment)
                .then(fulfill).catch(reject);
        });
    };
    return PluginLoader;
}(AbstractPluginLoader));
export default function (options) {
    var less = lessModule();
    less.options = { async: true, math: "always" };
    var environment = less.environment, FileManager = fileManagerModule(options, less.logger), fileManager = new FileManager();
    environment.addFileManager(fileManager);
    less.PluginLoader = PluginLoader;
    less.FileManager = FileManager;
    return less;
}

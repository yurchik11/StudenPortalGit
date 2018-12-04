/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import { isString } from "./utils/cast";
import * as traverse from "traverse";
// export interface IModuleFileInfo { id: string; src: string; };
// export type ModuleConfig = {
//     namespace: string;
//     main: string;
//     files: string[];
//     plugins: string[];
// };
var LoadingModulesManager = /** @class */ (function () {
    function LoadingModulesManager() {
        this._loadingModules = {};
    }
    LoadingModulesManager.prototype.add = function (moduleName) {
        var _this = this;
        var loadedResolve;
        this._loadingModules[moduleName] = new Promise(function (resolve) {
            loadedResolve = resolve;
        });
        return function () {
            delete _this._loadingModules[moduleName];
            loadedResolve();
        };
    };
    LoadingModulesManager.prototype.getPromises = function (modulesConfig) {
        var _this = this;
        var normalizedModules = modulesConfig.filter(function (m) { return !!m; }).map(function (m) { return isString(m) ? m : m.name; });
        return normalizedModules.reduce(function (acc, name) {
            if (_this._loadingModules[name]) {
                acc.push(_this._loadingModules[name]);
            }
            return acc;
        }, []);
    };
    return LoadingModulesManager;
}());
var ModulesLoader = /** @class */ (function () {
    function ModulesLoader(_a) {
        var modules = _a.modules, appConfig = _a.appConfig, functions = _a.functions;
        this._loadingModuleManager = new LoadingModulesManager();
        this._appConfig = appConfig;
        this._functions = functions;
        this._modules = modules;
        this.alreadyLoadedModules = [];
    }
    ModulesLoader.prototype._initModule = function (_module) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!_module) return [3 /*break*/, 2];
                        if (_module.functions && this._functions) {
                            _module.functions.forEach(function (funcDeclaration) {
                                _this._functions[funcDeclaration.id] = funcDeclaration.func;
                            });
                        }
                        if (!_module.createModule) return [3 /*break*/, 2];
                        return [4 /*yield*/, _module.createModule({ appConfig: this._appConfig })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    ModulesLoader.prototype.findModulesToLoad = function (config) {
        if (config === void 0) { config = {}; }
        var modules = [], valueCallback = function (name, value) {
            if (name === "module" && value) {
                modules.push(value);
            }
            if (name === "modules" && value && value.length > 0) {
                modules = modules.concat(value);
            }
        };
        traverse.forEach(config, function (node) {
            valueCallback(this.key, node);
        });
        return modules;
    };
    ModulesLoader.prototype.initModules = function (modulesConfig) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var promises;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(modulesConfig && modulesConfig.length)) return [3 /*break*/, 2];
                        promises = this.getModulesToInit(modulesConfig)
                            .map(function (moduleInfo) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var moduleName, moduleLoaded, m, err_1, index;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        moduleName = !isString(moduleInfo) ? moduleInfo.name : moduleInfo;
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 4, , 5]);
                                        moduleLoaded = this._loadingModuleManager.add(moduleName);
                                        this.alreadyLoadedModules.push(moduleName);
                                        return [4 /*yield*/, this._modules[moduleName]()];
                                    case 2:
                                        m = _a.sent();
                                        return [4 /*yield*/, this._initModule(m)];
                                    case 3:
                                        _a.sent();
                                        moduleLoaded();
                                        return [3 /*break*/, 5];
                                    case 4:
                                        err_1 = _a.sent();
                                        index = this.alreadyLoadedModules.indexOf(moduleName);
                                        this.alreadyLoadedModules.splice(index);
                                        throw err_1;
                                    case 5: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, Promise.all(promises.concat(this._loadingModuleManager.getPromises(modulesConfig)))];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    ModulesLoader.prototype.getModulesToInit = function (modulesConfig) {
        var _this = this;
        return modulesConfig
            .filter(function (m) { return m; })
            .filter(function (m, pos) { return modulesConfig.indexOf(m) === pos; })
            .filter(function (module) {
            return _this.alreadyLoadedModules.indexOf(typeof (module) === "object" ? module.name : module) === -1;
        });
    };
    return ModulesLoader;
}());
export { ModulesLoader };

/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import * as isPlainObject from "is-plain-object";
import * as ko from "knockout";
import DataSource from "../data/data-source";
import { FunctionCompiler } from "../logic/function-compiler";
import { TYPES } from "../logic/types";
import { clone } from "../utils";
var Model = /** @class */ (function () {
    function Model() {
    }
    Model.createGlobalModel = function (config, services, runContext) {
        var $global = {};
        return Model.createModel(config, services, tslib_1.__assign({}, runContext, { $global: $global }), "global ", $global);
    };
    Model.createLocalModel = function (config, services, runContext, onCreatingModel) {
        var $local = {};
        return Model.createModel(config, services, tslib_1.__assign({}, runContext, { $local: $local }), "", $local, onCreatingModel);
    };
    Model.createModel = function (config, services, runContext, callerPrefix, model, onCustomizeProperties) {
        var allFields = [config.params, config.model, config.functions]
            .filter(function (items) { return items; })
            .reduce(function (flat, items) { return flat.concat(items); }, []);
        var raiseCustomizePropetiesEvent = Model.getCustomizeProperties(onCustomizeProperties), properties = allFields.map(function (item) { return Model.createPropertyDescriptor(item, {
            services: services, callerPrefix: callerPrefix, runContext: runContext, modelId: config.id,
            onObservableCreated: function (descriptor) {
                raiseCustomizePropetiesEvent(function () {
                    return [{
                            modelProperty: item,
                            valueDescriptor: descriptor
                        }];
                });
            }
        }); });
        raiseCustomizePropetiesEvent(function () { return properties; });
        var computeds = properties.filter(function (item) { return !!item.computed; }).map(function (item) { return item.computed; });
        model.dispose = function () {
            if (!computeds) {
                return;
            }
            computeds.forEach(function (item) { return item.dispose(); });
            computeds = null;
        };
        var descriptors = properties.reduce(function (prev, current) {
            prev[current.modelProperty.name] = current.propertyDescriptor;
            return prev;
        }, {});
        Object.defineProperties(model, descriptors);
        return model;
    };
    Model.getCustomizeProperties = function (onCustomizeProperties) {
        var _this = this;
        return function (getProperties) {
            var handler;
            if (onCustomizeProperties) {
                handler = onCustomizeProperties;
            }
            else if (_this.onCustomizeProperties) {
                handler = _this.onCustomizeProperties;
            }
            if (handler) {
                handler(getProperties());
            }
        };
    };
    Model.createPropertyDescriptor = function (item, options) {
        if (this.isCalculatedModelProperty(item)) {
            return this.createCalculatedPropertyDescriptor(item, options);
        }
        else if (this.isFunction(item)) {
            return this.createFunctionPropertyDescriptor(item, options);
        }
        return this.createPlainPropertyDescriptor(item, options);
    };
    Model.isCalculatedModelProperty = function (item) {
        return !!item["getter"] || !!item["setter"];
    };
    Model.isFunction = function (item) {
        return !!item["function"];
    };
    Model.createPlainPropertyDescriptor = function (item, options) {
        var _a = options.services, typeInfoRepository = _a.typeInfoRepository, modelStorage = _a.modelStorage, modelId = options.modelId, typeInfo = typeInfoRepository.get(item.type), knownType = !item.type || typeInfo, isStore = typeInfo && typeInfo.kind === TYPES.STORE_TYPE, 
        // TODO: Beresnev Hack for bugs after hand testing, need fix in next release
        defaultValue = knownType && !isStore ? (typeInfo || null) && typeInfo.defaultValueCtor() : 42, isArray = typeInfo && typeInfo.kind === TYPES.ARRAY_TYPE, observable = isArray ? ko.observableArray(defaultValue) : ko.observable(defaultValue), getter = function () {
            return observable();
        }, setter = Model.getObservableSetter(isArray, observable, { initialValue: observable.peek(), name: "", observableSelectors: item.observables, onObservableCreated: options.onObservableCreated });
        var isDefaultLoaded = false;
        observable.subscribe(function (val) {
            if (isDefaultLoaded && item.persistent) {
                modelStorage.put(modelId, item.name, val);
            }
        });
        if (item.defaultValue !== undefined) {
            setter(clone(item.defaultValue));
        }
        isDefaultLoaded = true;
        if (item.persistent) {
            var localValue = modelStorage.get(modelId, item.name);
            if (typeof localValue !== "undefined") {
                setter(localValue);
            }
        }
        return {
            modelProperty: item,
            propertyDescriptor: {
                enumerable: true,
                configurable: true,
                get: getter,
                set: setter
            }
        };
    };
    Model.createCalculatedPropertyDescriptor = function (item, options) {
        var _this = this;
        var runContext = options.runContext, callerPrefix = options.callerPrefix, observable = ko.observable(), callerInfo = {
            callerType: callerPrefix + "model property",
            callerId: item.name
        }, observableOptions = { observableSelectors: item.observables, onObservableCreated: options.onObservableCreated }, computedFn = new FunctionCompiler(item.getter), computed = ko.computed(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, computedFn.run(tslib_1.__assign({}, runContext), callerInfo)];
                    case 1:
                        result = _a.sent();
                        this.setObservableProperties({ observable: observable }, result, "", observableOptions);
                        return [2 /*return*/];
                }
            });
        }); }, null, { deferEvaluation: true }), descriptor = {
            enumerable: true,
            configurable: true,
            get: function () {
                computed();
                return ko.unwrap(observable());
            }
        };
        if (item.setter) {
            descriptor.set = function (value) {
                var currentValue = observable.peek();
                if (currentValue === value) {
                    return;
                }
                if (ko.isObservable(currentValue)) {
                    console.error("Property cannot have a setter if getter returns observable.");
                    return;
                }
                new FunctionCompiler(item.setter)
                    .run(tslib_1.__assign({ $value: value }, runContext), callerInfo);
                _this.setObservableProperties({ observable: observable }, value, "", observableOptions);
            };
        }
        return {
            modelProperty: item,
            propertyDescriptor: descriptor,
            computed: computed
        };
    };
    Model.createFunctionPropertyDescriptor = function (item, options) {
        var runContext = options.runContext, callerPrefix = options.callerPrefix, callerInfo = {
            callerType: callerPrefix + "function",
            callerId: item.name
        }, func = function (args) { return new FunctionCompiler(item.function)
            .run(tslib_1.__assign({}, runContext, args), callerInfo); };
        return {
            modelProperty: item,
            propertyDescriptor: {
                enumerable: true,
                configurable: true,
                value: func
            }
        };
    };
    Model.getObservableSetter = function (isArray, observable, options) {
        var _this = this;
        var initialValue = options.initialValue;
        if (isArray) {
            var descriptors = ["pop", "push", "reverse", "shift", "sort", "splice", "unshift", "fill"]
                .filter(function (methodName) { return initialValue[methodName]; })
                .reduce(function (accumulator, methodName) {
                var func = initialValue[methodName];
                accumulator[methodName] = {
                    value: function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        var processedArguments = _this.processArrayMethodArguments(args, methodName, options), methodResult = func.apply(initialValue, processedArguments || args);
                        observable.valueHasMutated();
                        return methodResult;
                    }
                };
                return accumulator;
            }, {});
            Object.defineProperties(initialValue, descriptors);
        }
        return function (value) {
            if (isArray && Array.isArray(value) && Array.isArray(observable.peek())) {
                observable.splice.apply(observable, [0, observable.peek().length].concat(value));
            }
            else {
                _this.setObservableProperties({ observable: observable }, value, options.name, options);
            }
        };
    };
    Model.processArrayMethodArguments = function (args, methodName, options) {
        var newArguments = [], i;
        switch (methodName) {
            case "push":
            case "unshift":
                for (i = 0; i < args.length; ++i) {
                    newArguments.push(this.setObservableProperties({ oldValue: undefined }, args[i], options.name, options));
                }
                break;
            case "splice":
                newArguments.push(args[0]);
                newArguments.push(args[1]);
                for (i = 2; i < args.length; i++) {
                    newArguments.push(this.setObservableProperties({ oldValue: undefined }, args[i], options.name, options));
                }
                break;
            case "fill":
                newArguments.push(this.setObservableProperties({ oldValue: undefined }, args[0], options.name, options));
                for (i = 1; i < args.length; ++i) {
                    newArguments.push(args[i]);
                }
                break;
            case "sort":
                if (args.length) {
                    newArguments.push(args[0]);
                }
                break;
            default:
                break;
        }
        return newArguments;
    };
    Model.setObservableProperties = function (valueProvider, newValue, parentName, selectorOptions) {
        var _this = this;
        var _a = valueProvider, observable = _a.observable, oldValue = _a.oldValue;
        if (observable) {
            oldValue = observable.peek();
        }
        if (selectorOptions.observableSelectors && selectorOptions.observableSelectors.length) {
            if (Array.isArray(newValue)) {
                return this.processArray(oldValue, newValue, parentName, selectorOptions);
            }
            else if (isPlainObject(newValue)) {
                var result = {}, propNames = Object.keys(result);
                // NOTE: set existing or define non-existing properties
                var descriptors = {}, customizeDescriptors = [];
                Object.keys(newValue).forEach(function (propName) {
                    var newPropValue = newValue[propName];
                    var currentName = parentName === "" ? propName : parentName + "." + propName;
                    if (!propNames.some(function (_prop) { return propName === _prop; })) {
                        var merged = _this.setObservableProperties({ oldValue: undefined }, newPropValue, currentName, selectorOptions);
                        descriptors[propName] = _this.getDescriptor(tslib_1.__assign({}, selectorOptions, { initialValue: merged, name: currentName }));
                        customizeDescriptors.push({ name: currentName, descriptor: descriptors[propName], isArray: Array.isArray(merged) });
                    }
                    else {
                        result[propName] = newPropValue;
                    }
                });
                Object.defineProperties(result, descriptors);
                newValue = result;
            }
        }
        if (observable) {
            if (oldValue !== newValue) {
                observable(newValue);
            }
        }
        return newValue;
    };
    Model.processArray = function (oldValue, newValue, parentName, selectorOptions) {
        var _this = this;
        var processedArray = [], oldArray = oldValue && ko.unwrap(oldValue);
        Object.keys(newValue).forEach(function (index) {
            var childValue = newValue[index];
            processedArray.push(_this.setObservableProperties({ oldValue: oldArray ? oldArray[index] : undefined }, childValue, parentName, selectorOptions));
        });
        return processedArray;
    };
    Model.getDescriptor = function (options) {
        return this._shouldObserve(options)
            ? this.getObservableDescriptor(options)
            : this.getPlainDescriptor(options);
    };
    Model._shouldObserve = function (options) {
        function isContains(selector) {
            var selectorParts = selector.split("."), selectorWithAsterisk = selectorParts[selectorParts.length - 1] !== asterisk, nameDeeperThenSelector = selectorParts.length < nameParts.length, selectorDeeperThenName = nameParts.length < selectorParts.length, match = !(nameDeeperThenSelector && selectorWithAsterisk);
            if (selectorDeeperThenName) {
                match = false;
            }
            else {
                for (var i = 0; i < selectorParts.length; ++i) {
                    if (selectorParts[i] === asterisk) {
                        break;
                    }
                    else if (nameParts[i] === selectorParts[i]) {
                        continue;
                    }
                    else {
                        match = false;
                        break;
                    }
                }
            }
            return match;
        }
        var name = options.name, observableSelectors = options.observableSelectors, nameParts = name.split("."), asterisk = "*", matchNegative = (observableSelectors || [])
            .filter(function (selector) { return selector[0] === "!"; })
            .some(function (selector) {
            return (name + ".*" === selector.slice(1)) || isContains(selector.slice(1));
        }), matchPositive = (observableSelectors || [])
            .filter(function (selector) { return selector[0] !== "!"; })
            .some(isContains);
        if (matchNegative) {
            return false;
        }
        else {
            return matchPositive;
        }
    };
    Model.getObservableDescriptor = function (options) {
        var _this = this;
        var initialValue = options.initialValue, name = options.name, isArray = Array.isArray(initialValue), observable = isArray ? ko.observableArray(initialValue) : ko.observable(initialValue);
        this.Traps.forEach(function (propName) {
            if (name.indexOf(propName) !== -1) {
                console.log("created: ", options);
                observable["beforeSubscriptionAdd"] = function () {
                    _this.defaultBeforeAddSubscription(options.name, observable);
                };
            }
        });
        if (options.onObservableCreated) {
            options.onObservableCreated({ name: options.name, observable: observable });
        }
        return {
            enumerable: true,
            configurable: true,
            get: function () {
                return observable();
            },
            set: Model.getObservableSetter(isArray, observable, options)
        };
    };
    Model.getPlainDescriptor = function (options) {
        var _this = this;
        var currentValue = options.initialValue;
        return {
            enumerable: true,
            configurable: true,
            get: function () {
                return currentValue;
            },
            set: function (value) {
                currentValue = _this.setObservableProperties({ oldValue: currentValue }, value, options.name, options);
            }
        };
    };
    Model.initializeDataSources = function (model, runContext, services, stores, dataSourceConfigs) {
        var _this = this;
        if (dataSourceConfigs === void 0) { dataSourceConfigs = []; }
        var descriptors = {};
        dataSourceConfigs.forEach(function (dataSourceConfig) {
            var dataSource = DataSource.createDataSource(dataSourceConfig, runContext, stores, services);
            descriptors[dataSourceConfig.id] = _this.getDescriptor({
                initialValue: dataSource,
                name: dataSourceConfig.id,
                observableSelectors: [dataSourceConfig.id]
            });
        });
        if (Object.keys(descriptors).length) {
            Object.defineProperties(model, descriptors);
        }
    };
    Model.Traps = []; // NOTE: use it for debugging;
    Model.defaultBeforeAddSubscription = function (propName, observable) {
        console.log(propName + " " + observable.getSubscriptionsCount());
    };
    return Model;
}());
export default Model;

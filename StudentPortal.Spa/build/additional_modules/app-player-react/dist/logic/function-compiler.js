/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import { isEmptyObject } from "../utils";
import { showError } from "../utils/errors";
import { isString } from "../utils/cast";
import { LogicError } from "./operations";
export var logEnabled = false;
var FunctionCompiler = /** @class */ (function () {
    function FunctionCompiler(code, errorHandler) {
        if (errorHandler === void 0) { errorHandler = showError; }
        if (FunctionCompiler.isCodeHandler(code)) {
            this.code = code.$code;
        }
        else {
            this.code = code;
        }
        this.externalErrorHandler = errorHandler;
    }
    FunctionCompiler.isCodeHandler = function (code) {
        return code && !!code.$code;
    };
    FunctionCompiler.prototype.run = function (runContext, callerInfo) {
        var _this = this;
        var promise, errorHandler = function (error) {
            if (_this.externalErrorHandler) {
                _this.externalErrorHandler(new LogicError(error.message, callerInfo));
            }
        };
        if (logEnabled && callerInfo) {
            console.groupCollapsed("Run '" + callerInfo.callerId + " \"' " + callerInfo.callerType);
            console.log("Context: %o", runContext);
            console.log("Logic: %o", this.code);
            console.groupEnd();
        }
        if (!this.strategy) {
            this.strategy = this.createStrategy(this.code);
        }
        try {
            var contextParams = [];
            if (runContext) {
                Object.keys(runContext).forEach(function (name) {
                    contextParams.push(name);
                });
            }
            promise = this.strategy.run(runContext, contextParams);
            if (promise instanceof Promise) {
                promise.catch(errorHandler);
            }
        }
        catch (error) {
            errorHandler(error);
            return Promise.resolve();
        }
        return promise;
    };
    FunctionCompiler.prototype.createStrategy = function (code) {
        if (code instanceof Function) {
            return new CompilerJSFunctionStrategy(code);
        }
        else if (!code || isEmptyObject(code)) {
            return new CompilerStrategy();
        }
        else if (isString(code)) {
            return BindingFunctionStrategy.isCompatible(code)
                ? new BindingFunctionStrategy(code)
                : new CompilerTrivialStrategy(code);
        }
        else {
            throw "Unsupported strategy";
            // var logic = isBizLogic(code) ? code.logic : code;
            // return new CompilerInlineFunctionStrategy(functions, logic);
        }
    };
    return FunctionCompiler;
}());
export { FunctionCompiler };
var CompilerStrategy = /** @class */ (function () {
    function CompilerStrategy() {
    }
    CompilerStrategy.prototype.run = function (runContext, contextParams) { return Promise.resolve(); };
    return CompilerStrategy;
}());
var CompilerJSFunctionStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(CompilerJSFunctionStrategy, _super);
    function CompilerJSFunctionStrategy(calls) {
        var _this = _super.call(this) || this;
        _this.calls = calls;
        return _this;
    }
    CompilerJSFunctionStrategy.prototype.run = function (runContext, contextParams) {
        var result = this.calls(runContext);
        return result;
        // instanceof Promise ? result : Promise.resolve(result);
    };
    return CompilerJSFunctionStrategy;
}(CompilerStrategy));
var CompilerTrivialStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(CompilerTrivialStrategy, _super);
    function CompilerTrivialStrategy(calls) {
        var _this = _super.call(this) || this;
        _this.calls = calls;
        return _this;
    }
    CompilerTrivialStrategy.prototype.run = function (runContext, contextParams) {
        if (!this.compiledFunctions) {
            this.compiledFunctions = this.compile(this.calls, contextParams);
        }
        var result = this.compiledFunctions(runContext);
        return result;
    };
    CompilerTrivialStrategy.prototype.compile = function (expr, paramNames) {
        var func = new Function(paramNames.join(", "), expr);
        return function (runContext) {
            var args = paramNames.map(function (name) { return runContext[name]; });
            return func.apply(func, args);
        };
    };
    return CompilerTrivialStrategy;
}(CompilerStrategy));
var BindingFunctionStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(BindingFunctionStrategy, _super);
    function BindingFunctionStrategy(functionName) {
        return _super.call(this, functionName) || this;
    }
    BindingFunctionStrategy.isCompatible = function (functionName) {
        return /^\$(global|local)\.[\w\$]+$/.test(functionName);
    };
    BindingFunctionStrategy.prototype.compile = function (functionName, argNames) {
        var funcBody = "return " + functionName + "($context);", allParamNames = ["$context"];
        [].push.apply(allParamNames, argNames);
        var func = new Function(allParamNames.join(", "), funcBody);
        return function (runContext) {
            var args = [runContext];
            argNames.forEach(function (name) {
                args.push(runContext[name]);
            });
            return func.apply(func, args);
        };
    };
    return BindingFunctionStrategy;
}(CompilerTrivialStrategy));

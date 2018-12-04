/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as ko from "knockout";
import { FunctionCompiler } from "../logic/function-compiler";
import { getModelValue, compileGetter, compileSetter } from "../utils";
import { propertyVisitor } from "../utils/property-visitor";
export default function createLinkedModel(config, runContext, callerInfo) {
    var observables = [], result = propertyVisitor(config, function (valueContext) {
        if (valueContext.name.endsWith("Expr")) {
            return valueContext.value;
        }
        var expression = valueContext.value;
        if (FunctionCompiler.isCodeHandler(valueContext.original)) {
            return valueContext.owner[valueContext.name] = valueContext.original[valueContext.name];
        }
        if (isExpression(expression)) {
            var owner = valueContext.owner, propertyName = valueContext.name;
            var modelValue = getModelValue(expression, runContext, callerInfo);
            if (typeof modelValue === "function") {
                return valueContext.value;
            }
            if (valueContext.isArray) {
                ko.computed(function () {
                    return owner[propertyName] = getModelValue(expression, runContext, callerInfo);
                });
            }
            else {
                var observableHolder_1 = createObservableHolder(modelValue, expression, runContext, valueContext);
                observables.push(observableHolder_1);
                Object.defineProperty(owner, propertyName, {
                    enumerable: true,
                    configurable: true,
                    get: function () { return observableHolder_1.value; }
                });
            }
            return;
        }
        return valueContext.value;
    });
    result._observables = observables;
    return result;
}
export function createObservableHolder(initialValue, expression, runContext, valueContext) {
    var getterCalled = false, isComputedCalculated = false, subscriptions = [];
    var getter = createGetter(expression), setter = createSetter(expression), observable = ko.observable(initialValue), computed = ko.computed({
        read: function () {
            getterCalled = true;
            isComputedCalculated = true;
            var res = getter(runContext);
            observable(res);
            return observable();
        },
        deferEvaluation: true
    }), owner = valueContext.owner, pushObservable = function (obs) {
        owner._observables = (owner._observables || []);
        owner._observables.push(obs);
    }, observableHolder = {
        expression: expression,
        propPath: valueContext.path,
        propName: valueContext.name,
        subscribe: function (callBack) {
            if (!isComputedCalculated) {
                computed();
            }
            var subscription = observable.subscribe(callBack);
            subscriptions.push(subscription);
            return subscription;
        },
        dispose: function () {
            subscriptions.forEach(function (subscription) { return subscription.dispose(); });
            subscriptions = [];
        },
        get value() {
            return computed();
        },
        set value(value) {
            getterCalled = false;
            setter(runContext, value);
            if (!getterCalled) {
                observable(value);
            }
        },
        pushObservable: pushObservable
    };
    return observableHolder;
}
export function isExpression(expression) {
    return expression && typeof expression === "string" && (expression.charAt(0) === "$" || expression.startsWith("!$"));
}
function createGetter(expression) {
    var isNegative = expression.charAt(0) === "!", rawExpression = isNegative ? expression.substr(1) : expression, getter = compileGetter(rawExpression);
    return isNegative ? function (object) { return !getter(object); } : getter;
}
function createSetter(expression) {
    var isNegative = expression.charAt(0) === "!", rawExpression = isNegative ? expression.substr(1) : expression, setter = compileSetter(rawExpression);
    return isNegative ? function (object, value) { return setter(object, !value); } : setter;
}

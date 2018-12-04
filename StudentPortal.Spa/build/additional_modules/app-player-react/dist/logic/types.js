/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as ko from "knockout";
export var TYPES;
(function (TYPES) {
    TYPES[TYPES["PRIMITIVE_TYPE"] = 0] = "PRIMITIVE_TYPE";
    TYPES[TYPES["ARRAY_TYPE"] = 1] = "ARRAY_TYPE";
    TYPES[TYPES["OBJECT_TYPE"] = 2] = "OBJECT_TYPE";
    TYPES[TYPES["STORE_TYPE"] = 3] = "STORE_TYPE";
    TYPES[TYPES["TYPED_OBJECT"] = 4] = "TYPED_OBJECT";
})(TYPES || (TYPES = {}));
// from DevExpress.data.utils.odata.keyConverters
export function odataToJsonType(odataType) {
    if (!odataType) {
        return "object";
    }
    if (odataType.startsWith("Edm.")) {
        odataType = odataType.substr(4);
    }
    switch (odataType) {
        case "String":
            return "string";
        case "Int32":
        case "Int64":
            return "number";
        case "Guid":
            return "string";
        case "Boolean":
            return "boolean";
        default:
            return "object";
    }
}
var TypeInfoRepository = /** @class */ (function () {
    function TypeInfoRepository(storesConfig) {
        this.types = [];
        this.addWithList({
            name: TypeInfoRepository.BOOLEAN,
            kind: TYPES.PRIMITIVE_TYPE,
            defaultValueCtor: function () { return false; },
            toUIString: function (value) { return ko.unwrap(value).toString(); }
        });
        this.addWithList({
            name: "number",
            kind: TYPES.PRIMITIVE_TYPE,
            defaultValueCtor: function () { return 0; },
            toUIString: function (value) { return ko.unwrap(value).toString(); }
        });
        this.addWithList({
            name: "string",
            kind: TYPES.PRIMITIVE_TYPE,
            defaultValueCtor: function () { return ""; },
            toUIString: function (value) { return "\"" + ko.unwrap(value) + "\""; }
        });
        this.addWithList({
            name: "datetime",
            kind: TYPES.PRIMITIVE_TYPE,
            defaultValueCtor: function () { return new Date(); },
            toUIString: function (value) { return ko.unwrap(value).toString(); }
        });
        this.addWithList({
            name: "object",
            kind: TYPES.OBJECT_TYPE,
            defaultValueCtor: function () { return {}; },
            toUIString: function (value) {
                if (value === null) {
                    return "null";
                }
                if (typeof value === "undefined") {
                    return "undefined";
                }
                return ko.unwrap(value).toString();
            }
        });
        this.addWithList({
            name: "guid",
            kind: TYPES.PRIMITIVE_TYPE,
            defaultValueCtor: function () { return ""; },
            toUIString: function (value) { return ko.unwrap(value); }
        });
        this.addStoreTypes(storesConfig);
    }
    Object.defineProperty(TypeInfoRepository, "BOOLEAN", {
        get: function () { return "boolean"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeInfoRepository, "OBJECT", {
        get: function () { return "object"; },
        enumerable: true,
        configurable: true
    });
    TypeInfoRepository.hasProperties = function (t) {
        if (t.kind !== TYPES.STORE_TYPE) {
            return false;
        }
        return (t.properties.length > 1 && !!t.keyProperty) || (t.properties.length > 0 && !t.keyProperty);
    };
    TypeInfoRepository.prototype.get = function (typeName) {
        return this.types[ko.unwrap(typeName)];
    };
    TypeInfoRepository.prototype.getAll = function () {
        return this.types;
    };
    // typeOf(value: any): string {
    //     var valueType = typeof value;
    //     if(this.types[valueType]) {
    //         return valueType;
    //     }
    //     for(var i = 0; i < this.types.length; i++) {
    //         var typeInfo = this.types[i];
    //         if(typeInfo.kind === TYPES.PRIMITIVE_TYPE) {
    //             if(typeof typeInfo.defaultValueCtor() === valueType) {
    //                 return typeInfo.name;
    //             } else {
    //                 if(this.isStoreObject(value, typeInfo)) {
    //                     return typeInfo.name;
    //                 }
    //             }
    //         }
    //     }
    //     return null;
    // }
    TypeInfoRepository.prototype.storeId = function (typeName) {
        var type = this.get(typeName);
        if (type) {
            if (type.kind === TYPES.STORE_TYPE) {
                return type.name;
            }
            else if (type.kind === TYPES.ARRAY_TYPE && type.nestedType.kind === TYPES.STORE_TYPE) {
                return type.nestedType.name;
            }
        }
        return null;
    };
    TypeInfoRepository.prototype.addTypedObjectType = function (typeInfo) {
        if (!typeInfo) {
            return;
        }
        this._add(typeInfo);
    };
    TypeInfoRepository.prototype.addStoreTypes = function (storesConfig) {
        var _this = this;
        if (!storesConfig) {
            return;
        }
        storesConfig.forEach(function (store) {
            var keyProperty;
            var properties = [];
            if (store.fields) {
                store.fields.forEach(function (field) {
                    var baseType = _this.get(field.type);
                    if (!baseType) {
                        // console.warn("Store '" + store.id + "' field '" + field.name + "' has unknown type '" + field.type + "'");
                        baseType = _this.get("object");
                    }
                    var property = {
                        name: field.name,
                        type: baseType
                    };
                    if (field.name === store.key) {
                        keyProperty = property;
                    }
                    else {
                        properties.push(property);
                    }
                });
            }
            if (!keyProperty && store.key) {
                var keyTypeName = odataToJsonType(store["keyType"]);
                keyProperty = { name: store.key, type: _this.get(keyTypeName) || _this.get(TypeInfoRepository.OBJECT) };
            }
            _this._add({
                name: store.id,
                displayName: store.name,
                kind: TYPES.STORE_TYPE,
                keyProperty: keyProperty,
                properties: properties,
                defaultValueCtor: function () { return _this.defaultObjectCtor(properties); },
                toUIString: function (value) { return "{" + store.id + "}"; }
            });
        });
    };
    // private isStoreObject(object: {}, typeInfo: ITypeInfo): boolean {
    //     if(!$.isPlainObject(object)) {
    //          return false;
    //     }
    //     var result = true;
    //     $.each(object, (propertyName, propertyValue) => {
    //         result = typeInfo.properties.some(property => propertyName === property.name);
    //         return result;
    //     });
    //     return result;
    // }
    TypeInfoRepository.prototype.defaultObjectCtor = function (properties) {
        return {};
    };
    TypeInfoRepository.prototype.createListType = function (plainType) {
        var listType = {
            name: plainType.name + "[]",
            kind: TYPES.ARRAY_TYPE,
            defaultValueCtor: function () { return []; },
            nestedType: plainType,
            toUIString: function (value) {
                value = ko.unwrap(value);
                var result = plainType.name + "[";
                if (value && value.length > 0) {
                    result += value.length;
                }
                return result + "]";
            }
        };
        return listType;
    };
    TypeInfoRepository.prototype.addWithList = function (type) {
        this._add(type);
        var listType = this.createListType(type);
        this._add(listType);
    };
    TypeInfoRepository.prototype._add = function (type) {
        this.types.push(type);
        this.types[type.name] = type;
    };
    return TypeInfoRepository;
}());
export { TypeInfoRepository };

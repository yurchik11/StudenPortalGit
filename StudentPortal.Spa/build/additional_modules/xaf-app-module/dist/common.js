/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import { detailModelProperty, baseModelProperty } from "./views";
export var objectKey = "Oid";
export var getImediatePostDataPropertyGetterSetter = function (propertyName) {
    return {
        getter: function (_a) {
            var $local = _a.$local;
            if ($local[detailModelProperty.currentObjPropName] && $local[detailModelProperty.currentObjPropName][propertyName]) {
                return $local[detailModelProperty.currentObjPropName][propertyName];
            }
            else {
                return null;
            }
        },
        setter: function (_a) {
            var $functions = _a.$functions, $value = _a.$value, $local = _a.$local;
            $local[detailModelProperty.currentObjPropName][propertyName] = $value;
            $functions.refreshParameter(baseModelProperty.viewState);
        }
    };
};

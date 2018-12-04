/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
// import { compileGetter } from "devextreme/utils";
// export function lookupItems(config) {
//     const
//         { value, valueExpr, items, ...widget } = config,
//         valueGetter = valueExpr
//             ? compileGetter(valueExpr)
//             : val => val;
//     let restoredFromItemsValue = value;
//     if(Array.isArray(items)) {
//         items.forEach(item => {
//             if(JSON.stringify(value) === JSON.stringify(valueGetter(item))) {
//                 restoredFromItemsValue = valueGetter(item);
//             }
//         });
//     }
//     return {
//         ...widget,
//         items,
//         value: restoredFromItemsValue
//     };
// }

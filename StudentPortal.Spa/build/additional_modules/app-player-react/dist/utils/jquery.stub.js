/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import { Deferred } from "devextreme/core/utils/deferred";
import { sendRequest } from "devextreme/core/utils/ajax";
var JQuery = {
    parseXML: function (object) { return new Error("not implemented"); },
    Deferred: Deferred,
    ajax: sendRequest
};
export default JQuery;

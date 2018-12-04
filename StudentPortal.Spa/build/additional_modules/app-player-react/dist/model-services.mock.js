/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import { TypeInfoRepository } from "./logic/types";
import { ModelStorage } from "./model/model-storage";
var TestModelServices = /** @class */ (function () {
    function TestModelServices() {
        this.id = "testapp";
        this.typeInfoRepository = new TypeInfoRepository();
        this.modelStorage = new ModelStorage(this.id);
    }
    return TestModelServices;
}());
export { TestModelServices };

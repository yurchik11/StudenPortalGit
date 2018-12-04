/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import jss from "jss";
import jssNested from "jss-nested";
import injectSheet from "react-jss";
jss.use(jssNested());
export function createWithStyleComponent(defaultStyle) {
    defaultStyle = defaultStyle || {};
    var injectComponentStylesSheet = injectSheet(defaultStyle);
    return injectComponentStylesSheet(function (props) {
        combineClassesProps(props);
        return props.children(props.classes);
    });
}
function combineClassesProps(props) {
    var combinedMainClasses = [props.classes.main || "__default__"];
    if (props.className) {
        combinedMainClasses.push(props.className || "__default__");
    }
    props.classes.main = combinedMainClasses.join(" ") || "__default__"; // TODO Beresnev: Remove after fix devextreme bug with empt string as class applying;
}

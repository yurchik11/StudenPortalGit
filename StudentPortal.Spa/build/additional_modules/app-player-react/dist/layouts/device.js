/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as React from "react";
import Media from "react-media";
export var Device = function (props) {
    return (React.createElement(Media, { query: "(max-width: 599px)" }, function (media) {
        return media
            ? props.children("mobile")
            : (React.createElement(Media, { query: "(max-width: 1024px)" }, function (matches) { return matches ? props.children("tablet") : props.children("desktop"); }));
    }));
};

/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
/**
 * Calculate luminance of color following CCIR 601 standard
 * @see https://en.wikipedia.org/wiki/Luma_%28video%29
 * @param color Color in any css format. Alpha channel will be ignored.
 * @returns value between 0.0 and 1.0
 */
export function calcLuminance(color) {
    var _a = tslib_1.__read(colorToRGBA(color), 3), red = _a[0], green = _a[1], blue = _a[2];
    return (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
}
/**
 * Change color luminance
 * @see https://www.sitepoint.com/javascript-generate-lighter-darker-color/
 * @param hex - a hex color value such as “#abc” or “#123456” (the hash is optional).
 * @param luminance - the luminosity factor, i.e. -0.1 is 10% darker, 0.2 is 20% lighter, etc.
 * @returns liminated color in hex.
 */
export function changeColorLuminance(hex, luminance) {
    if (luminance === void 0) { luminance = 0; }
    var rgb = colorToRGB(hex), luminanceRGB = rgb.map(function (part) {
        var newColorValue = part + (part * luminance), value = Math.round(Math.min(Math.max(0, newColorValue), 255)).toString(16);
        return ("00" + value).substr(value.length);
    });
    return "#" + luminanceRGB.join("");
}
/**
 * @see https://stackoverflow.com/a/24390910
 * @param color Color in any css format
 * @returns [red, green, blue, alpha] components
 */
export function colorToRGBA(color) {
    var canvas = document.createElement("canvas");
    canvas.height = 1;
    canvas.width = 1;
    var context = canvas.getContext("2d");
    context.fillStyle = color;
    context.fillRect(0, 0, 1, 1);
    var data = context.getImageData(0, 0, 1, 1).data;
    return Array.prototype.slice.call(data);
}
function colorToRGB(color) {
    return colorToRGBA(color).slice(0, 3);
}

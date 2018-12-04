/*! eXpressApp Framework
 * @version v2018 vol 2
 * @link https://www.devexpress.com
 * @license https://www.devexpress.com/Support/EULAs/universal.xml 
 * Copyright (C) 2000-2018 Developer Express Inc.  ALL RIGHTS RESERVED
 */
import * as tslib_1 from "tslib";
import * as dxThemes from "devextreme/ui/themes";
import hash from "string-hash";
import themeLess from "../less/theme-builder-generic-light.less";
import themePatch from "../less/theme-patch-less";
import lessLoader from "./less-browser";
import { calcLuminance, changeColorLuminance } from './color-utils';
import appbarThemeMetadata from "./metadata/appbar-theme-metadata.json";
import detailItemToolbarMobileThemeMetadata from "./metadata/detail-item-toolbar-mobile-theme-metadata.json";
import navigationThemeMetadata from "./metadata/navigation-theme-metadata.json";
import selectionToolbarThemeMetadata from "./metadata/selection-toolbar-theme-metadata.json";
import baseThemeMetadata from "./metadata/base-theme-metadata.json";
import toolbarThemeMetadata from "./metadata/toolbar-theme-metadata.json";
var fullLess = themeLess + themePatch, lessProcessor = lessLoader({});
var themeScopes = [
    { metadata: baseThemeMetadata },
    { name: "navigation-menu", metadata: navigationThemeMetadata },
    { name: "toolbar", metadata: toolbarThemeMetadata },
    { name: "appbar", metadata: appbarThemeMetadata },
    { name: "selection-toolbar", metadata: selectionToolbarThemeMetadata },
    { name: "detail-item-toolbar-mobile", metadata: detailItemToolbarMobileThemeMetadata }
];
var defaultColors = {
    background: "#FFFFFF",
    primary: "#FF8D4D",
    secondary: "#59769E",
    foregroundDark: "#333333",
    foregroundLight: "#FFFFFF"
};
var ThemeGenerator = /** @class */ (function () {
    function ThemeGenerator() {
    }
    ThemeGenerator.applyTheme = function (appConf) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var css, style;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!appConf) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getFullCss(appConf.theme)];
                    case 1:
                        css = _a.sent();
                        if (css) {
                            style = document.getElementById("#dynamic-styles");
                            if (!style) {
                                style = document.createElement("style");
                                style.setAttribute("id", "dynamic-styles");
                                style.setAttribute("type", "text/css");
                                document.head.appendChild(style);
                            }
                            style.innerHTML = css;
                            dxThemes.default.current({ _autoInit: true });
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    ThemeGenerator.getFullCss = function (baseTheme) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var fullBaseTheme_1, themeList, lessList, cssList, err_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        fullBaseTheme_1 = this.getFullBaseTheme(baseTheme), themeList = themeScopes.map(function (_a) {
                            var name = _a.name, metadata = _a.metadata;
                            return ({ name: name, theme: _this.getTheme(metadata) });
                        }), lessList = themeList.map(function (_a) {
                            var name = _a.name, theme = _a.theme;
                            return ({ name: name, less: _this.getLess(tslib_1.__assign({}, fullBaseTheme_1, theme), name) });
                        });
                        return [4 /*yield*/, Promise.all(lessList.map(function (_a) {
                                var name = _a.name, less = _a.less;
                                return _this.getCss(less, name);
                            }))];
                    case 1:
                        cssList = _a.sent();
                        return [2 /*return*/, cssList.join(" ")];
                    case 2:
                        err_1 = _a.sent();
                        alert("Cannot get theme.");
                        // tslint:disable-next-line:no-console
                        console.error(err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, null];
                }
            });
        });
    };
    ThemeGenerator.getFullBaseTheme = function (baseTheme) {
        var backgroundColor = baseTheme.backgroundColor || defaultColors.background, onBackgroundColor = baseTheme.onBackgroundColor || this.getForegroundColor(backgroundColor), primaryColor = baseTheme.primaryColor || defaultColors.primary, onPrimaryColor = baseTheme.onPrimaryColor || this.getForegroundColor(primaryColor), primaryLightColor = baseTheme.primaryLightColor || changeColorLuminance(primaryColor, 0.7), secondaryColor = baseTheme.secondaryColor || defaultColors.secondary, onSecondaryColor = baseTheme.onSecondaryColor || this.getForegroundColor(secondaryColor);
        return tslib_1.__assign({}, baseTheme, { backgroundColor: backgroundColor, onBackgroundColor: onBackgroundColor, primaryLightColor: primaryLightColor, primaryColor: primaryColor, onPrimaryColor: onPrimaryColor, secondaryColor: secondaryColor, onSecondaryColor: onSecondaryColor });
    };
    ThemeGenerator.getForegroundColor = function (backgroundColor) {
        var luminance = calcLuminance(backgroundColor);
        return luminance > 0.5 ? defaultColors.foregroundDark : defaultColors.foregroundLight;
    };
    ThemeGenerator.getTheme = function (metadata) {
        return metadata.items.reduce(function (accumulator, pair) { return (accumulator[pair.key.substr(1)] = pair.value, accumulator); }, {});
    };
    ThemeGenerator.getLess = function (theme, name) {
        var colors = this.getLessColors(theme), less = name ? "." + name + " { " + (fullLess + colors) + " } ." + name + "-replacement:extend(." + name + " all) {}" : fullLess + colors;
        return less;
    };
    ThemeGenerator.getLessColors = function (theme) {
        var colorString = "";
        for (var key in theme) {
            if (theme[key] || key === "appearance") {
                colorString += "@" + key + ": " + theme[key] + ";";
            }
        }
        return colorString;
    };
    ThemeGenerator.getCss = function (less, name) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var scope, storedLessHash, actualLessHash, css, patchedCss;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        scope = name ? "." + name : "", storedLessHash = localStorage.getItem("theme-hash" + scope), actualLessHash = hash(less).toString();
                        if (storedLessHash && storedLessHash === actualLessHash) {
                            return [2 /*return*/, localStorage.getItem("theme-css" + scope)];
                        }
                        return [4 /*yield*/, lessProcessor.render(less)];
                    case 1:
                        css = (_a.sent()).css;
                        patchedCss = css.replace(new RegExp("." + name + "-replacement ", "g"), "." + name);
                        try {
                            localStorage.setItem("theme-css" + scope, patchedCss);
                            localStorage.setItem("theme-hash" + scope, actualLessHash);
                        }
                        catch (error) {
                            console.warn("This browser doesn't support theme caching", error);
                        }
                        return [2 /*return*/, patchedCss];
                }
            });
        });
    };
    return ThemeGenerator;
}());
export { ThemeGenerator };

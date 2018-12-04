/// <reference types="react" />
export declare type Orientation = "vertical" | "horizontal";
export declare function getFlexStyle(style?: React.CSSProperties, orientation?: Orientation): any;
export declare function convertToFlexProperty(orientation: Orientation): (settings: {
    [key: string]: string;
}) => {};
export declare function extractFlex(styles: {
    [key: string]: any;
}): {
    flexStyles: {
        flexDirection: any;
        justifyContent: any;
        alignItems: any;
        flexWrap: any;
        flexFlow: any;
        alignContent: any;
        flexBasis: any;
        flexGrow: any;
        flexShrink: any;
        flex: any;
        alignSelf: any;
        order: any;
    };
    otherStyles: {
        [key: string]: any;
    };
};
//# sourceMappingURL=flex-helper.d.ts.map
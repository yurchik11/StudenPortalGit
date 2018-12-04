import * as React from "react";
declare type CSSProperties = React.CSSProperties;
declare type StyleRules<ClassKey extends string = string, Props = {}> = Record<ClassKey, CSSProperties | ((props: Props) => React.CSSProperties)>;
export declare type ComponentWithStyleProps = {
    style?: CSSProperties;
    className?: string;
};
export declare function createWithStyleComponent<ClassKey extends string>(defaultStyle: {
    main?: CSSProperties;
} & StyleRules<ClassKey>): React.ComponentType<{
    className?: string;
    children: (classes: {
        main: string;
    } & Record<ClassKey, string>) => any;
}>;
export {};
//# sourceMappingURL=with-style.d.ts.map
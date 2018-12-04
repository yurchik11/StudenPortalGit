import * as React from "react";
declare type Props = {
    selectedItems: {}[];
    selectionIndependent: any[];
    selectionDependent: any[];
};
export declare function withSelectionDependentToolbar<P extends {
    items: {}[];
    visible: boolean;
    themeScope?: string;
}>(Component: React.ComponentType<P>): (props: P & Props) => JSX.Element;
export {};
//# sourceMappingURL=with-selection-dependent-toolbar.d.ts.map
import * as React from "react";
import { ComponentWithStyleProps } from "./with-style";
import { ComponentBaseProps } from "../common/base-component";
declare type ImageProps = ComponentBaseProps & ComponentWithStyleProps & {
    src?: string;
    previewSrc?: string;
    onClick?: any;
    onLoad?: any;
    onError?: any;
};
declare type ImageState = {
    previewVisible: boolean;
    error: boolean;
};
export declare class ReactImage extends React.Component<ImageProps, ImageState> {
    static defaultProps: {
        src: string;
    };
    state: {
        previewVisible: boolean;
        error: boolean;
    };
    onLoad(): void;
    createImage: (classes: {
        main: string;
    }) => JSX.Element;
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=image-widget.d.ts.map
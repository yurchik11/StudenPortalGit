import * as React from "react";
import { ComponentWithStyleProps } from "./with-style";
export declare type EditorProps = ComponentWithStyleProps & {
    value: any;
    onValueChanged: (e: {
        value: string;
    }) => void;
    visible?: boolean;
    readOnly?: boolean;
};
export declare type ReactFileImageProps = EditorProps & {
    urlSrc?: string;
    emptyLabel?: string;
    clearText?: string;
    takePhotoText?: string;
    openGalleryText?: string;
};
declare type State = {
    value: any;
    imageSrc: any;
    emptyLabelVisible: any;
    imageStyle: any;
    prevProps: any;
    actionSheetOptions?: any;
    fileSelected: any;
    showFileDialogOrActionSheet?: any;
};
export declare class ReactFileImage extends React.Component<ReactFileImageProps, State> {
    constructor(props: ReactFileImageProps);
    static defaultProps: {
        visible: boolean;
        readOnly: boolean;
        value: any;
        emptyLabel: string;
        clearText: string;
        openGalleryText: string;
        takePhotoText: string;
    };
    static getCalculatedStateParts(clearing: any, props: {
        value: string;
        imageSrc: string;
    }, state: {
        value: string;
        imageSrc?: string;
        prevProps: any;
    }, style: any): {
        imageStyle: {
            width: any;
            height: any;
        };
        imageSrc: string;
        value: string;
        emptyLabelVisible: boolean;
        prevProps: any;
    };
    static getDerivedStateFromProps(config: ReactFileImageProps, prevState: State): {
        imageStyle: {
            width: any;
            height: any;
        };
        imageSrc: string;
        value: string;
        emptyLabelVisible: boolean;
        prevProps: any;
    };
    static getImageStyle({ width, height }: {
        width: any;
        height: any;
    }, emptyLabelVisible: any): {
        width: any;
        height: any;
    };
    _getActionSheetOption(currentTarget: any, stopPropagation: any): {
        target: any;
        usePopover: boolean;
        visible: boolean;
        showTitle: boolean;
        width: string;
        dataSource: any[];
        onOptionChanged: (eventArgs: any) => void;
        onItemClick: (eventArgs: any) => void;
    };
    _cordovaCameraDelegate(sourceType?: number): void;
    _handleFiles(filesHolder: {
        files: any;
    }): void;
    fileInput: HTMLInputElement;
    showFileDialog(stopPropagation: any): void;
    showFileDialogOrActionSheet(eventArgs: React.MouseEvent<HTMLElement>): void;
    fileSelected(event: any): void;
    upadateValue(newValue: any): void;
    getUnchangedStatePart(props: any): {
        fileSelected: any;
        showFileDialogOrActionSheet: any;
    };
    onImageError(e: any): void;
    renderImage({ urlSrc, imageSrc, imageStyle, imageClass }: {
        urlSrc: any;
        imageSrc: any;
        imageStyle: any;
        imageClass: any;
    }): JSX.Element;
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=file-image-widget.d.ts.map
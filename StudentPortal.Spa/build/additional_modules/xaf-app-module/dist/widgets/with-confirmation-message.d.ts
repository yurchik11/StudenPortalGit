import * as React from "react";
declare type withConfirmationItem = {
    text: string;
    onExecute?: any;
    confirmationMessage?: string;
};
export declare type Props = {
    items: withConfirmationItem[];
};
export declare type State = {
    items?: withConfirmationItem[];
    patchedItems?: withConfirmationItem[];
};
export declare function withConfirmationMessage<P extends {
    items: {}[];
}>(Component: React.ComponentType<P>): {
    new (props: any): {
        render(): JSX.Element;
        setState<K extends "items" | "patchedItems">(state: State | ((prevState: Readonly<State>, props: Readonly<Props>) => State | Pick<State, K>) | Pick<State, K>, callback?: () => void): void;
        forceUpdate(callBack?: () => void): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<Props>;
        state: Readonly<State>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<Props>, nextState: Readonly<State>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Props>, prevState: Readonly<State>): any;
        componentDidUpdate?(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Props>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Props>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Props>, nextState: Readonly<State>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Props>, nextState: Readonly<State>, nextContext: any): void;
    };
    getDerivedStateFromProps(props: Props, state: State): {
        items: withConfirmationItem[];
        patchedItems: withConfirmationItem[];
    };
};
export {};
//# sourceMappingURL=with-confirmation-message.d.ts.map
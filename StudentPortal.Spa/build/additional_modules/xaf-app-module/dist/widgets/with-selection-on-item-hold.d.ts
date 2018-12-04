import * as React from "react";
import { ListProps } from "app-player-react/dist/widgets/list-widget";
declare type State = {
    selectionMode: ListProps["selectionMode"];
};
export declare function withSelectionOnItemHold(Widget: any): {
    new (props: Readonly<any>): {
        state: State;
        render(): JSX.Element;
        onItemHoldHandler: () => void;
        setState<K extends "selectionMode">(state: State | ((prevState: Readonly<State>, props: Readonly<any>) => State | Pick<State, K>) | Pick<State, K>, callback?: () => void): void;
        forceUpdate(callBack?: () => void): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<any>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<any>, nextState: Readonly<State>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<any>, prevState: Readonly<State>): any;
        componentDidUpdate?(prevProps: Readonly<any>, prevState: Readonly<State>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<any>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<any>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<any>, nextState: Readonly<State>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<any>, nextState: Readonly<State>, nextContext: any): void;
    };
    new (props: any, context?: any): {
        state: State;
        render(): JSX.Element;
        onItemHoldHandler: () => void;
        setState<K extends "selectionMode">(state: State | ((prevState: Readonly<State>, props: Readonly<any>) => State | Pick<State, K>) | Pick<State, K>, callback?: () => void): void;
        forceUpdate(callBack?: () => void): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<any>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<any>, nextState: Readonly<State>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<any>, prevState: Readonly<State>): any;
        componentDidUpdate?(prevProps: Readonly<any>, prevState: Readonly<State>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<any>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<any>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<any>, nextState: Readonly<State>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<any>, nextState: Readonly<State>, nextContext: any): void;
    };
};
export {};
//# sourceMappingURL=with-selection-on-item-hold.d.ts.map
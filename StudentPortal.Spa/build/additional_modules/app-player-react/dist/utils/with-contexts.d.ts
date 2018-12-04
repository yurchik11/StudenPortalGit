import * as React from "react";
declare type WithContextsProps<C extends object> = {
    contexts: {
        [K in keyof C]: React.Context<C[K]>;
    };
    children: (values: C) => React.ReactElement<any>;
};
export declare const WithContexts: <C extends object>(props: WithContextsProps<C>) => React.ReactElement<any>;
export {};
//# sourceMappingURL=with-contexts.d.ts.map
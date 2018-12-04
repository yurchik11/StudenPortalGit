export default function getDeviceType(currentDevice?: import("devextreme/bundles/dx.all").default.Device): "tablet" | "desktop" | "phone" | "pnone";
export declare function isSafariBasedBrowser(): boolean;
export declare type DeviceValue<T> = {
    [device in "desktop" | "tablet" | "phone"]?: T;
} | T;
export declare function getDeviceValue<T>(source: DeviceValue<T>): T;
//# sourceMappingURL=device.d.ts.map
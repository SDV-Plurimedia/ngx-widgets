/// <reference types="es6-shim" />
/// <reference types="bootstrap-switch" />
export declare class SwitchComponent {
    switch: Switch;
    dependenciesAreLoaded: boolean;
    dependenciesAreLoadedPromise: Promise<any>;
    constructor();
    ngOnInit(): void;
}
export interface Switch {
    scope: any;
    callback_on: () => void;
    callback_off: () => void;
    active: boolean;
    options?: BootstrapSwitch.BootstrapSwitchOptions;
}

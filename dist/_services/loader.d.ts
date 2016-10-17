export declare class LoaderService {
    private static instance;
    private static isCreating;
    private dialog;
    constructor();
    static getInstance(): LoaderService;
    private getMessage(state?);
    start(): void;
    updateState(percent: any): void;
    stop(): void;
}

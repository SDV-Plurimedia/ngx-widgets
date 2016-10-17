export declare class StaticLoaderService {
    private static instance;
    private static isCreating;
    private static promiseLoaded;
    constructor();
    private debug(message);
    static getInstance(): StaticLoaderService;
    require_once(depend: any): Promise<any>;
    require_once_ordered(depend: Array<string>): Promise<any>;
    private load_multiple_file(tab);
    private load_file_once(url);
}

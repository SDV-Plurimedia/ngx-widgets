export declare class HierarchieListComponent {
    params: HierarchieList;
    datas: any[];
    root_id: string;
    name_column: string;
    parent_scope: any;
    buttons: HierarchieButton[];
    level: any[];
    level_displayed: any[];
    datas_level: any[];
    last_selected_level: any;
    constructor();
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
    selectLevel(num: any, id: any): void;
    private getListLevel(num);
    private getNextLevel(num, id);
    getDisplayedLevel(): void;
    hasChildren(id: string): boolean;
}
export interface HierarchieButton {
    text: string;
    class?: string;
    action: (any) => void;
}
export interface HierarchieList {
    name_column: string;
    primary_key: string;
    scope: any;
    root_id: string;
    buttons?: Array<HierarchieButton>;
}

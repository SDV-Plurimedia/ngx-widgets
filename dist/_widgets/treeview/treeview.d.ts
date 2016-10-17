/// <reference types="es6-shim" />
export declare class TreeviewComponent {
    params: any;
    datas: any[];
    root_id: string;
    name_column: string;
    parent_scope: any;
    buttons: TreeviewButton[];
    checkbox: TreeviewCheckbox;
    protected sorted_datas: any[];
    protected states: TreeviewState[];
    protected indents: {};
    constructor();
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
    hasChildren(id: string): boolean;
    sortDatas(id: string): void;
    getDeepIndent(id: string): number;
    toggle(id: string): void;
    isHidden(id: string): boolean;
    isChecked(item: any): boolean;
}
export interface Treeview {
    name_column: string;
    primary_key: string;
    scope: any;
    root_id: string;
    buttons?: Array<TreeviewButton>;
    checkbox?: TreeviewCheckbox;
}
export interface TreeviewState {
    id: string;
    open: boolean;
}
export interface TreeviewButton {
    text: string;
    class?: string;
    action: (any) => void;
}
export interface TreeviewCheckbox {
    column_value: string;
    checked: Array<any>;
    action_on_change: (any) => void;
    action_validate: () => void;
}

import { EventEmitter } from '@angular/core';
export declare class MenuInterneComponent {
    select: EventEmitter<MenuItem>;
    button: EventEmitter<boolean>;
    openChange: EventEmitter<boolean>;
    title: string;
    items: MenuItem[];
    icon: string;
    tooltip: string;
    open: boolean;
    constructor();
    ngOnInit(): void;
    ngOnDestroy(): void;
    desactiveAll(items: MenuItem[]): void;
    selectItem(item: MenuItem, parentItem?: MenuItem): void;
    toggleState(): void;
}
export declare class MenuItemBadge {
    class: string;
    number: number;
    constructor(obj: any);
}
export declare class MenuItem {
    id: string;
    icon: string;
    title: string;
    badge: MenuItemBadge;
    subitems: MenuItem[];
    active: boolean;
    constructor(obj: any);
}

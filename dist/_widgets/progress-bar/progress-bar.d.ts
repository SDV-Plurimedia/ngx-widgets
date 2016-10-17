export declare class ProgressBarComponent {
    class: string;
    datas: {
        value: number;
        min_value: number;
        max_value: number;
    };
    percent: string;
    constructor();
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
}

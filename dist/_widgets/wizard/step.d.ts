import { WizardComponent } from "./wizard";
export declare class WizartStepComponent {
    private parent;
    title: string;
    state: string;
    active: boolean;
    value: number;
    contentTop: number;
    contentStyle: string;
    XSsize: number;
    index: number;
    constructor(parent: WizardComponent);
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
    private updateRendering();
    disactivate(): void;
    activate(): void;
}

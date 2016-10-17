import { WizartStepComponent } from "./step";
export declare class WizardComponent {
    dependenciesAreLoaded: boolean;
    dependenciesAreLoadedPromise: Promise<any>;
    steps: WizartStepComponent[];
    current_step: number;
    name_wip: string;
    constructor();
    selectStep(step: WizartStepComponent, event: any): boolean;
}

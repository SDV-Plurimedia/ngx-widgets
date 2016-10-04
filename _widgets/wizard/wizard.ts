/// <reference path="../../../../../node_modules/@types/jquery/index.d.ts"/>

import {Component, Injectable} from '@angular/core';
import {WizartStepComponent} from "./step";

/*
  import {WizardComponent} from '../_widgets/wizard/wizard';
  import {WizartStepComponent} from '../_widgets/wizard/step';

  Example d'utilisation
  <wizard>
    <step state='complete' title="Premiere etape" >contenu 1</step>
    <step state='current' title="Etape courante">contenu 2</step>
    <step state='next' title="Suivante">contenu 3</step>
    <step state='disable' title="Disactivated">contenu 4</step>
  </wizard>
*/

@Component({
  selector: 'wizard',
  styleUrls: ["./wizard.css"],
  templateUrl: './wizard.html'
})
export class WizardComponent {
  public dependenciesAreLoaded: boolean;
  public dependenciesAreLoadedPromise: Promise<any>;
  public steps: WizartStepComponent[];
  public current_step: number;
  public name_wip: string;

  constructor() {
      this.steps = [];
      this.name_wip = "built";
      this.dependenciesAreLoaded = true;
  }

  public selectStep(step: WizartStepComponent, event: any){
    event.preventDefault();
    event.stopPropagation();
    this.steps.forEach((step_c)=>step_c.disactivate());
    step.activate();
    this.current_step = step.index;
    return false;
  }

}

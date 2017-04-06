import {Component, Host, Input, OnInit, OnChanges} from '@angular/core';
import {WizardComponent} from './wizard';

@Component({
  template: `<div [style.display]="active?'inherit':'none'">
  <ng-content></ng-content>
  </div>`,
  selector: 'wizard-step'
})
export class WizardStepComponent  implements OnInit, OnChanges {
  @Input() state: any;
  @Input() title: any;
  public active: boolean = false;
  public value: number;
  public contentTop: number;
  public contentStyle: string;
  public XSsize: number;
  public index: number; // index dans la liste de step du parent

  constructor(@Host() private parent: WizardComponent) {
    // j'ajoute cette etape dans la liste de son parent
    this.parent.steps.push(this);
  }

  public ngOnInit() {
    this.active = false;
    if (this.state === 'current') {
      this.active = true;
      this.parent.current_step = this.index;
    }
    this.XSsize = Math.floor( 12 / this.parent.steps.length );
    this.updateRendering();
  }

  public ngOnChanges(changes) {
    this.updateRendering();
  }

  private updateRendering() {
    switch (this.state) {
      case 'complete':
        this.value = 100;
        break;
      case 'current':
        this.value = 50;
        break;
      default:
        this.value = 0;
        break;
    }
  }

  public disactivate() {
    console.log('Désactivation');
    this.active = false;
    if (this.state !== 'disable') {
      if (this.parent.current_step < this.index) {
        this.state = 'next';
      } else {
        this.state = 'complete';
     }
    }
    this.updateRendering();
  }

  public activate() {
    console.log('Activation de l\'etape courante');
    this.active = true;
    this.state = 'current';
    this.updateRendering();
  }

}

import {Component} from '@angular/core';
@Component({
  selector: 'button3d',
  template: `<button type="button" class="btn btn-{{class}} {{size}} btn3d">
  <span class="fa fa-{{icon}}"></span> <ng-content></ng-content>
  </button>`,
  styleUrls: ['./button-3d.css'],
  inputs: ['icon', 'class', 'size']
})
export class Button3dComponent {
  public icon: string;
  public class: string;
  public size: string;

  constructor(){
    //valeur par defaut
    this.class = "default";
    this.size = "";//valeur possible btn-lg, btn-sm ou vide pour normal
  }
}

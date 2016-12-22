import {Component, Host, Output, EventEmitter, ElementRef, Renderer} from "@angular/core";
import {TouchButtonComponent} from "./touch-button";

@Component({
  template: `<li class="option">
    <button class="material-button option{{index}}" type="button">
      <span class="fa fa-{{icon}}" aria-hidden="true"></span>
    </button>
  </li>`,
  selector: "tb-link",
  inputs: ["icon"]
})

export class TouchButtonLinkComponent {
  @Output() tbclick: EventEmitter<boolean> = new EventEmitter<boolean>();

  public icon: string;
  public index: number; // index dans la liste de step du parent

  constructor(
    @Host() private parent: TouchButtonComponent,
    private _element: ElementRef,
    private renderer: Renderer ) {
      // j'ajoute cette etape dans la liste de son parent
      this.parent.addLink(this);

      this.renderer.listen(this._element.nativeElement, "click", () => {
        // on execute le click seulement si le parent est ouvert (pour contrer un probleme lié à la css et position du bouton)
        if ( this.parent.state === "open" ) {
          this.tbclick.emit(true);
        }
      });
  }

}

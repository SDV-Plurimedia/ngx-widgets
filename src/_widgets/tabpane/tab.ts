/**
 * Angular / Core
 */
import { Component, Input } from '@angular/core';

/**
 * Composant qui gère un onglet d'un tabpane
 */
@Component({
  selector: 'tab',
  styleUrls: ['./tabpane.css'],
  template: `
    <div [class.hidden]="!active" class="class-pane" role="tabpanel">
      <ng-content></ng-content>
    </div>
  `
})
export class TabComponent {
  /**
   * Le titre de l'onglet
   */
  @Input() tabtitle: string = null;
  /**
   * Determine si l'onglet et actif ou non (contenu affiché)
   */
  @Input() active: boolean = false;
  /**
   * L'id aléatoire du tabpane parent
   */
  public parentRandId: number | string = null;
}

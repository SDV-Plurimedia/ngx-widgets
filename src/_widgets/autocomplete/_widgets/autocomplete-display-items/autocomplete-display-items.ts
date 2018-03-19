import {Component, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'autocomplete-display-items',
  templateUrl: './autocomplete-display-items.html'
})
export class AutocompleteDisplayItemsComponent {
  @Input() public items: any = []; // Les items à afficher
  @Input() public disabled: boolean = false; // Si on est dans l'état disabled
  @Input() public class: string = ''; // La classe css à leur appliquer
  @Input() public field: string = ''; // Le champ à afficher.

  @Output() public delete = new EventEmitter()

  public deleteItem(item) {
    this.delete.emit(item);
  }

}

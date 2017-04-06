import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'menu-interne',
  templateUrl: './menu-interne.html',
  styleUrls: ['./menu-interne.css']
})
export class MenuInterneComponent {

  @Output() public button: EventEmitter<boolean>;
  @Output() public select: EventEmitter<MenuItem>;
  @Output() public openChange: EventEmitter<boolean>;

  @Input() icon: string = '';
  @Input() items: MenuItem[] = [];
  @Input() open: boolean = true; // etat ouvert = true
  @Input() title: string = 'Sous-menu';
  @Input() tooltip: string = '';

  constructor() {
    this.select = new EventEmitter<MenuItem>();
    this.button = new EventEmitter<boolean>();
    this.openChange = new EventEmitter<boolean>();
  }

  // desactive recursivement les items
  public desactiveAll(items: MenuItem[]) {
    items.forEach((item) => {
      item.active = false;
      if (item.subitems) {
        this.desactiveAll(item.subitems);
      }
    });
  }

  public selectItem(item: MenuItem, parentItem: MenuItem = null) {
    this.desactiveAll(this.items);

    // reactivation du courant
    item.active = true;
    if (parentItem) {
      parentItem.active = true;
    }

    this.select.emit(item);
  }

  public toggleState() {
    this.open = !this.open;
    this.openChange.emit(this.open);
  }
}

/********************************/
// Classes de definition du menu
/********************************/

export class MenuItemBadge {
  public class: string = 'success';
  public number: number = 0;

  constructor(obj) {
    if (obj) {
      let properties = Object.keys(this);
      properties.forEach((prop) => {
        if (obj[prop] !== undefined && obj[prop] !== null) {
          this[prop] = obj[prop];
        }
      });
    }
  }
}

export class MenuItem {
  public id: string; // string pour identifier l'evenement recu
  public icon: string = '';
  public title: string = '';
  public badge: MenuItemBadge = null;
  public subitems: MenuItem[] = null;
  public active: boolean = false;

  constructor(obj) {
    if (obj) {
      let properties = Object.keys(this);
      properties.forEach((prop) => {
        if (obj[prop] !== undefined && obj[prop] !== null) {
          this[prop] = obj[prop];
        }
      });
    }
  }

}

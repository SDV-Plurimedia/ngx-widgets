import {Component, ElementRef, Renderer, Input, OnInit, OnChanges} from '@angular/core';

@Component({
    selector: 'hierarchie-list',
    templateUrl: './hierarchie-list.html',
    styleUrls: ['./hierarchie-list.css']
})

export class HierarchieListComponent implements OnInit, OnChanges {

    @Input() params: HierarchieList = null;
    @Input() datas: any[];
    public root_id: any;
    public name_column: string;
    public parent_scope: any;
    public buttons: HierarchieButton[];

    public level: any[];
    public level_displayed: any[];
    public datas_level: any[];
    public last_selected_level: any;


    constructor(private _el: ElementRef, private _renderr: Renderer) { }

    ngOnInit() {
      if (this.params !== null) {
        this.root_id = this.params.root_id;
        this.name_column = this.params.name_column;
        this.parent_scope = this.params.scope;
        this.buttons = this.params.buttons;
      }
      this.level = [];
      this.datas_level = [];
      this.level[0] = this.root_id;
      this.datas_level[0] = this.getListLevel(0);
      this.getDisplayedLevel();

    }

    ngOnChanges(changes) {
      if (changes.datas && changes.datas.previousValue && changes.datas.previousValue.length > 0) {
        this.datas = changes.datas.currentValue;
      }
      if (changes.params) {
        this.params = changes.params.currentValue;
      }
      this.root_id = this.params.root_id;
      this.level = [];
      this.datas_level = [];
      this.level[0] = this.root_id;
      this.datas_level[0] = this.getListLevel(0);
      this.getDisplayedLevel();
    }

    public selectLevel(num, id) {
      if (num > 0) {
        this.selectLevel((num - 1) , this.datas.filter(item => item.id_hierarchie === id)[0].parent);
      }
      console.log('TODO -> selection du level ', num, id);
      this.getNextLevel(num, id);
    }

    // recupere la liste des topics enfant
    private getListLevel(num: number) {
      let root = this.level[num];
      let res = this.datas.filter(data => data.parent === root);
      return res;
    }

    // calcul le niveau suivant si existant
    private getNextLevel(num: number, id: any) {
      if (this.hasChildren(id)) {
        // j'enregistre la position
        this.last_selected_level = {
          'num': num,
          'id': id
        };

        this.level[num] = id;
        this.datas_level[num] = this.getListLevel(num);

        if (this.level.length > (num + 1)) {
          let level = [];
          let datas_level = [];
          let i = 0;
          for (i = 0; i <= num; i++) {
            level[i] = this.level[i];
            datas_level[i] = this.datas_level[i];
          }
          this.level = level;
          this.datas_level = datas_level;
        }
        this.getDisplayedLevel();
        setTimeout(() => {
          let item = this._el.nativeElement.querySelector('#item_' + id);
          let list = this._el.nativeElement.querySelector('#list_' + id);
          if (list && item) {
            let top = item.offsetTop + item.parentElement.offsetTop;
            list.style.marginTop = top + 'px';
          }
        }, 0);
      }
    }

    getDisplayedLevel() {
      if (this.level.length < 4) {
        this.level_displayed = this.level;
      } else {
        this.level_displayed = this.level.slice(this.level.length - 4);
      }
    }

    /**
    * Renvoie un booléen permettant de savoir si l'élément à un enfant ou non.
    * @param  id  L'id de l'élément que l'on teste
    * @returns    True si l'élément a au moins un enfant, false sinon
    */
    hasChildren(id: string) {
      return this.datas.filter(data => data.parent === id).length > 0 ? true : false;
    }

    /**
     * Vérifie si le bouton doit être affiché
     * @param {HierarchieButton} button Le bouton à afficher
     * @param {any} data Les données pour tester
     * @return {boolean}
     */
    displayButton(button, data) {
      if (button.access) {
        return button.access.apply(this.parent_scope, [data]);
      }
      return true;
    }

}

export interface HierarchieButton {
    text: string;
    class?: string;
    action: (any) => void;
    access?: (any) => boolean;
}

export interface HierarchieList {
    name_column: string;
    primary_key: string;
    scope: any;
    root_id: any;
    buttons?: Array<HierarchieButton>;
}

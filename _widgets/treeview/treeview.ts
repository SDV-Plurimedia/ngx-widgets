import {Component, Input, OnInit, OnChanges} from '@angular/core';

@Component({
    selector: 'treeview',
    templateUrl: './treeview.html',
    styleUrls: ['./treeview.css']
})

export class TreeviewComponent implements OnInit, OnChanges {

    @Input() params: any;
    @Input() datas: any[];
    public root_id: string;
    public name_column: string;
    public parent_scope: any;
    public buttons: TreeviewButton[];
    public checkbox: TreeviewCheckbox;
    public sorted_datas: any[] = [];
    protected states: TreeviewState[] = [];
    protected indents = {};

    constructor() { }

    ngOnInit() {
      this.root_id = this.params.root_id;
      this.name_column = this.params.name_column;
      this.indents = {};
      this.datas.forEach((data) => {
        if (this.hasChildren(data[this.params.primary_key])) {
          this.states[data[this.params.primary_key]] = {
            'id': data[this.params.primary_key],
            'open': (data.parent === this.root_id) ? true : false
          };
        }
        this.indents[data[this.params.primary_key]] = this.getDeepIndent(data[this.params.primary_key]);
      });
      this.sorted_datas = [];
      this.sortDatas(this.root_id);
      this.parent_scope = this.params.scope;
      this.buttons = this.params.buttons;
      this.checkbox = this.params.checkbox;
    }

    ngOnChanges(changes) {
      if (changes.datas && changes.datas.previousValue && changes.datas.previousValue.length > 0) {
        this.datas = changes.datas.currentValue;
      }
      if (changes.params) {
        this.params = changes.params.currentValue;
      }
      this.sorted_datas = [];
      this.states = [];
      this.indents = {};
      this.root_id = this.params.root_id;
      this.datas.forEach((data) => {
        if (this.hasChildren(data[this.params.primary_key])) {
          this.states[data[this.params.primary_key]] = {
            'id': data[this.params.primary_key],
            'open': (data.parent === this.root_id) ? true : false
          };
        }
        this.indents[data[this.params.primary_key]] = this.getDeepIndent(data[this.params.primary_key]);
      });
      this.sortDatas(this.root_id);
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
    * Trie les données du tableau de façon à ce qu'elles soient dans l'ordre hiérarchique
    * @param  id  L'id de l'élément dont on cherche les enfant pour les lui associer
    */
    sortDatas(id: string) {
      let tmp = this.datas.filter(data => data.parent === id);

      this.datas.filter(data => data.parent === id).map((data) => {
        this.sorted_datas.push(data);
          if (this.hasChildren(data[this.params.primary_key])) {
              this.sortDatas(data[this.params.primary_key]);
          }
      });
    }

    /*
    * Ajoute les indentations à l'élément en fonction de sa profondeur dans l'arbre
    * @param  id  L'id de l'élément que l'on, veut indenter
    * @returns    Le nom de l'élément à afficher correctement indenté
    */
    getDeepIndent(id: string) {
      let data = this.datas.filter(d => d[this.params.primary_key] === id)[0];
      let indentation = 0;
      if (data.parent != null) {
        while (data.parent !== this.root_id) {
          indentation++;
          data = this.datas.filter(newdata => newdata[this.params.primary_key] === data.parent)[0];
        }
      }
      return indentation;
    }

    toggle(id: string) {
      this.states[id].open = !this.states[id].open;
    }

    /*
    * Permet de déterminer si iun élément du treeview doit être afficher ou caché
    * @param  id  L'élément que l'on veut tester
    * @returns    True si l'élément doit être caché, false sinon
    */
    isHidden(id: string) {
      let res = true;
      let data = this.datas.filter(d => d[this.params.primary_key] === id)[0];
      while (data.parent !== this.root_id) {
        if (this.states[data.parent] !== undefined) {
          res = res && this.states[data.parent].open;
        }
        data = this.datas.filter(newdata => newdata[this.params.primary_key] === data.parent)[0];
      }
      return !res;
    }

    isChecked(item: any) {
      return this.checkbox.checked.indexOf(item[this.checkbox.column_value]) >= 0;
    }

}

export interface Treeview {
  name_column: string;
  primary_key: string;
  scope: any;
  root_id: string;
  buttons?: Array<TreeviewButton>;
  checkbox?: TreeviewCheckbox;
}

export interface TreeviewState {
  id: string;
  open: boolean;
}

export interface TreeviewButton {
  text: string;
  class?: string;
  action: (any) => void;
}

export interface TreeviewCheckbox {
  column_value: string;
  checked: Array<any>;
  action_on_change: (any) => void;
  action_validate: () => void;
}

import {Field} from './field';

export class Tab {
  public fields: Field[] = [];
  public title: string = '';
  public scope: any = null;
  public tab_class: string = '';

  constructor(obj: any = {}, scope: any = null) {
    this.title = obj && obj.title || '';
    this.scope = scope;
    this.tab_class = obj && obj.tab_class || '';
    this.setFields(obj.fields);
  }

  /**
   * Crée le tableau de Field de l'onglet.
   * @param fields
   */
  private setFields(fields: Field[]) {
    let field_ids = Object.keys(fields);
    for (let field_id of field_ids) {
      // Si on a défini une classe pour tous les inputs de l'onglet
      // Et pas pour le champs, alors on lui passe celle de l'onglet.
      if (this.tab_class !== '' && !fields[field_id].hasOwnProperty('field_class')) {
        fields[field_id].field_class = this.tab_class;
      }
      this.fields.push(new Field(field_id, fields[field_id], this.scope));
    }
  }

}

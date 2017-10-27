import {Field} from './field';

export class Tab {
  public fields: Field[] = [];
  public title: string = '';
  public scope: any = null;

  constructor(obj: any = {}, scope: any = null) {
    this.title = obj && obj.title || '';
    this.scope = scope;
    this.setFields(obj.fields);
  }

  /**
   * Crée le tableau de Field de l'onglet.
   * @param fields
   */
  private setFields(fields: Field[]) {
    let field_ids = Object.keys(fields);
    for (let field_id of field_ids) {
      this.fields.push(new Field(field_id, fields[field_id], this.scope));
    }
  }

}

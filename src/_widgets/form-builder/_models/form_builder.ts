import {Field} from './field';
import {Tab} from './tab';

export class FormBuilder {
  public type: string = 'classic';
  public fields: Field[] = [];
  public ngForm: any = null;
  public scope: any = null;
  public tabs: Tab[] = [];
  public model: any;

  constructor(type: string = 'classic', data: any = {}, model: any = null, scope: any = null, ngForm: any = null) {
    this.type = type;
    this.ngForm = ngForm;
    this.scope = scope;
    this.model = model;

    if (this.type === 'classic') {
      this.setFields(data);
    } else {
      this.setTabs(data);
    }
  }

  /**
   * Inialise les Fields pour les formulaires de type 'classic'.
   * @param fields
   */
  private setFields(fields: Field[]) {
    let field_ids = Object.keys(fields);
    for (let field_id of field_ids) {
      this.fields.push(new Field(field_id, fields[field_id], this.scope));
    }
  }

  /**
   * Initialise les onglets pour les formulaires de type 'panes'.
   * @param tabs
   */
  private setTabs(tabs) {
    for (let tab of tabs) {
      this.tabs.push(new Tab(tab, this.scope));
    }
  }

  /**
   * Vérifie la validité du formulaire.
   * @returns {boolean}
   */
  public isValid() {
    let valid: boolean = true;
    if (this.ngForm.form.valid) {
      if (this.type === 'classic') {
        valid = this.validFields(this.fields);
      } else {
        for (let tab of this.tabs) {
          valid = this.validFields(tab.fields);
          if (!valid) {
            break;
          }
        }
      }
    } else {
      valid = false;
    }
    return valid;
  }

  /**
   * Prends un tableau de Field en paramètre et vérifie qu'aucun ne soit invalide.
   * @param fields
   * @returns {boolean}
   */
  private validFields(fields: Field[]) {
    let valid: boolean = true;
    for (let field of fields) {
      if (field.invalid) {
        valid = false;
        break;
      }
    }
    return valid;
  }

}

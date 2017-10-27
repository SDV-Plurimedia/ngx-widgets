import {ErrorMessage} from './error_message';

export class Field {
  public id: string = '';
  public label: string = '';
  public required: boolean = false;
  public type: string = 'text';
  public pattern: string = null;
  public error_message: ErrorMessage = new ErrorMessage();
  public placeholder: string = '';
  public scope: any = null;
  public invalid: boolean = false;
  public readonly: boolean = false;

  // Fonction
  public verifyFunction: any = null;
  public hiddenFunction: any = null;
  public disabledFunction: any = null;

  // CSS
  public input_container_class = 'col-md-8';
  public input_class: string = 'form-control';
  public label_class: string = 'col-md-2 control-label';

  // Text
  public min_length: number = 1;
  public max_length: number = null;

  // Select
  public options: any[] = [];

  // Number
  public step: number = null;
  public min: number = null;
  public max: number = null;

  // Textarea
  public rows: number = null;

  // Datepicker
  public view_format: string = 'DD/MM/YYYY';
  public model_format: string = 'YYYY-MM-DD';
  public first_week_day_sunday: boolean = false;
  public init_empty: boolean = false;

  // Autocomplete
  public data: any = [];
  public add: any = () => { return true; };
  public delete: any = () => {return true; };

  // Autocomplete & CKEditor
  public config: any = {};
  public drop: any;

  // Checkboxes
  public inline: boolean = false;
  public checked: boolean = false;

  constructor(id, obj: any, scope: any) {
    this.id = id;
    this.scope = scope;

    let properties = Object.keys(this);

    for (let prop of properties) {
      if (obj[prop] !== undefined && obj[prop] !== null) {
        if (prop === 'error') {
          this.error_message = new ErrorMessage(obj[prop]);
        } else if (prop === 'error_message') {
          this.error_message = new ErrorMessage({message: obj[prop]});
        } else {
          this[prop] = obj[prop];
        }
      }
    }
  }

  /**
   * Permet d'utiliser une fonction qui affiche/cache un champ
   * Pour cacher, retourner true pour afficher retourner false.
   * @returns {boolean}
   */
  isHidden() {
    let res: boolean = false;
    if(this.hiddenFunction) {
      res = this.hiddenFunction.apply(this.scope, [this]);
    }
    return res;
  }

  /**
   * Permet d'utiliser une fonction qui passe un champ en disabled ou non.
   * Pour être en disabled, retourner true sinon false.
   * @returns {boolean}
   */
  isDisabled() {
    let res: boolean = false;
    if (this.disabledFunction) {
      res = this.disabledFunction.apply(this.scope, [this]);
    }
    return res;
  }
}

import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder} from './_models/form_builder';

@Component({
  selector: 'form-builder',
  templateUrl: 'form-builder.html'
})
export class FormBuilderComponent implements OnInit, OnChanges {

  @Input() public type: string = 'classic';
  @Input() public fields: any = {};
  @Input() public model: any;
  @Input() public scope: any;
  @Input() private config: any = {};

  @Output() private cancel: EventEmitter<boolean> = new EventEmitter();
  @Output() private save: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('form') private form;

  public formBuilder: FormBuilder = null;

  // Les champs pour la config générale
  public displayButtons: boolean = true; // Si les boutons "Enregistrer" et "Annuler" doivent être présents
  public buttonsContainerClass: string = 'col-md-12'; // La classe de la div qui contient les deux boutons
  public saveLabel: string = 'Enregistrer'; // Le label du bouton "Enregistrer"
  public cancelLabel: string = 'Annuler'; // Le label du bouton "Annuler"
  public formClass: string = 'form-horizontal'; // La classe de la balise form

  ngOnInit() {
    this.formBuilder = new FormBuilder(this.type, this.fields, this.model, this.scope, this.form);
    this.setConfig();
  }

  /**
   * Si le model change, il faut également reporter la modif dans le FormBuilder sinon aucune modification
   * après le premier enregistrement ne sera réalisée...
   * @param changes
   */
  ngOnChanges(changes) {
    if (this.formBuilder) {
      if (changes.model) {
        if (changes.model.currentValue) {
          this.formBuilder.model = changes.model.currentValue;
        }
      }
    }
  }

  /**
   * Initialise les différentes configuration possible pour le form-builder.
   */
  private setConfig() {
    Object.keys(this.config).forEach(config_name => {
      if (this.hasOwnProperty(config_name)) {
        this[config_name] = this.config[config_name];
      } else {
        console.warn('Il n\'existe pas de configuration pour "' + config_name + '"');
      }
    });
  }

  /**
   * Préviens qu'on a cliqué sur le bouton retour.
   */
  emitCancel() {
    this.cancel.emit(true);
  }

  /**
   * Préviens qu'on a cliqué sur le bouton sauvegarder.
   */
  emitSave() {
    this.save.emit(true);
  }
}

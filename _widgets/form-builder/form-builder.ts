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
  @Input() public saveLabel: string = 'Enregistrer';
  @Input() public cancelLabel: string = 'Annuler';

  @Output() private cancel: EventEmitter<boolean> = new EventEmitter();
  @Output() private save: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('form') private form;

  public formBuilder: FormBuilder = null;

  ngOnInit() {
    this.formBuilder = new FormBuilder(this.type, this.fields, this.model, this.scope, this.form);
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

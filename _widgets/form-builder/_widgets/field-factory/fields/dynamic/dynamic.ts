import {
  Component, OnInit, OnDestroy, Input, ComponentFactoryResolver,
  ViewContainerRef, ViewChild
} from '@angular/core';
import {FormBuilder} from '../../../../_models/form_builder';
import {Field} from '../../../../_models/field';

/**
 * Classe permettant de gérer des widgets.
 * Ces widgets doivent gérer les erreurs de validité de leur côté.
 */

@Component({
  selector: 'field-dynamic',
  template: '<div #placeholder></div>'
})
export class FieldDynamicComponent implements OnInit, OnDestroy {

  @Input() public field: Field;
  @Input() public model: any;
  @Input() public form: FormBuilder = null;
  @ViewChild('placeholder', {read: ViewContainerRef}) viewContainerRef;

  public dynamicField: any = null;
  private subscriptions = [];

  constructor(
    private _factoryResolver: ComponentFactoryResolver,
    private _viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {
    if (typeof this.model[this.field.id] === 'undefined') {
      console.warn('La propriété : ' + this.field.id + ' n\'existe pas sur l\'objet ' + this.model.constructor.name);
    }
    let factory = this._factoryResolver.resolveComponentFactory(this.field.class_component);
    this.dynamicField = this.viewContainerRef.createComponent(factory);

    if(this.dynamicField.instance.updateModel) {
      let sub = this.dynamicField.instance.updateModel.subscribe(newValue => {
        this.model[this.field.id] = newValue;
      });
      this.subscriptions.push(sub);
    }

    this.sendDataToDynamicField({});
  }

  /**
   * Lors de la destruction on détruis l'enfant et les eventuelles subscriptions.
   */
  ngOnDestroy() {
    if (this.dynamicField) {
      if (this.dynamicField.instance.updateModel) {
        this.subscriptions.forEach(sub => sub.unsubscribe());
      }
      this.dynamicField.destroy();
    }
  }

  /**
   * Envoie des données à l'enfant.
   * @param changes
   */
  private sendDataToDynamicField(changes = null) {
    if (this.dynamicField) {
      // On envoit le model, le form et le field si jamais on veut l'utiliser dans notre composant dynamique.
      this.dynamicField.instance.model = this.model;
      this.dynamicField.instance.form = this.form;
      this.dynamicField.instance.field = this.field;

      // Si l'utilisateur a besoin d'autres champs on les ajoute (doivent être présent dans widgetsInput).
      if (this.field.widgetInputs) {
        Object.keys(this.field.widgetInputs).forEach(property => {
          this.dynamicField.instance[property] = this.field.widgetInputs[property];
        });
      }
      this.dynamicField.instance.ngOnChanges(changes);
    }
  }
}

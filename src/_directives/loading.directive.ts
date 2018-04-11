import { Directive, ViewContainerRef, OnChanges, TemplateRef, Input, ComponentFactory, ComponentFactoryResolver} from '@angular/core';
import { LoadingMessageComponent } from '../_widgets/loading-message/loading-message.component';

@Directive({
  selector: '[loading]'
})
export class LoadingDirective implements OnChanges {

  @Input() loading: any;
  @Input() loadingType: string;
  private factory: ComponentFactory<any>;


  constructor( private viewContainer: ViewContainerRef,
    private template: TemplateRef<any>,
    private _componentFactoryResolver: ComponentFactoryResolver
  ){
    this.factory = this._componentFactoryResolver.resolveComponentFactory(
      LoadingMessageComponent
    );
  }

  ngOnChanges(changes) {
    console.log(changes);
    if (this.loading) {
      this.viewContainer.clear();
      this.viewContainer.createEmbeddedView(this.template);
    } else {
      this.viewContainer.clear();
      let child = this.viewContainer.createComponent(this.factory);
      if(this.loadingType) {
        child.instance['type'] = this.loadingType;
      }
    }
  }
}

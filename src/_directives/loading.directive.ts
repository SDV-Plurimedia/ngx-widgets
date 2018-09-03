import {
  Directive,
  ViewContainerRef,
  OnChanges,
  TemplateRef,
  Input,
  ComponentFactory,
  ComponentFactoryResolver
} from '@angular/core';
import { LoadingMessageComponent } from '../_widgets/loading-message/loading-message.component';

@Directive({
  selector: '[sdv_loading]'
})
export class LoadingDirective implements OnChanges {
  @Input()
  sdv_loading: any;
  @Input()
  sdv_loadingType: string;
  private factory: ComponentFactory<any>;

  constructor(
    private viewContainer: ViewContainerRef,
    private template: TemplateRef<any>,
    private _componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.factory = this._componentFactoryResolver.resolveComponentFactory(
      LoadingMessageComponent
    );
  }

  ngOnChanges(changes) {
    console.log(changes);
    if (this.sdv_loading) {
      this.viewContainer.clear();
      this.viewContainer.createEmbeddedView(this.template);
    } else {
      this.viewContainer.clear();
      let child = this.viewContainer.createComponent(this.factory);
      if (this.sdv_loadingType) {
        child.instance['type'] = this.sdv_loadingType;
      }
    }
  }
}

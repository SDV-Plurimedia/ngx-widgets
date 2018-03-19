import { Directive } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

// TODO A méditer. Ne peux être appelé anonymement dans le useFactory
export function getUsedFactoryParentFormDirective(form: NgForm) {
  return form;
}

@Directive({
  selector: '[provide-parent-form]',
  providers: [
    {
      provide: ControlContainer,
      useFactory: getUsedFactoryParentFormDirective,
      deps: [NgForm]
    }
  ]
})
/**
 * Add child component to form validation
 */
export class ProvideParentFormDirective {}

/*

Le module shared contient les widgets,directives et pipes qui peuvent etre utilisé partout

*/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';

let modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  HttpModule,
  JsonpModule,
  DragulaModule
];

// les widgets
import { AutocompleteDisplayItemsComponent } from './_widgets/autocomplete/_widgets/autocomplete-display-items/autocomplete-display-items';
import { AutocompleteComponent } from './_widgets/autocomplete/autocomplete';
import { BigDatatableComponent, BigDatatable } from './_widgets/big-datatable/big-datatable.component';
import { BlocCardComponent } from './_widgets/bloc-card/bloc-card';
import { Button3dComponent } from './_widgets/button-3d/button-3d';
import { ChevronComponent } from './_widgets/chevron/chevron';
import { CkeditorComponent } from './_widgets/ckeditor/ckeditor';
import { CornerButtonComponent } from './_widgets/corner-button/corner-button';
import { DynamicTdComponent } from './_widgets/datatable/_widgets/dynamic-td/dynamic-td';
import { DynamicActionComponent } from './_widgets/datatable/_widgets/dynamic-action/dynamic-action';
import { DatatableComponent } from './_widgets/datatable/datatable';
import { DatepickerComponent } from './_widgets/datepicker/datepicker';
import { DropdownComponent } from './_widgets/dropdown/dropdown';
import { FilterComponent, Filter } from './_widgets/filter/filter.component';
import { GraphComponent } from './_widgets/graph/graph';
import { HierarchieListComponent } from './_widgets/hierarchie-list/hierarchie-list';
import { LoaderComponent } from './_widgets/loader/loader';
import { MenuInterneComponent } from './_widgets/menu-interne/menu-interne';
import { PagerComponent, Pager } from './_widgets/pager/pager';
import { ProgressBarComponent } from './_widgets/progress-bar/progress-bar';
import { StatusBarComponent } from './_widgets/status-bar/status-bar';
import { SwitchComponent } from './_widgets/switch/switch';
import { TabpaneComponent } from './_widgets/tabpane/tabpane';
import { TabComponent } from './_widgets/tabpane/tab';
import { TagComponent } from './_widgets/tag/tag';
import { TouchButtonComponent } from './_widgets/touch-button/touch-button';
import { TouchButtonLinkComponent } from './_widgets/touch-button/link';
import { TreeviewComponent } from './_widgets/treeview/treeview';
import { WizardComponent } from './_widgets/wizard/wizard';
import { WizardStepComponent } from './_widgets/wizard/step';

// FormBuilder
import { FieldFactoryComponent} from './_widgets/form-builder/_widgets/field-factory/field-factory';
import { FieldComponent} from './_widgets/form-builder/_widgets/field-factory/fields/field';
import { FieldAutocompleteComponent} from './_widgets/form-builder/_widgets/field-factory/fields/autocomplete/autocomplete';
import { FieldCheckboxComponent} from './_widgets/form-builder/_widgets/field-factory/fields/checkbox/checkbox';
import { FieldCheckboxesComponent} from './_widgets/form-builder/_widgets/field-factory/fields/checkboxes/checkboxes';
import { FieldCKEditorComponent} from './_widgets/form-builder/_widgets/field-factory/fields/ckeditor/ckeditor';
import { FieldDatepickerComponent} from './_widgets/form-builder/_widgets/field-factory/fields/datepicker/datepicker';
import { FieldEmailComponent} from './_widgets/form-builder/_widgets/field-factory/fields/email/email';
import { FieldNumberComponent} from './_widgets/form-builder/_widgets/field-factory/fields/number/number';
import { FieldPasswordComponent} from './_widgets/form-builder/_widgets/field-factory/fields/password/password';
import { FieldRadiosComponent} from './_widgets/form-builder/_widgets/field-factory/fields/radios/radios';
import { FieldSelectComponent} from './_widgets/form-builder/_widgets/field-factory/fields/select/select';
import { FieldTextComponent} from './_widgets/form-builder/_widgets/field-factory/fields/text/text';
import { FieldTextareaComponent} from './_widgets/form-builder/_widgets/field-factory/fields/textarea/textarea';
import { FieldUrlComponent} from './_widgets/form-builder/_widgets/field-factory/fields/url/url';
import { FieldDynamicComponent} from './_widgets/form-builder/_widgets/field-factory/fields/dynamic/dynamic';
import { FormBuilderComponent} from './_widgets/form-builder/form-builder';
import { ErrorMessageComponent} from './_widgets/form-builder/_widgets/error-message/error-message';

let widgets =  [
  AutocompleteDisplayItemsComponent,
  AutocompleteComponent,
  BigDatatableComponent,
  BlocCardComponent,
  Button3dComponent,
  ChevronComponent,
  CkeditorComponent,
  CornerButtonComponent,
  DynamicTdComponent,
  DynamicActionComponent,
  DatatableComponent,
  DatepickerComponent,
  DropdownComponent,
  FilterComponent,
  GraphComponent,
  HierarchieListComponent,
  LoaderComponent,
  MenuInterneComponent,
  PagerComponent,
  ProgressBarComponent,
  StatusBarComponent,
  SwitchComponent,
  TabpaneComponent,
  TabComponent,
  TagComponent,
  TouchButtonComponent,
  TouchButtonLinkComponent,
  TreeviewComponent,
  WizardComponent,
  WizardStepComponent,

  // FormBuilder
  FieldFactoryComponent,
  FieldComponent,
  FieldAutocompleteComponent,
  FieldCheckboxComponent,
  FieldCheckboxesComponent,
  FieldCKEditorComponent,
  FieldDatepickerComponent,
  FieldEmailComponent,
  FieldNumberComponent,
  FieldPasswordComponent,
  FieldRadiosComponent,
  FieldSelectComponent,
  FieldTextComponent,
  FieldTextareaComponent,
  FieldUrlComponent,
  FieldDynamicComponent,
  FormBuilderComponent,
  ErrorMessageComponent
];

// les directives
import { DNDDirective } from './_directives/dnd';
import { LazyloadDirective } from './_directives/lazyload';
import { ProvideParentFormDirective } from './_directives/provide-parent-form';

let directives = [
  DNDDirective,
  LazyloadDirective,
  ProvideParentFormDirective
];

// les pipes
import { BootstrapClassPipe } from './_pipes/bootstrap-class';
import { HtmlEncoderPipe } from './_pipes/htmlencoder/htmlencoder';
import { HumanReadableSizePipe } from './_pipes/human-readable-size/human-readable-size';
import { KeysPipe } from './_pipes/keys';
import { StringShortenedPipe } from './_pipes/string-shortened';
import { TimestampToDatePipe } from './_pipes/timestamp-to-date';
import { UcFirstPipe } from './_pipes/ucfirst';

let pipes = [
  BootstrapClassPipe,
  HtmlEncoderPipe,
  HumanReadableSizePipe,
  KeysPipe,
  StringShortenedPipe,
  TimestampToDatePipe,
  UcFirstPipe
];

import { StaticLoaderService } from './_services/static-loader';
import { LoaderService } from './_services/loader';

let services = [
  StaticLoaderService,
  LoaderService
];

@NgModule({
  imports: [
    ...modules
  ],
  declarations: [
    ...widgets,
    ...pipes,
    ...directives
  ],
  exports: [
    ...widgets,
    ...pipes,
    ...directives
  ],
  providers: [
    ...services
  ]
})
export class SDVNg2WidgetsModule {
 }

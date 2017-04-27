/*

Le module shared contient les widgets,directives et pipes qui peuvent etre utilisé partout

*/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule }   from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

// les widgets
import { AutocompleteComponent } from './_widgets/autocomplete/autocomplete';
import { BigDatatableComponent, BigDatatable } from './_widgets/big-datatable/big-datatable.component';
import { BlocCardComponent } from './_widgets/bloc-card/bloc-card';
import { Button3dComponent } from './_widgets/button-3d/button-3d';
import { ChevronComponent } from './_widgets/chevron/chevron';
import { CkeditorComponent } from './_widgets/ckeditor/ckeditor';
import { CornerButtonComponent } from './_widgets/corner-button/corner-button';
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

let widgets =  [
  AutocompleteComponent,
  BigDatatableComponent,
  BlocCardComponent,
  Button3dComponent,
  ChevronComponent,
  CkeditorComponent,
  CornerButtonComponent,
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
  WizardStepComponent
];

// les directives
import { DNDDirective } from './_directives/dnd';
import { LazyloadDirective } from './_directives/lazyload';

let directives = [
  DNDDirective,
  LazyloadDirective
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
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule
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

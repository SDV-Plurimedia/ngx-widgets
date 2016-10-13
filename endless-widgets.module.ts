/*

Le module shared contient les widgets,directives et pipes qui peuvent etre utilisé partout

*/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule }   from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

//les widgets
import { AutocompleteComponent } from "./_widgets/autocomplete/autocomplete";
import { BlocCardComponent } from "./_widgets/bloc-card/bloc-card";
import { Button3dComponent } from "./_widgets/button-3d/button-3d";
import { ChevronComponent } from "./_widgets/chevron/chevron";
import { CkeditorComponent } from "./_widgets/ckeditor/ckeditor";
import { CornerButtonComponent } from "./_widgets/corner-button/corner-button";
import { DatatableComponent } from "./_widgets/datatable/datatable";
import { DatepickerComponent } from "./_widgets/datepicker/datepicker";
import { HierarchieListComponent } from "./_widgets/hierarchie-list/hierarchie-list";
import { LoaderComponent } from "./_widgets/loader/loader";
import { MenuInterneComponent, MenuItem, MenuItemBadge } from "./_widgets/menu-interne/menu-interne";
import { PagerComponent, Pager } from "./_widgets/pager/pager";
import { ProgressBarComponent } from "./_widgets/progress-bar/progress-bar";
import { StatusBarComponent } from "./_widgets/status-bar/status-bar";
import { SwitchComponent } from "./_widgets/switch/switch";
import { TabpaneComponent } from "./_widgets/tabpane/tabpane";
import { TabComponent } from "./_widgets/tabpane/tab";
import { TouchButtonComponent } from "./_widgets/touch-button/touch-button";
import { TreeviewComponent } from "./_widgets/treeview/treeview";
import { WizardComponent } from "./_widgets/wizard/wizard";

var widgets =  [
  AutocompleteComponent,
  BlocCardComponent,
  Button3dComponent,
  ChevronComponent,
  CkeditorComponent,
  CornerButtonComponent,
  DatatableComponent,
  DatepickerComponent,
  HierarchieListComponent,
  LoaderComponent,
  MenuInterneComponent, MenuItem, MenuItemBadge,
  PagerComponent, Pager,
  ProgressBarComponent,
  StatusBarComponent,
  SwitchComponent,
  TabpaneComponent,
  TabComponent,
  TouchButtonComponent,
  TreeviewComponent,
  WizardComponent
];

//les directives
//import { CollapseDirective } from "./_directives/collapse";
import { DNDDirective } from "./_directives/dnd";
import { LazyloadDirective } from "./_directives/lazyload";
//import { TooltipDirective } from "./_directives/tooltip";

var directives = [
  DNDDirective,
  LazyloadDirective
];

//les pipes
import { StringShortenedPipe } from "./_pipes/string-shortened";
import { TimestampToDatePipe } from "./_pipes/timestamp-to-date";
import { BootstrapClassPipe } from "./_pipes/bootstrap-class";

var pipes = [
  StringShortenedPipe,
  TimestampToDatePipe,
  BootstrapClassPipe
];

import { StaticLoaderService } from "./_services/static-loader";
import { LoaderService } from "./_services/loader";

var services = [
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
    ...directives,
    //export des modules générique..
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule
  ],
  providers: [
    ...services
  ]
})
export class EndlessWidgetsModule {
 }

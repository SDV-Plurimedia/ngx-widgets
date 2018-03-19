// Liste des contenus accessibles publiquement

// les widgets
export { AutocompleteDisplayItemsComponent } from './_widgets/autocomplete/_widgets/autocomplete-display-items/autocomplete-display-items';
export { AutocompleteComponent } from './_widgets/autocomplete/autocomplete';
export { BigDatatableComponent, BigDatatable } from './_widgets/big-datatable/big-datatable.component';
export { BlocCardComponent } from './_widgets/bloc-card/bloc-card';
export { Button3dComponent } from './_widgets/button-3d/button-3d';
export { ChevronComponent } from './_widgets/chevron/chevron';
export { CkeditorComponent } from './_widgets/ckeditor/ckeditor';
export { CornerButtonComponent } from './_widgets/corner-button/corner-button';
export { DynamicTdComponent } from './_widgets/datatable/_widgets/dynamic-td/dynamic-td';
export { DynamicActionComponent } from './_widgets/datatable/_widgets/dynamic-action/dynamic-action';
export { DatatableComponent } from './_widgets/datatable/datatable';
export { DatepickerComponent } from './_widgets/datepicker/datepicker';
export { DropdownComponent } from './_widgets/dropdown/dropdown';
export { FilterComponent, Filter } from './_widgets/filter/filter.component';
export { GraphComponent } from './_widgets/graph/graph';
export { HierarchieListComponent } from './_widgets/hierarchie-list/hierarchie-list';
export { LoaderComponent } from './_widgets/loader/loader';
export { MenuInterneComponent } from './_widgets/menu-interne/menu-interne';
export { PagerComponent, Pager } from './_widgets/pager/pager';
export { ProgressBarComponent } from './_widgets/progress-bar/progress-bar';
export { StatusBarComponent } from './_widgets/status-bar/status-bar';
export { SwitchComponent } from './_widgets/switch/switch';
export { TabpaneComponent } from './_widgets/tabpane/tabpane';
export { TabComponent } from './_widgets/tabpane/tab';
export { TagComponent } from './_widgets/tag/tag';
export { TouchButtonComponent } from './_widgets/touch-button/touch-button';
export { TouchButtonLinkComponent } from './_widgets/touch-button/link';
export { TreeviewComponent } from './_widgets/treeview/treeview';
export { WizardComponent } from './_widgets/wizard/wizard';
export { WizardStepComponent } from './_widgets/wizard/step';

// Les directives
export { DNDDirective } from './_directives/dnd';
export { LazyloadDirective } from './_directives/lazyload';
export { ProvideParentFormDirective } from './_directives/provide-parent-form';

// Les pipes
export { BootstrapClassPipe } from './_pipes/bootstrap-class';
export { HtmlEncoderPipe } from './_pipes/htmlencoder/htmlencoder';
export { HumanReadableSizePipe } from './_pipes/human-readable-size/human-readable-size';
export { KeysPipe } from './_pipes/keys';
export { StringShortenedPipe } from './_pipes/string-shortened';
export { TimestampToDatePipe } from './_pipes/timestamp-to-date';
export { UcFirstPipe } from './_pipes/ucfirst';

// Les services
export { StaticLoaderService } from './_services/static-loader';
export{ LoaderService } from './_services/loader';

// Les interfaces
export {DynamicTdInterface} from './_widgets/datatable/_widgets/dynamic-td/dynamic-td.interface';
export {DynamicActionInterface} from './_widgets/datatable/_widgets/dynamic-action/dynamic-action.interface';
export {DynamicFieldInterface} from './_widgets/form-builder/_widgets/field-factory/fields/dynamic/dynamic.interface';

// Le module de base
import { SDVNgXWidgetsModule } from './ngx-widgets.module';
export { SDVNgXWidgetsModule } from './ngx-widgets.module';

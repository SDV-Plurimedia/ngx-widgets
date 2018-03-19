
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

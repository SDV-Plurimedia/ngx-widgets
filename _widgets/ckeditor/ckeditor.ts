import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  OnDestroy,
  NgZone
} from '@angular/core';
import { StaticLoaderService } from '../../_services/static-loader';

declare var CKEDITOR: any;
declare var jQuery: any;
@Component({
  selector: 'ckeditor',
  templateUrl: './ckeditor.html',
  styleUrls: ['./ckeditor.css']
})
export class CkeditorComponent implements OnChanges, OnDestroy {
  @Input() id: string = 'editor';
  @Input() rows: number = 10;
  @Input() disabled: boolean = false;
  @Input() config: any = null;

  @Output() contentChange = new EventEmitter();
  @Output() drop = new EventEmitter();

  public instance = null; // permet de recuperer l'instance
  private isLoaded = false;
  private debounceTimeoutIn = null;
  private debounceTimeoutOut = null;
  private debounceTime = 500;

  constructor(private zone: NgZone) {}
  public _value = '';
  get content(): any {
    return this._value;
  }
  @Input()
  set content(v) {
    if (v !== this._value) {
      this._value = v;
      if (this.instance) {
        if (this.debounceTimeoutOut) {
          clearTimeout(this.debounceTimeoutOut);
        }
        this.debounceTimeoutOut = setTimeout(() => {
          this.zone.run(() => {
            this.instance.setData(v);
            this.debounceTimeoutOut = null;
          });
        }, this.debounceTime);
      }
    }
  }

  ngOnChanges(changes) {
    // une fois que le champ est activé
    if (this.disabled === false && changes.disabled !== undefined) {
      // on charge CKEDITOR, mais dans un setTimeout, pour que la reconstruction des template ai eu le temp d'afficher les ngIf
      StaticLoaderService.getInstance()
        .require_once(['/utils/static/ckeditor/ckeditor.js'])
        .then(() => {
          CKEDITOR.basePath = '/utils/static/ckeditor/';
          this.initCKeditor();
        });
    } else if (
      changes.disabled &&
      changes.disabled.currentValue === true &&
      changes.disabled.previousValue === false
    ) {
      this.instance.destroy();
    }
  }

  ngOnDestroy() {
    this.initCKeditor = function() { return };
  }

  private initCKeditor() {
    if (this.config) {
      CKEDITOR.replace(this.id, this.config);
    } else {
      CKEDITOR.replace(this.id);
    }

    this.instance = CKEDITOR.instances[this.id];
    this.instance.on('change', this.textChanged, this);
    this.instance.on(
      'drop',
      (evt) => {
        evt.stop();
        evt.component = this;
        this.drop.emit(evt);
        return false;
      },
      this
    );
    this.instance.on('afterCommandExec', this.handleAfterCommandExec, this);
    this.isLoaded = true;

    if (this.config && this.config.dtd && this.config.dtd.$removeEmpty) {
      this.changeRemoveEmpty(this.config.dtd.$removeEmpty);
    }
  }

  public textChanged(event = null) {
    if (this.debounceTimeoutIn) {
      clearTimeout(this.debounceTimeoutIn);
    }
    this.debounceTimeoutIn = setTimeout(() => {
      this.zone.run(() => {
        this._value = this.instance.getData();
        this.contentChange.emit(this._value);
        this.debounceTimeoutIn = null;
      });
    }, this.debounceTime);
  }

  private handleAfterCommandExec(event) {
    let commandName = event.data.name;
    if (commandName === 'source') {
      jQuery('#cke_' + this.id + ' textarea').on(
        'keyup',
        jQuery.proxy(function() {
          this.textChanged();
        }, this)
      );
    }
  }

  /**
   * Override the default $removeEmpty
   * @type {[type]}
   */
  private changeRemoveEmpty($removeEmpty) {
    let keys = Object.keys($removeEmpty);
    keys.forEach((key) => {
      CKEDITOR.dtd['$removeEmpty'][key] = $removeEmpty[key];
    });
  }
}

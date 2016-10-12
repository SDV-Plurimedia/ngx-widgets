/// <reference path="../../node_modules/@types/ckeditor/index.d.ts" />
import {Component, EventEmitter} from '@angular/core';
import { StaticLoaderService } from "../../_services/static-loader";

@Component({
  selector: 'ckeditor',
  templateUrl: './ckeditor.html',
  styleUrls: ['./ckeditor.css'],
  inputs: ['content', 'id', 'rows', 'disabled','config'],
  outputs: ['contentChange','drop']
})
export class CkeditorComponent {
  public content: string;
  public id: string = 'editor';
  public rows: number = 10;
  public disabled: boolean = false;
  public contentChange = new EventEmitter();
  public drop = new EventEmitter();
  public instance = null;//permet de recuperer l'instance
  private isLoaded = false;
  public config = false;

  constructor(){}
  ngOnInit() {}

  ngOnChanges(changes) {
    //une fois que le champ est activé
    if(this.disabled===false && changes.disabled !== undefined) {
      //on charge CKEDITOR, mais dans un setTimeout, pour que la reconstruction des template ai eu le temp d'afficher les ngIf
      StaticLoaderService.getInstance().require_once([
          '/utils/static/ckeditor/ckeditor.js'
        ]).then(() => {
          CKEDITOR.basePath = "/utils/static/ckeditor/";
          this.initCKeditor();
        });
    }
    else if (changes.disabled && changes.disabled.currentValue === true && changes.disabled.previousValue === false) {
      this.instance.destroy();
    }
  }

  private initCKeditor(){
    if(this.config)
      CKEDITOR.replace(this.id,this.config);
    else
      CKEDITOR.replace(this.id);

    this.instance = CKEDITOR.instances[this.id];
    this.instance.on('change', this.textChanged, this);
    this.instance.on('drop', (evt) => {
        evt.stop();
        evt.component = this;
        this.drop.emit(evt);
        return false;
    },this)
    this.isLoaded= true;
  }

  public textChanged() {
    this.content = this.instance.getData();
    this.contentChange.emit(this.content);
  }
}

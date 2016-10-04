/// <reference path="../../../../../node_modules/@types/ckeditor/index.d.ts" />
import {Component, EventEmitter} from '@angular/core';

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
    if(this.disabled===false && changes.disabled !== undefined) {
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
    else if (changes.disabled && changes.disabled.currentValue === true && changes.disabled.previousValue === false) {
      this.instance.destroy();
    }
  }



  public textChanged() {
    this.content = this.instance.getData();
    this.contentChange.emit(this.content);
  }
}

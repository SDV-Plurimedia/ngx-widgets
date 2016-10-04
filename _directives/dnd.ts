import {Directive, ElementRef, Renderer} from '@angular/core';

@Directive({
  selector: '[dnd]',
  host: {
    '(dragstart)': 'dragStart($event)',
    '(drag)': 'drag()',
    '(dragend)': 'dragEnd($event)',
    '(dragenter)': 'dragEnter($event)',
    '(dragover)': 'dragOver($event)',
    '(dragleave)': 'dragLeave($event)',
    '(drop)' : 'drop($event)',
  }

})

export class DNDDirective {
  public dropZoneClass: string = 'dropzone';
  public targetClass: string = 'target';
  public defaultBackground: string;
  private _isTarget: boolean = true;

  constructor(private _el: ElementRef, private renderer: Renderer) {

    //Si dropzone.
    if(this._el.nativeElement.classList.contains(this.dropZoneClass)){
      this._isTarget = false;
      this.defaultBackground = this._el.nativeElement.style.background;
    }

    //Si cible.
    else{
      this._el.nativeElement.draggable = true;
      this._el.nativeElement.classList.add('target');
    }
    this.defaultBackground = this._el.nativeElement.style.background;
  }

  dragStart(event: any) {
    if(this._isTarget){
      event.dataTransfer.setData("Text", event.target.id);
      this._el.nativeElement.style.background = '#ffccff';
    }
  }

  drag() {
  }

  dragEnd(event:any){
    if(this._isTarget)
    this._el.nativeElement.style.background = this.defaultBackground;
  }

  dragEnter(event: any){
    if(this.isConcerned(event.target)){
      if(this.isTarget(event.target)){
        let data = event.dataTransfer.getData("Text");
        event.target.parentElement.appendChild(document.getElementById(data));
      }
      else{
        // this._el.nativeElement.style.background = '#EEE';
      }
    }
  }
  dragOver(event: any){
    if(this.isConcerned(event.target)){
      if(!this._isTarget)
      event.preventDefault();
    }
  }
  dragLeave(event: any){
    if(this.isConcerned(event.target)){
      if(!this._isTarget)
      this._el.nativeElement.style.background = this.defaultBackground;
      else{
        // this._el.nativeElement.style.marginTop = this.defaultMarginTop;
      }
    }
  }

  drop(event: any){
    event.preventDefault();
    if (event.target.classList.contains(this.dropZoneClass)) {
      let data = event.dataTransfer.getData("Text");
      event.target.appendChild(document.getElementById(data));
      // event.target.appendChild(this.appendGrid());
    }
    if(!this._isTarget){
      event.currentTarget.style.background = "#CCC";
    }
  }

  setDropZoneExtra(name: string){
    var dze = document.createElement("div");
    dze.className = 'dropzone extra '+name;
    dze.setAttribute('dnd', '');
    return dze;
  }

  isConcerned(target: any){
    if('classList' in target){
      if(target.classList.contains(this.targetClass) || target.classList.contains(this.dropZoneClass))
      return true;
    }
    else
    return false;


  }
  isTarget(target: any){
    if('classList' in target){
      return target.classList.contains(this.targetClass);
    }
    else return false;
  }
  appendGrid(){

    var next = document.createElement("div");
    var child = document.createElement("div");
    var grid = document.createElement("div");

    next.className = 'dropzone next';
    next.setAttribute('dnd', '');
    child.className = 'dropzone child';
    child.setAttribute('dnd', '');
    grid.className = 'append-grid';

    grid.appendChild(next);
    grid.appendChild(child);
    return grid;
  }
}

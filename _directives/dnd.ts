import {Directive, ElementRef, Renderer, HostListener} from '@angular/core';

@Directive({
  selector: '[dnd]',
})

export class DNDDirective {
  public dropZoneClass: string = 'dropzone';
  public targetClass: string = 'target';
  public defaultBackground: string;
  private _isTarget: boolean = true;

  constructor(private _el: ElementRef, private renderer: Renderer) {
    // Si dropzone.
    if (this._el.nativeElement.classList.contains(this.dropZoneClass)) {
      this._isTarget = false;
      this.defaultBackground = this._el.nativeElement.style.background;
    } else { // Si cible.
      this._el.nativeElement.draggable = true;
      this._el.nativeElement.classList.add('target');
    }
    this.defaultBackground = this._el.nativeElement.style.background;
  }

  @HostListener('dragstart', ['$event'])
  dragStart(event: any) {
    if (this._isTarget) {
      event.dataTransfer.setData('Text', event.target.id);
      this._el.nativeElement.style.background = '#ffccff';
    }
  }

  @HostListener('dragend', ['$event'])
  dragEnd(event: any) {
    if (this._isTarget) {
      this._el.nativeElement.style.background = this.defaultBackground;
    }
  }

  @HostListener('dragenter', ['$event'])
  dragEnter(event: any) {
    if (this.isConcerned(event.target)) {
      if (this.isTarget(event.target)) {
        let data = event.dataTransfer.getData('Text');
        event.target.parentElement.appendChild(document.getElementById(data));
      } else {
        // this._el.nativeElement.style.background = '#EEE';
      }
    }
  }

  @HostListener('dragover', ['$event'])
  dragOver(event: any) {
    if (this.isConcerned(event.target)) {
      if (!this._isTarget) {
        event.preventDefault();
      }
    }
  }

  @HostListener('dragleave', ['$event'])
  dragLeave(event: any) {
    if (this.isConcerned(event.target)) {
      if (!this._isTarget) {
        this._el.nativeElement.style.background = this.defaultBackground;
      } else {
        // this._el.nativeElement.style.marginTop = this.defaultMarginTop;
      }
    }
  }

  @HostListener('drop', ['$event'])
  drop(event: any) {
    event.preventDefault();
    if (event.target.classList.contains(this.dropZoneClass)) {
      let data = event.dataTransfer.getData('Text');
      event.target.appendChild(document.getElementById(data));
      // event.target.appendChild(this.appendGrid());
    }
    if (!this._isTarget) {
      event.currentTarget.style.background = '#CCC';
    }
  }

  setDropZoneExtra(name: string) {
    let dze = document.createElement('div');
    dze.className = 'dropzone extra ' + name;
    dze.setAttribute('dnd', '');
    return dze;
  }

  isConcerned(target: any) {
    if ('classList' in target) {
      if (target.classList.contains(this.targetClass) || target.classList.contains(this.dropZoneClass)) {
        return true;
      }
    } else {
      return false;
    }
  }

  isTarget(target: any) {
    if ('classList' in target) {
      return target.classList.contains(this.targetClass);
    } else {
      return false;
    }
  }

  appendGrid() {
    let next = document.createElement('div');
    let child = document.createElement('div');
    let grid = document.createElement('div');

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

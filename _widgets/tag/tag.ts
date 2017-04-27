import { Component, OnInit, Input, ElementRef, ViewChild, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'input-tag',
  templateUrl: './tag.html',
  styleUrls: ['./tag.css']
})
export class TagComponent implements OnInit {

  @Input() tags = [];
  @Input() placeholder: string = 'Ajouter un tag';

  @Output() hasChanged = new EventEmitter();

  @ViewChild('input') inputRef: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  addTag($event) {
    const value = $event.target.value;
    if (value.length < 1) {
      return;
    }

    // array temporaire, si il n'est pas vide c'est que le tag existe déjà et qu'on ne le rajoute pas une deuxième fois
    const tmp = this.tags.filter(tag => {
      return tag.name === value;
    });

    if (tmp.length > 0) {
      $event.target.value = '';
      return;
    }
    this.tags.push({name: value});
    $event.target.value = '';
    this.hasChanged.emit(this.tags);
  }

  removeTag(tagToRemove) {
    this.tags = this.tags.filter(tag => {
      return tag !== tagToRemove;
    });
    this.hasChanged.emit(this.tags);
  }

  focusOnInput() {
    this.inputRef.nativeElement.focus();
  }

}

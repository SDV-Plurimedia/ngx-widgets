import {Component, Input} from '@angular/core';

@Component({
  selector: 'bloc-card',
  templateUrl: './bloc-card.html',
  styleUrls: ['./bloc-card.css']
})

export class BlocCardComponent {
  @Input() data: {
    type: String,
    title: String,
    content: String
  };

  constructor() {}

}

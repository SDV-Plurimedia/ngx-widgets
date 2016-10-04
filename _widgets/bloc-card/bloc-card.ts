import {Component} from '@angular/core';

@Component({
  selector: 'bloc-card',
  templateUrl: './bloc-card.html',
  styleUrls: ['./bloc-card.css'],
  inputs: ['data']
})
export class BlocCardComponent {
  public data: {
    type: String,
    title: String,
    content: String
  };

  constructor() {}

  ngOnInit() {
    // Properties are resolved
  }
}

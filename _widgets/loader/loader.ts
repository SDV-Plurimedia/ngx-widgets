import {Component, Input} from '@angular/core';

@Component({
  selector: 'loader',
  templateUrl: './loader.html',
  styleUrls: ['./loader.css']
})
export class LoaderComponent {
  @Input() condition = false;
  @Input() type: string = '';
  @Input() from: string = '';
  constructor() { }
}

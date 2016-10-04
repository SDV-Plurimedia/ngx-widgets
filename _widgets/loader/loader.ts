import {Component} from '@angular/core';

@Component({
  selector: 'loader',
  templateUrl: './loader.html',
  styleUrls: ['./loader.css'],
  inputs: ['condition', 'type', 'from']
})
export class LoaderComponent {
  public condition = false;
  public type = "";
  public from ="";
  constructor(){
  }

  ngOnInit() {
    // Properties are resolved
  }

  ngOnDestroy() {
    // Speak now or forever hold your peace
  }
}

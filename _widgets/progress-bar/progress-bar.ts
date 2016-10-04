import {Component} from '@angular/core';
@Component({
  selector: 'progress-bar',
  templateUrl: './progress-bar.html',
  styleUrls: ['./progress-bar.css'],
  inputs: ['class', 'datas']
})
export class ProgressBarComponent {
  public class : string;
  public datas : {
    value : number;
    min_value : number;
    max_value : number;
  }
  public percent = "0%";

  constructor(){

  }
  ngOnInit() {
    // Properties are resolved

  }

  ngOnChanges(changes) {
    if(changes.datas && changes.datas.currentValue) {
      this.datas = changes.datas.currentValue;
      this.percent = Math.round((this.datas.value/(this.datas.max_value-this.datas.min_value))*100).toString();
      this.percent = (this.percent.length == 1)?"0"+this.percent:this.percent;
      this.percent += "%";
    }
  }
}

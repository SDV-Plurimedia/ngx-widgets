import {ElementRef, Renderer} from '@angular/core';
import {Graph, DataGraph, SimpleColor, SingleData} from './commun';

export class RadialChart implements Graph {
  public datas: SingleData;
  public colors: SimpleColor;
  public id: string;
  public required_files = [];

  constructor(datas: SingleData, color: SimpleColor, id: string,
              public width = 960, public height = 500 ) {
    this.datas = datas;
    this.colors = color;
    this.id = id;
  }

  loadGraph() {
    jQuery().ready( () => {
      jQuery('#' + this.id).append(
        '<input id="knob_' + this.id + '" name="knob_' + this.id + '" class="knob" value="' + this.datas.value + '">'
      );
      jQuery('#knob_' + this.id).knob({
          min : this.datas.min_value,
          max : this.datas.max_value,
          readOnly : true,
          displayInput : true,
          fgColor : 'rgb(' + this.colors.color.r + ',' + this.colors.color.g + ',' + this.colors.color.b + ')'
      });

      jQuery('#knob_' + this.id).val(Math.round((this.datas.value / this.datas.max_value) * 100) + '%');
    });
  }
}

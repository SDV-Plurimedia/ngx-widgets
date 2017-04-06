import {ElementRef, Renderer} from '@angular/core';
import {Graph, DataGraph, ColorsForScale} from './commun';
declare let Morris;

export class DonutChart implements Graph {
  public datas: DataGraph[];
  public colors: ColorsForScale;
  public id: string;
  public required_files = [];

  protected color_scale: string[];
  protected radius: number;
  protected href = window.location.href;

  constructor(datas: DataGraph[], color: ColorsForScale, id: string,
    public width = 960, public height = 500, public unite = '') {

    this.datas = datas;
    this.colors = color;
    this.id = id;
    this.radius = Math.min(width, height) / 2;
    if (color.end_color !== undefined) {
      this.setColorScale();
    } else {
      this.color_scale = ['rgb(' + color.start_color.r + ',' + color.start_color.g + ',' + color.start_color.b + ')'];
    }
    // this.color_scale =  ['#ff0000', '#00ff00', '#0000ff', '#ffff00'];
  }

  setColorScale() {
    this.color_scale = [];
    let c1 = this.colors.start_color;
    let c2 = this.colors.end_color;
    let nb = this.colors.nb_color;
    // Calcul des différence dans les tons
    let diff = {
      r: (c2.r - c1.r) / (nb - 1),
      g: (c2.g - c1.g) / (nb - 1),
      b: (c2.b - c1.b) / (nb - 1)
    };
    let c = { r: 0, g: 0, b: 0 };

    for (let i = 0; i < nb; i++) {
      c.r = Math.round(c1.r + i * diff.r);
      c.g = Math.round(c1.g + i * diff.g);
      c.b = Math.round(c1.b + i * diff.b);
      this.color_scale.push('rgb(' + c.r + ',' + c.g + ',' + c.b + ')');
    }
  }

    loadGraph() {
        Morris.Donut({
            element: this.id,
            data: this.datas,
            colors: this.color_scale,
            formatter: (y, data) => { return y + this.unite; }
        });
    }
}

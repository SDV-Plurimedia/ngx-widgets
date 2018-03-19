import {Component, ElementRef, Renderer, Input, OnInit, OnChanges} from '@angular/core';
import {Graph} from './types/commun';

@Component({
  selector: 'graph',
  templateUrl: './graph.html',
  styleUrls: ['./graph.css']
})

export class GraphComponent implements OnInit, OnChanges {
  @Input() graph: Graph;
  public graph_width;
  public graph_height;

  constructor(private element: ElementRef, private renderer: Renderer) { }

  ngOnInit() {
    this.graph_height = this.graph.height + 'px';
    this.graph_width = this.graph.width + 'px';
    // on construit dans un timeout, pour ne pas appeler Morrisou D" avabt que la div existe vraiment
    setTimeout(scope => { scope.loadGraph(); }, 1, this.graph);
  }

  ngOnChanges(changes) {
    if (changes.graph.previousValue) {
      document.getElementById(this.graph.id).innerHTML = '';
      this.graph.loadGraph();
    }
  }

}

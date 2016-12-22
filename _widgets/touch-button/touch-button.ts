import {Component, ElementRef, Renderer} from "@angular/core";
import {TouchButtonLinkComponent} from "./link";

@Component({
  selector: "touch-button",
  templateUrl: "./touch-button.html",
  styleUrls: ["./touch-button.css"]
})
export class TouchButtonComponent {
  public dependenciesAreLoaded: boolean;
  public dependenciesAreLoadedPromise: Promise<any>;
  public links: Array<TouchButtonLinkComponent>;
  public state: string;

  constructor(private element: ElementRef, private renderer: Renderer) {
      this.state = "closed";

      this.links = [];
      this.dependenciesAreLoaded = true;
  }

  openTouchBtn() {
    console.log("open");
    this.state = (this.state == "closed") ? "open" : "closed";

    // this.renderer.setElementClass(this.element,"open",true);
    $(this.element.nativeElement).toggleClass("open");
    $(this.element.nativeElement).find(".option").toggleClass("scale-on");
  }

  addLink(link) {
    this.links.push(link);
    link.index = this.links.length; // index commence à 1
  }

  ngOnInit() {
    // Properties are resolved
  }
  ngOnDestroy() {
    // Speak now or forever hold your peace
  }
  ngDoCheck() {
    // Custom change detection
  }
  ngOnChanges(changes) {
    // Called right after our bindings have been checked but only
    // if one of our bindings has changed.
    //
    // changes is an object of the format:
    // {
    //   "prop": PropertyUpdate
    // }
  }
  ngAfterContentInit() {
    // Component content has been initialized
  }
  ngAfterContentChecked() {
    // Component content has been Checked
  }
  ngAfterViewInit() {
    // Component views are initialized
  }
  ngAfterViewChecked() {
    // Component views have been checked
  }
}

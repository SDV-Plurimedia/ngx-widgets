import { Component, Input } from '@angular/core';

@Component({
  selector: 'loading-message',
  templateUrl: 'loading-message.component.html',
  styleUrls: ['loading-message.component.css']
})
export class LoadingMessageComponent {
  @Input() type = 'default';

  constructor() {}
}

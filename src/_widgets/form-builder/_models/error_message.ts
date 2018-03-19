export class ErrorMessage {
  public message: string = '';
  public hidden: boolean = true;

  constructor(obj: any = {}) {
    this.message = obj && obj.message || '';
    this.hidden = obj && obj.hidden || true;
  }

}

import {bindable} from "aurelia-framework";

export class PageHeader {

  @bindable text = '';

  constructor(text) {
    this.text = text;
  }
}

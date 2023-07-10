import {bindable} from "aurelia-framework";

export class TodoPanel {

  @bindable todos = [];

  @bindable createButton = false;

  @bindable openModal = () => {
  };

  constructor() {
    //
  }

  attached() {
    console.log('TodoPanel activate', this.todos);
  }

  hasCreateButton() {
    return this.createButton;
  }
}

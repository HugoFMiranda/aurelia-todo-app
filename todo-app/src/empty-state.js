import {bindable} from "aurelia-framework";

export class EmptyState {

  @bindable text = '';

  @bindable isNew = false;

  @bindable showModal = false;

  @bindable openModal = () => {
  };

  constructor(text, isNew) {
    this.text = text ?? 'No Todos Found';
    this.isNew = isNew ?? false;
  }

  isNewTodo() {
    return this.isNew;
  }
}

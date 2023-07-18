import {bindable} from "aurelia-framework";

export class TodoItem {
  @bindable todo;
  @bindable rmTodo = (todo) => {
  };

  @bindable isDragging;

  constructor() {
    //
  }

}

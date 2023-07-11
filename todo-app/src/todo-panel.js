import {bindable} from "aurelia-framework";
import {inject} from "aurelia-dependency-injection";

inject(Element);

export class TodoPanel {

  @bindable todos = [];
  @bindable openModal = () => {
  };
  @bindable rmTodo = (todo) => {
  };

  draggedItem = undefined;

  @bindable isDragging;

  constructor(element) {
    this.element = element;
  }

  dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
    event.dataTransfer.effectAllowed = 'move';
    this.draggedItem = event.target;
    const classList = this.draggedItem.classList;
    this.draggedItem.classList = 'dragging' + ' ' + classList;
    this.isDragging = true;
    return true;
  }

}

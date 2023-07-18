import {bindable} from "aurelia-framework";
import {TodoService} from "../services/todoService";
import {EventAggregator} from "aurelia-event-aggregator";
import {inject} from "aurelia-dependency-injection";


@inject(TodoService, EventAggregator)
export class TodoPanel {

  @bindable todos = [];

  @bindable rmTodo = (todo) => {
  };

  draggedItem = undefined;

  @bindable isDragging;

  showModal = false;

  constructor(todoService, eventAggregator) {
    this.todoService = todoService;
    this.todo = undefined;
    this.newTodo = '';
    this.tags = '';
    this.eventAggregator = eventAggregator;
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

  openModal(todo) {
    console.log(todo);
    this.showModal = true;
    this.todo = todo;
    this.newTodo = todo.text;
    this.tags = todo.tags.map(tag => tag.name).join(', ');
  }

  closeModal() {
    this.showModal = false;
  }

  async updateTodo() {
    this.closeModal();
    const tagArray = this.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);

    await this.todoService.updateTodo({
      id: this.todo.id,
      text: this.todo.text,
      status: this.todo.status,
      tags: tagArray,
    }).then(
      async () => {
        this.eventAggregator.publish('todo:updated', this.todo);
        this.todo = undefined;
      }
    );
  }
}

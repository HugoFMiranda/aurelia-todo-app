import {TodoItem} from "./todoItem";

export class Todos {

  showModal = false;

  constructor() {
    this.todos = [];
    this.todos.push(new TodoItem('Learn Aurelia'));
    this.todos.push(new TodoItem('Build an app'));
    this.todos.push(new TodoItem('Deploy it'));
    this.newTodo = '';
  }

  addTodo() {
    if (this.newTodo) {
      this.todos.push(new TodoItem(this.newTodo));
      this.newTodo = '';
      this.showModal = false;
    }
  }

  rmTodo(todo) {
    this.todos.splice(this.todos.indexOf(todo), 1)
  }


  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}

import {inject, observable} from 'aurelia-framework';
import {TodoService} from '../common/services/todoService';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(TodoService, EventAggregator)
export class Todos {

  @observable todos = [];
  @observable isDragging = false;
  todosTodo = [];
  todosDoing = [];
  todosDone = [];
  showModal = false;

  constructor(todoService, eventAggregator) {
    this.todoService = todoService;
    this.newTodo = '';
    this.tags = '';
    this.eventAggregator = eventAggregator;
  }

  async activate() {
    this.todos = await this.todoService.getTodos();
  }

  attached() {
    this.subscription = this.eventAggregator.subscribe('todo:updated', async todo => {
      this.todos = await this.todoService.getTodos();
      this.todos = [...this.todos];
    });
  }

  detached() {
    this.subscription.dispose();
  }

  async addTodo() {
    const tagArray = this.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);

    if (this.newTodo) {
      await this.todoService.addTodo({
        text: this.newTodo,
        status: 'todo',
        tags: tagArray,
      }).then(async () => {
        this.todos = await this.todoService.getTodos();
        this.todos = [...this.todos];
      });
      this.newTodo = '';
      this.tags = '';
      this.showModal = false;
    }
  }

  async rmTodo(todo) {
    try {
      await this.todoService.rmTodo(todo);
      const todoToRemove = this.todos.find(item => item.id === todo);
      if (todoToRemove) {
        todoToRemove.isRemoving = true;
        setTimeout(async () => {
          this.todos = await this.todoService.getTodos();
        }, 500);
      }
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  setTodosTodo() {
    this.todosTodo = this.todos.filter(todo => todo.status === 'todo');
  }

  setTodosDoing() {
    this.todosDoing = this.todos.filter(todo => todo.status === 'doing');
  }

  setTodosDone() {
    this.todosDone = this.todos.filter(todo => todo.status === 'done');
  }

  todosChanged(newValue, oldValue) {
    this.setTodosTodo();
    this.setTodosDoing();
    this.setTodosDone();
  }

  dragOver(event) {
    this.draggedItem = event.target;
    event.preventDefault();
  }

  findTodoById(id) {
    return this.todos.find(item => item.id === parseInt(id));
  }

  drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData('text/plain');
    document.getElementById(data).classList.remove('dragging');

    const droppedTodo = this.findTodoById(data);
    const droppedInStatus = this.droppedInStatus();
    this.updateTodoStatus(droppedTodo, droppedInStatus).then(r => {
      this.draggedItem = event.target;
      this.draggedItem.classList.remove('dragging');
    });
    this.isDragging = false;
  }

  getParentId(event) {
    let dropTargetParentId = null;
    let currentElement = event.target.parentNode;
    while (currentElement) {
      if (currentElement.id && currentElement.id.includes('-panel')) {
        dropTargetParentId = currentElement.id;
        break;
      }
      currentElement = currentElement.parentNode;
    }
    return dropTargetParentId;
  }

  droppedInStatus() {
    return this.getParentId(event).replace('-panel', '');
  }

  async updateTodoStatus(todo, status) {
    if (todo.status !== status) {
      todo.status = status;
      try {
        await this.todoService.updateStatus(todo).then(async () => {
          this.todos = await this.todoService.getTodos();
          this.todos = [...this.todos];
        });
      } catch (error) {
        console.error('Failed to update todo status:', error);
      }
    }
  }
}

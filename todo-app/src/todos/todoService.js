import {HttpClient} from 'aurelia-fetch-client';

export class TodoService {

  constructor() {
    this.http = new HttpClient();
  }

  async getTodos() {
    try {
      const response = await this.http.fetch('http://localhost:8000/api/todos');
      return response.json();
    } catch (error) {
      console.error('Failed to fetch todos:', error);
      return [];
    }
  }

  async addTodo(todo) {
    try {
      const response = await this.http.fetch('http://localhost:8000/api/todos', {
        method: 'POST',
        body: JSON.stringify(todo),
      });
      return response.json();
    } catch (error) {
      console.error('Failed to fetch todos:', error);
      return [];
    }
  }

  async rmTodo(todo) {
    try {
      const response = await this.http.fetch(`http://localhost:8000/api/todos/${todo}`, {
        method: 'DELETE',
      });
      return response.json();
    } catch (error) {
      console.error('Failed to delete todo:', error);
      return [];
    }
  }

  async updateStatus(todo) {
    try {
      const response = await this.http.fetch(`http://localhost:8000/api/todos/${todo.id}`, {
        method: 'PUT',
        body: JSON.stringify(todo),
      });
      return response.json();
    } catch (error) {
      console.error('Failed to update todo:', error);
      return [];
    }
  }
}

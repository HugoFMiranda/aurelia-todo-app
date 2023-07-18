import {HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';
import {AuthService} from "./authService";

@inject(AuthService)
export class TodoService {

  constructor(authService) {
    this.http = new HttpClient();
    this.authService = authService;
  }

  async getAuthorizationHeaders() {
    const token = this.authService.getToken();
    if (token) {
      return {
        'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json',
      };
    }
    return {
      'Content-Type': 'application/json',
    };
  }

  async getTodos() {
    try {
      const headers = await this.getAuthorizationHeaders();
      const response = await this.http.fetch('http://localhost:8000/api/todos', {
        headers,
      });
      return response.json();
    } catch (error) {
      console.error('Failed to fetch todos:', error);
      return [];
    }
  }

  async addTodo(todo) {
    try {
      const headers = await this.getAuthorizationHeaders();
      const response = await this.http.fetch('http://localhost:8000/api/todos', {
        method: 'POST', headers, body: JSON.stringify(todo),
      });
      return response.json();
    } catch (error) {
      console.error('Failed to add todo:', error);
      return [];
    }
  }

  async rmTodo(todo) {
    try {
      const headers = await this.getAuthorizationHeaders();
      const response = await this.http.fetch(`http://localhost:8000/api/todos/${todo}`, {
        method: 'DELETE', headers,
      });
      return response.json();
    } catch (error) {
      console.error('Failed to delete todo:', error);
      return [];
    }
  }

  async updateStatus(todo) {
    try {
      const headers = await this.getAuthorizationHeaders();
      const response = await this.http.fetch(`http://localhost:8000/api/todos/${todo.id}`, {
        method: 'PUT', headers, body: JSON.stringify(todo),
      });
      return response.json();
    } catch (error) {
      console.error('Failed to update todo:', error);
      return [];
    }
  }
}


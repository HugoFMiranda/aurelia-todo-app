import {HttpClient} from 'aurelia-fetch-client';
import jwtDecode from 'jwt-decode';

export class AuthService {
  constructor() {
    this.httpClient = new HttpClient();
    this.user = null;
    this.token = sessionStorage.getItem('token');

    if (this.token) {
      this.decodeToken();
    }
  }

  async login(credentials) {
    const response = await this.httpClient.fetch('http://localhost:8000/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.ok) {
      const data = await response.json();
      sessionStorage.setItem('token', data.token);
      this.token = data.token;
      this.decodeToken();
    }

    return response.ok;
  }

  async signup(user) {
    const response = await this.httpClient.fetch('http://localhost:8000/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(user),
    });

    return response.ok;
  }

  async logout() {
    const response = await this.httpClient.fetch('http://localhost:8000/api/auth/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      sessionStorage.removeItem('token');
      this.token = null;
      this.user = null;
    }

    return response.ok;
  }

  async getUser() {
    if (!this.token) {
      return null;
    }

    const response = await this.httpClient.fetch('http://localhost:8000/api/auth/check-logged-in-user', {
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
    });

    if (response.ok) {
      this.user = await response.json();
    }

    return this.user.user;
  }

  async checkAuthentication() {
    if (!this.token) {
      return false;
    }

    const response = await this.httpClient.fetch('http://localhost:8000/api/auth/check-logged-in-user', {
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
    });

    if (response.ok) {
      this.user = await response.json();
    }

    return response.ok;
  }

  getToken() {
    return this.token;
  }

  decodeToken() {
    try {
      const decodedToken = jwtDecode(this.token);
      this.user = decodedToken.user;
    } catch (error) {
      this.user = null;
    }
  }
}

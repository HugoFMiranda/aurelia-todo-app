import { inject } from 'aurelia-framework';
import { AuthService } from '../services/AuthService';

@inject(AuthService)
export class LoginForm {
  constructor(authService) {
    this.authService = authService;
    this.credentials = {
      email: '',
      password: '',
    };
  }

  async login() {
    try {
      await this.authService.login(this.credentials);
      // Handle successful login, e.g., navigate to a protected route
    } catch (error) {
      // Handle login error
    }
  }
}

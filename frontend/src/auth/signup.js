import {AuthService} from '../common/services/authService'
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(AuthService, Router)
export class Signup {
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
  }

  usrname = '';
  email = '';
  password = '';
  passwordConfirm = '';

  async signup() {
    try {
      const newUser = {
        name: this.usrname,
        email: this.email,
        password: this.password,
        passwordConfirm: this.passwordConfirm
      };

      const response = await this.authService.signup(newUser);
      if (response) {
        this.router.navigateToRoute('login');
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
  }
}

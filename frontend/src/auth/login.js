import {Aurelia, inject} from 'aurelia-framework';
import {AuthService} from '../common/services/authService';
import {Router} from 'aurelia-router';
import {PLATFORM} from "aurelia-pal";

@inject(AuthService, Router, Aurelia)
export class Login {

  constructor(authService, router, aurelia) {
    this.authService = authService;
    this.router = router;
    this.aurelia = aurelia;
  }

  email = '';
  password = '';

  async login() {
    try {
      const credentials = {
        email: this.email,
        password: this.password
      };

      const response = await this.authService.login(credentials);
      if (response) {
        this.router.reset();
        this.router.navigate('/', { replace: true, trigger: false });
        await this.aurelia.setRoot(PLATFORM.moduleName('app'));
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  }
}

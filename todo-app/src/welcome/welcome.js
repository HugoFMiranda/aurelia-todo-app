import {inject} from 'aurelia-framework';
import {AuthService} from "../common/services/authService";

@inject(AuthService)
export class Welcome {

  firstName = '';

  constructor(authService) {
    this.authService = authService;
    this.message = `Welcome ${this.getFirstName()}!`;
  }

  async activate() {
    this.firstName = await this.getFirstName();
  }

  async getFirstName() {
    const user = await this.authService.getUser();
    return user.name.split(' ')[0];
  }
}

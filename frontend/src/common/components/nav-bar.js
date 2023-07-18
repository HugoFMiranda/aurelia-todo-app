import {PLATFORM} from "aurelia-pal";
import {Aurelia, inject} from "aurelia-framework";
import {Router} from "aurelia-router";
import {AuthService} from '../services/authService';

@inject(AuthService, Router, Aurelia)
export class NavBar {
  constructor(authService, router, aurelia) {
    this.authService = authService;
    this.router = router;
    this.aurelia = aurelia;
  }

  async logout() {
    await this.authService.logout();
    this.router.reset();
    this.router.navigate('/', { replace: true, trigger: false });
    await this.aurelia.setRoot(PLATFORM.moduleName('no-auth-app'));
  }
}

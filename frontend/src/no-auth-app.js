import {PLATFORM} from "aurelia-pal";
import {Router} from "aurelia-router";
import {inject} from "aurelia-framework";

@inject(Router)
export class NoAuthApp {
  constructor(router) {
    this.router = router;
  }

  configureRouter(config, router) {
    config.options = config.options || {};

    config.title = 'Aurelia';
    config.options.root = '/';
    config.options.pushState = true;
    config.options.hashChange = false;
    config.map([
      {
        route: ['', 'login'],
        name: 'login',
        moduleId: PLATFORM.moduleName('auth/login'),
        title: 'Login'
      },
      {
        route: 'signup',
        name: 'signup',
        moduleId: PLATFORM.moduleName('auth/signup'),
        title: 'Signup'
      }
    ]);

    this.router = router;
  }
}

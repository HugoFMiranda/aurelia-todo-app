import {PLATFORM} from 'aurelia-pal';
import {inject} from "aurelia-framework";
import {Router} from "aurelia-router";

@inject(Router)
export class App {
  constructor(router) {
    this.router = router;
  }

  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.options.root = '/';
    config.options.pushState = true;
    config.options.hashChange = false;
    config.map([
      {
        route: ['', 'welcome'],
        name: 'Welcome',
        moduleId: PLATFORM.moduleName('welcome/welcome'),
        nav: true,
        title: 'Dashboard'
      },
      {
        route: 'todos',
        name: 'Todos',
        moduleId: PLATFORM.moduleName('todos/todos'),
        nav: true,
        title: 'Todos'
      },
      {
        route: 'users',
        name: 'users',
        moduleId: PLATFORM.moduleName('users/users'),
        nav: true,
        title: 'Github Users'
      }
    ]);

    this.router = router;
  }
}

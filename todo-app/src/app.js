import {PLATFORM} from 'aurelia-pal';
import {TodoItem} from "./todos/todoItem";

export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.options.pushState = true;
    config.options.root = '/';
    config.options.hashChange = false;
    config.map([
      {
        route: ['', 'welcome'],
        name: 'Welcome',
        moduleId: PLATFORM.moduleName('./welcome'),
        nav: true,
        title: 'Dashboard'
      },
      {
        route: 'todos',
        name: 'Todos',
        moduleId: PLATFORM.moduleName('./todos'),
        nav: true,
        title: 'Todos'
      },
      {
        route: 'users',
        name: 'users',
        moduleId: PLATFORM.moduleName('./users'),
        nav: true,
        title: 'Github Users'
      },
      {
        route: 'child-router',
        name: 'child-router',
        moduleId: PLATFORM.moduleName('./child-router'),
        nav: false,
        title: 'Child Router'
      }
    ]);

    this.router = router;
  }
}

import {PLATFORM} from 'aurelia-pal';

export class ChildRouter {
  heading = 'Child Router';

  configureRouter(config, router) {
    config.map([
      {
        route: ['', 'todos'],
        name: 'welcome',
        moduleId: PLATFORM.moduleName('./todos'),
        nav: true,
        title: 'Welcome'
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
        nav: true,
        title: 'Child Router'
      }
    ]);

    this.router = router;
  }
}

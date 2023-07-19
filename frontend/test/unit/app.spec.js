import {App} from '../../src/app';
import {PLATFORM} from "aurelia-pal";

class RouterStub {
  configure(handler) {
    handler(this);
  }

  map(routes) {
    this.routes = routes;
  }
}
describe('the App module', () => {
  let sut;
  let mockedRouter;

  beforeEach(() => {
    mockedRouter = new RouterStub();
    sut = new App();
    sut.configureRouter(mockedRouter, mockedRouter);
  });

  it('contains a router property', () => {
    expect(sut.router).toBeDefined();
  });

  it('configures the router title', () => {
    expect(sut.router.title).toEqual('Aurelia');
  });

  it('should have a welcome route', () => {
    expect(sut.router.routes).toContainEqual({
      route: ['', 'welcome'],
      name: 'Welcome',
      moduleId: PLATFORM.moduleName('welcome/welcome'),
      nav: true,
      title: 'Dashboard'
    });
  });

  it('should have a users route', () => {
    expect(sut.router.routes).toContainEqual({
      route: 'users',
      name: 'users',
      moduleId: PLATFORM.moduleName('users/users'),
      nav: true,
      title: 'Github Users'
    });
  });

  it('should have a todos route', function () {
    expect(sut.router.routes).toContainEqual({
      route: 'todos',
      name: 'Todos',
      moduleId: PLATFORM.moduleName('todos/todos'),
      nav: true,
      title: 'Todos'
    });
  });
});

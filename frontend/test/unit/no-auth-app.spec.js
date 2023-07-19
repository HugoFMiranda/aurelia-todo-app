import {NoAuthApp} from '../../src/no-auth-app';
import {PLATFORM} from "aurelia-pal";

class RouterStub {
  configure(handler) {
    handler(this);
  }

  map(routes) {
    this.routes = routes;
  }
}
describe('the no auth App module', () => {
  let sut;
  let mockedRouter;

  beforeEach(() => {
    mockedRouter = new RouterStub();
    sut = new NoAuthApp();
    sut.configureRouter(mockedRouter, mockedRouter);
  });

  it('contains a router property', () => {
    expect(sut.router).toBeDefined();
  });

  it('configures the router title', () => {
    expect(sut.router.title).toEqual('Aurelia');
  });

  it('should have a login route', () => {
    expect(sut.router.routes).toContainEqual({
      route: ['', 'login'],
      name: 'login',
      moduleId: PLATFORM.moduleName('auth/login'),
      title: 'Login'
    });
  });

  it('should have a signup route', () => {
    expect(sut.router.routes).toContainEqual({
      route: 'signup',
      name: 'signup',
      moduleId: PLATFORM.moduleName('auth/signup'),
      title: 'Signup'
    });
  });
});

import {StageComponent} from "aurelia-testing";
import {AuthService} from "../../src/common/services/authService";
import {bootstrap} from "aurelia-bootstrapper";
import {PLATFORM} from "aurelia-pal";

export class MockService {
  user;

  getUser() {
    return Promise.resolve(this.user);
  }
}

describe('Welcome component', () => {
  let component;
  let service = new MockService();

  beforeEach(() => {
    service.user = {
      name: 'Bob Smith'
    };

    component = StageComponent
      .withResources(PLATFORM.moduleName('welcome/welcome'))
      .inView('<welcome></welcome>');

    component.bootstrap(aurelia => {
      aurelia.use.standardConfiguration();
      aurelia.container.registerInstance(AuthService, service);
    });
  });

  it('should render a welcome message waiting for the name', async () => {
    await component.create(bootstrap);
    const view = component.element;
    expect(view.textContent).toContain('Welcome !');
  });

  it('should set the firstName property on activate', async () => {
    await component.create(bootstrap);

    const viewModel = component.viewModel;

    await viewModel.activate();

    expect(viewModel.firstName).toBe('Bob');
  });

  afterEach(() => {
    component.dispose();
  });
});

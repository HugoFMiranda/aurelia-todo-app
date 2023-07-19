import {PLATFORM} from "aurelia-pal";
import {StageComponent} from "aurelia-testing";
import {bootstrap} from "aurelia-bootstrapper";

describe('PageHeader component', () => {
  let component;

  beforeEach(() => {
    component = StageComponent
      .withResources(PLATFORM.moduleName('common/components/page-header'))
      .inView('<page-header text.bind="text"></page-header>')
      .boundTo({text: 'Test'});
  });

  it('should render the text passed', done => {
    component.create(bootstrap).then(() => {
      const nameElement = document.querySelector('.text');
      expect(nameElement.innerHTML).toBe('Test');
      done();
    }).catch(e => {
      console.log(e.toString())
      done();
    });
  });

  afterEach(() => {
    component.dispose();
  });
});

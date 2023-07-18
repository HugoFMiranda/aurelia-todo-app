import 'tailwindcss/tailwind.css';
import environment from '../config/environment.json';
import {PLATFORM} from 'aurelia-pal';
import {AuthService} from "./common/services/authService";

export async function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'));

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  //Uncomment the line below to enable animation.
  aurelia.use.plugin(PLATFORM.moduleName('aurelia-animator-css'));
  //if the css animator is enabled, add swap-order="after" to all router-view elements

  //Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-html-import-template-loader'));

  const authService = aurelia.container.get(AuthService);
  const isAuthenticated = await authService.checkAuthentication();

  const rootModule = isAuthenticated ? PLATFORM.moduleName('app') : PLATFORM.moduleName('no-auth-app');
  aurelia.start().then(() => aurelia.setRoot(rootModule));

}

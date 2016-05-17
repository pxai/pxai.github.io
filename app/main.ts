import {AppComponent}     from './app.component';
import {bootstrap}        from '@angular/platform-browser-dynamic';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';

bootstrap(AppComponent, [
  ROUTER_PROVIDERS
]);

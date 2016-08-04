var ac_main =
webpackJsonpac__name_([4],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/*
	 * Providers provided by Angular
	 */
	var platform_browser_dynamic_1 = __webpack_require__(357);
	/*
	* Platform and Environment
	* our providers/directives/pipes
	*/
	var browser_1 = __webpack_require__(552);
	var environment_1 = __webpack_require__(553);
	/*
	* App Component
	* our top level component that holds all of our components
	*/
	var app_1 = __webpack_require__(549);
	/*
	 * Bootstrap our Angular app with a top level component `App` and inject
	 * our Services and Providers into Angular's dependency injection
	 */
	function main(initialHmrState) {
	    return platform_browser_dynamic_1.bootstrap(app_1.App, browser_1.PLATFORM_PROVIDERS.concat(environment_1.ENV_PROVIDERS, app_1.APP_PROVIDERS))
	        .then(environment_1.decorateComponentRef)
	        .catch(function (err) { return console.error(err); });
	}
	exports.main = main;
	/*
	 * Vendors
	 * For vendors for example jQuery, Lodash, angular2-jwt just import them anywhere in your app
	 * You can also import them in vendors to ensure that they are bundled in one file
	 * Also see custom-typings.d.ts as you also need to do `typings install x` where `x` is your module
	 */
	/*
	 * Hot Module Reload
	 * experimental version by @gdi2290
	 */
	if (false) {
	    // activate hot module reload
	    var ngHmr = require('angular2-hmr');
	    ngHmr.hotModuleReplacement(main, module);
	}
	else {
	    // bootstrap when document is ready
	    document.addEventListener('DOMContentLoaded', function () { return main(); });
	}
	

/***/ },

/***/ 160:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var angular2_hmr_1 = __webpack_require__(394);
	var AppState = (function () {
	    function AppState() {
	        // @HmrState() is used by HMR to track the state of any object during HMR (hot module replacement)
	        this._state = {};
	    }
	    Object.defineProperty(AppState.prototype, "state", {
	        // already return a clone of the current state
	        get: function () {
	            return this._state = this._clone(this._state);
	        },
	        // never allow mutation
	        set: function (value) {
	            throw new Error('do not mutate the `.state` directly');
	        },
	        enumerable: true,
	        configurable: true
	    });
	    AppState.prototype.get = function (prop) {
	        // use our state getter for the clone
	        var state = this.state;
	        return state.hasOwnProperty(prop) ? state[prop] : state;
	    };
	    AppState.prototype.set = function (prop, value) {
	        // internally mutate our state
	        return this._state[prop] = value;
	    };
	    AppState.prototype._clone = function (object) {
	        // simple object clone
	        return JSON.parse(JSON.stringify(object));
	    };
	    __decorate([
	        angular2_hmr_1.HmrState(), 
	        __metadata('design:type', Object)
	    ], AppState.prototype, "_state", void 0);
	    AppState = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], AppState);
	    return AppState;
	}());
	exports.AppState = AppState;
	

/***/ },

/***/ 374:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var Observable_1 = __webpack_require__(5);
	__webpack_require__(563);
	var DataResolver = (function () {
	    function DataResolver() {
	    }
	    DataResolver.prototype.resolve = function (route, state) {
	        return Observable_1.Observable.of({ res: 'I am data' });
	    };
	    DataResolver = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], DataResolver);
	    return DataResolver;
	}());
	exports.DataResolver = DataResolver;
	// an array of services to resolve routes with data
	exports.APP_RESOLVER_PROVIDERS = [
	    DataResolver
	];
	

/***/ },

/***/ 375:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var webpack_toolkit_1 = __webpack_require__(248);
	var home_1 = __webpack_require__(544);
	var no_content_1 = __webpack_require__(550);
	var app_resolver_1 = __webpack_require__(374);
	exports.routes = [
	    { path: '', component: home_1.Home },
	    { path: 'home', component: home_1.Home },
	    // make sure you match the component type string to the require in asyncRoutes
	    { path: 'about', component: 'About',
	        resolve: {
	            'yourData': app_resolver_1.DataResolver
	        } },
	    // async components with children routes must use WebpackAsyncRoute
	    { path: 'detail', component: 'Detail',
	        canActivate: [webpack_toolkit_1.WebpackAsyncRoute],
	        children: [
	            { path: '', component: 'Index' } // must be included
	        ] },
	    { path: '**', component: no_content_1.NoContent },
	];
	// Async load a component using Webpack's require with es6-promise-loader and webpack `require`
	// asyncRoutes is needed for our @angularclass/webpack-toolkit that will allow us to resolve
	// the component correctly
	exports.asyncRoutes = {
	    // we have to use the alternative syntax for es6-promise-loader to grab the routes
	    'About': __webpack_require__(554),
	    'Detail': __webpack_require__(379),
	    'Index': __webpack_require__(379),
	};
	// Optimizations for initial loads
	// An array of callbacks to be invoked after bootstrap to prefetch async routes
	exports.prefetchRouteCallbacks = [
	    exports.asyncRoutes['About'],
	    exports.asyncRoutes['Detail'],
	];
	// Es6PromiseLoader and AsyncRoutes interfaces are defined in custom-typings
	

/***/ },

/***/ 376:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/*
	 * These are globally available directives in any template
	 */
	// Angular 2
	var core_1 = __webpack_require__(1);
	// Angular 2 Router
	var router_1 = __webpack_require__(124);
	// Angular 2 forms
	var forms_1 = __webpack_require__(220);
	// application_directives: directives that are global through out the application
	exports.APPLICATION_DIRECTIVES = router_1.ROUTER_DIRECTIVES.concat(forms_1.REACTIVE_FORM_DIRECTIVES);
	exports.DIRECTIVES = [
	    { provide: core_1.PLATFORM_DIRECTIVES, multi: true, useValue: exports.APPLICATION_DIRECTIVES }
	];
	

/***/ },

/***/ 377:
/***/ function(module, exports, __webpack_require__) {

	/*
	 * These are globally available pipes in any template
	 */
	"use strict";
	var core_1 = __webpack_require__(1);
	// application_pipes: pipes that are global through out the application
	exports.APPLICATION_PIPES = [];
	exports.PIPES = [
	    { provide: core_1.PLATFORM_PIPES, multi: true, useValue: exports.APPLICATION_PIPES }
	];
	

/***/ },

/***/ 378:
/***/ function(module, exports, __webpack_require__) {

	/*
	 * These are globally available services in any component or any other service
	 */
	"use strict";
	// Angular 2
	var common_1 = __webpack_require__(34);
	// Angular 2 Http
	var http_1 = __webpack_require__(234);
	// Angular 2 Router
	var router_1 = __webpack_require__(124);
	// Angular 2 forms
	var forms_1 = __webpack_require__(220);
	// AngularClass
	var webpack_toolkit_1 = __webpack_require__(248);
	var request_idle_callback_1 = __webpack_require__(373);
	var app_routes_1 = __webpack_require__(375);
	var app_resolver_1 = __webpack_require__(374);
	/*
	* Application Providers/Directives/Pipes
	* providers/directives/pipes that only live in our browser environment
	*/
	exports.APPLICATION_PROVIDERS = [
	    // new Angular 2 forms
	    forms_1.disableDeprecatedForms(),
	    forms_1.provideForms()
	].concat(app_resolver_1.APP_RESOLVER_PROVIDERS, [
	    router_1.provideRouter(app_routes_1.routes),
	    webpack_toolkit_1.provideWebpack(app_routes_1.asyncRoutes),
	    request_idle_callback_1.providePrefetchIdleCallbacks(app_routes_1.prefetchRouteCallbacks)
	], http_1.HTTP_PROVIDERS, [
	    { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }
	]);
	exports.PROVIDERS = exports.APPLICATION_PROVIDERS.slice();
	

/***/ },

/***/ 379:
/***/ function(module, exports, __webpack_require__) {

	module.exports = function (namespace) {
	  return new Promise(function (resolve) {
	    __webpack_require__.e/* nsure */(1, function (require) {
	      if (namespace) {
	        resolve(__webpack_require__(431)[namespace]);
	      } else {
	        resolve(__webpack_require__(431));
	      }
	    });
	  });
	}

/***/ },

/***/ 542:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/*
	 * Angular 2 decorators and services
	 */
	var core_1 = __webpack_require__(1);
	var app_service_1 = __webpack_require__(160);
	/*
	 * App Component
	 * Top Level Component
	 */
	var App = (function () {
	    function App(appState) {
	        this.appState = appState;
	        this.angularclassLogo = 'assets/img/angularclass-avatar.png';
	        this.name = 'Angular 2 Webpack Starter';
	        this.url = 'https://twitter.com/AngularClass';
	    }
	    App.prototype.ngOnInit = function () {
	        console.log('Initial App State', this.appState.state);
	    };
	    App = __decorate([
	        core_1.Component({
	            selector: 'app',
	            encapsulation: core_1.ViewEncapsulation.None,
	            styles: [
	                __webpack_require__(759)
	            ],
	            template: "\n    <nav>\n      <span>\n        <a [routerLink]=\" ['./'] \">\n          Index\n        </a>\n      </span>\n      |\n      <span>\n        <a [routerLink]=\" ['./home'] \">\n          Home\n        </a>\n      </span>\n      |\n      <span>\n        <a [routerLink]=\" ['./detail'] \">\n          Detail\n        </a>\n      </span>\n      |\n      <span>\n        <a [routerLink]=\" ['./about'] \">\n          About\n        </a>\n      </span>\n    </nav>\n\n    <main>\n      <router-outlet></router-outlet>\n    </main>\n\n    <pre class=\"app-state\">this.appState.state = {{ appState.state | json }}</pre>\n\n    <footer>\n      <span>WebPack Angular 2 Starter by <a [href]=\"url\">@AngularClass</a></span>\n      <div>\n        <a [href]=\"url\">\n          <img [src]=\"angularclassLogo\" width=\"25%\">\n        </a>\n      </div>\n    </footer>\n  "
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof app_service_1.AppState !== 'undefined' && app_service_1.AppState) === 'function' && _a) || Object])
	    ], App);
	    return App;
	    var _a;
	}());
	exports.App = App;
	/*
	 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
	 * more angular app examples that you may copy/paste
	 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
	 * For help or questions please contact us at @AngularClass on twitter
	 * or our chat on Slack at https://AngularClass.com/slack-join
	 */
	

/***/ },

/***/ 543:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var app_service_1 = __webpack_require__(160);
	var title_1 = __webpack_require__(545);
	var x_large_1 = __webpack_require__(547);
	var Home = (function () {
	    // TypeScript public modifiers
	    function Home(appState, title) {
	        this.appState = appState;
	        this.title = title;
	        // Set our default values
	        this.localState = { value: '' };
	    }
	    Home.prototype.ngOnInit = function () {
	        console.log('hello `Home` component');
	        // this.title.getData().subscribe(data => this.data = data);
	    };
	    Home.prototype.submitState = function (value) {
	        console.log('submitState', value);
	        this.appState.set('value', value);
	        this.localState.value = '';
	    };
	    Home = __decorate([
	        core_1.Component({
	            // The selector is what angular internally uses
	            // for `document.querySelectorAll(selector)` in our index.html
	            // where, in this case, selector is the string 'home'
	            selector: 'home',
	            // We need to tell Angular's Dependency Injection which providers are in our app.
	            providers: [
	                title_1.Title
	            ],
	            // We need to tell Angular's compiler which directives are in our template.
	            // Doing so will allow Angular to attach our behavior to an element
	            directives: [
	                x_large_1.XLarge
	            ],
	            // We need to tell Angular's compiler which custom pipes are in our template.
	            pipes: [],
	            // Our list of styles in our component. We may add more to compose many styles together
	            styles: [__webpack_require__(760)],
	            // Every Angular template is first compiled by the browser before Angular runs it's compiler
	            template: __webpack_require__(555)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof app_service_1.AppState !== 'undefined' && app_service_1.AppState) === 'function' && _a) || Object, (typeof (_b = typeof title_1.Title !== 'undefined' && title_1.Title) === 'function' && _b) || Object])
	    ], Home);
	    return Home;
	    var _a, _b;
	}());
	exports.Home = Home;
	

/***/ },

/***/ 544:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(543));
	

/***/ },

/***/ 545:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(546));
	

/***/ },

/***/ 546:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var http_1 = __webpack_require__(234);
	var Title = (function () {
	    function Title(http) {
	        this.http = http;
	        this.value = 'Angular 2';
	    }
	    Title.prototype.getData = function () {
	        console.log('Title#getData(): Get Data');
	        // return this.http.get('/assets/data.json')
	        // .map(res => res.json());
	        return {
	            value: 'AngularClass'
	        };
	    };
	    Title = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
	    ], Title);
	    return Title;
	    var _a;
	}());
	exports.Title = Title;
	

/***/ },

/***/ 547:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(548));
	

/***/ },

/***/ 548:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	/*
	 * Directive
	 * XLarge is a simple directive to show how one is made
	 */
	var XLarge = (function () {
	    function XLarge(element, renderer) {
	        // simple DOM manipulation to set font size to x-large
	        // `nativeElement` is the direct reference to the DOM element
	        // element.nativeElement.style.fontSize = 'x-large';
	        // for server/webworker support use the renderer
	        renderer.setElementStyle(element.nativeElement, 'fontSize', 'x-large');
	    }
	    XLarge = __decorate([
	        core_1.Directive({
	            selector: '[x-large]' // using [ ] means selecting attributes
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof core_1.Renderer !== 'undefined' && core_1.Renderer) === 'function' && _b) || Object])
	    ], XLarge);
	    return XLarge;
	    var _a, _b;
	}());
	exports.XLarge = XLarge;
	

/***/ },

/***/ 549:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	// App
	__export(__webpack_require__(542));
	__export(__webpack_require__(160));
	__export(__webpack_require__(375));
	var app_service_2 = __webpack_require__(160);
	// Application wide providers
	exports.APP_PROVIDERS = [
	    app_service_2.AppState
	];
	

/***/ },

/***/ 550:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(551));
	

/***/ },

/***/ 551:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var NoContent = (function () {
	    function NoContent() {
	    }
	    NoContent = __decorate([
	        core_1.Component({
	            selector: 'no-content',
	            template: "\n    <div>\n      <h1>404: page missing</h1>\n    </div>\n  "
	        }), 
	        __metadata('design:paramtypes', [])
	    ], NoContent);
	    return NoContent;
	}());
	exports.NoContent = NoContent;
	

/***/ },

/***/ 552:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(376));
	__export(__webpack_require__(377));
	__export(__webpack_require__(378));
	var browser_directives_2 = __webpack_require__(376);
	var browser_pipes_2 = __webpack_require__(377);
	var browser_providers_2 = __webpack_require__(378);
	exports.PLATFORM_PROVIDERS = browser_providers_2.PROVIDERS.concat(browser_directives_2.DIRECTIVES, browser_pipes_2.PIPES);
	

/***/ },

/***/ 553:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	// Angular 2
	// rc2 workaround
	var platform_browser_1 = __webpack_require__(111);
	var core_1 = __webpack_require__(1);
	// Environment Providers
	var PROVIDERS = [];
	// Angular debug tools in the dev console
	// https://github.com/angular/angular/blob/86405345b781a9dc2438c0fbe3e9409245647019/TOOLS_JS.md
	var _decorateComponentRef = function identity(value) { return value; };
	if (false) {
	    // Production
	    platform_browser_1.disableDebugTools();
	    core_1.enableProdMode();
	    PROVIDERS = PROVIDERS.slice();
	}
	else {
	    _decorateComponentRef = function (cmpRef) {
	        var _ng = window.ng;
	        platform_browser_1.enableDebugTools(cmpRef);
	        window.ng.probe = _ng.probe;
	        window.ng.coreTokens = _ng.coreTokens;
	        return cmpRef;
	    };
	    // Development
	    PROVIDERS = PROVIDERS.slice();
	}
	exports.decorateComponentRef = _decorateComponentRef;
	exports.ENV_PROVIDERS = PROVIDERS.slice();
	

/***/ },

/***/ 554:
/***/ function(module, exports, __webpack_require__) {

	module.exports = function (namespace) {
	  return new Promise(function (resolve) {
	    __webpack_require__.e/* nsure */(2, function (require) {
	      if (namespace) {
	        resolve(__webpack_require__(432)[namespace]);
	      } else {
	        resolve(__webpack_require__(432));
	      }
	    });
	  });
	}

/***/ },

/***/ 555:
/***/ function(module, exports) {

	module.exports = "<div class=\"card-container\">\n  <h1 x-large class=\"sample-content\">Your Content Here</h1>\n\n  <div>\n    For material design components use the <a href=\"https://github.com/AngularClass/angular2-webpack-starter/tree/material2\"><b>material2</b></a> branch\n  </div>\n\n  <hr>\n\n  <div>\n    For hot module reloading run\n    <pre>npm run start:hmr</pre>\n  </div>\n\n  <hr>\n\n  <div>\n    <h4>Local State</h4>\n\n    <form (ngSubmit)=\"submitState(localState.value)\" autocomplete=\"off\">\n\n      <input\n        [value]=\"localState.value\"\n        (input)=\"localState.value = $event.target.value\"\n        placeholder=\"Submit Local State to App State\"\n        autofocus>\n\n      <button md-raised-button color=\"primary\">Submit Value</button>\n    </form>\n    <!--\n        <input type=\"text\" [value]=\"localState.value\" (input)=\"localState.value = $event.target.value\" autofocus>\n        Rather than wiring up two-way data-binding ourselves with [value] and (input)\n        we can use Angular's [(ngModel)] syntax\n        <input type=\"text\" name=\"textInput\" [(ngModel)]=\"localState.value\" autofocus>\n      -->\n\n    <pre>this.localState = {{ localState | json }}</pre>\n\n  </div>\n\n</div>\n"

/***/ },

/***/ 563:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(5);
	var of_1 = __webpack_require__(162);
	Observable_1.Observable.of = of_1.of;
	//# sourceMappingURL=of.js.map

/***/ },

/***/ 759:
/***/ function(module, exports) {

	module.exports = "html, body{\n  height: 100%;\n  font-family: Arial, Helvetica, sans-serif\n}\n\nspan.active {\n  background-color: gray;\n}\n"

/***/ },

/***/ 760:
/***/ function(module, exports) {

	module.exports = "/*styles for home content only*/"

/***/ }

});
//# sourceMappingURL=main.map
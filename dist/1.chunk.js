webpackJsonpac__name_([1],{

/***/ 431:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var detail_component_1 = __webpack_require__(761);
	exports.Detail = detail_component_1.Detail;
	var index_component_1 = __webpack_require__(762);
	exports.Index = index_component_1.Index;
	console.log('`Detail` bundle loaded asynchronously');
	// Must be exported for WebpackAsyncRoute
	__export(__webpack_require__(763));
	

/***/ },

/***/ 761:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var router_1 = __webpack_require__(124);
	var Detail = (function () {
	    function Detail() {
	    }
	    Detail.prototype.ngOnInit = function () {
	        console.log('hello `Detail` component');
	    };
	    Detail = __decorate([
	        core_1.Component({
	            selector: 'detail',
	            directives: router_1.ROUTER_DIRECTIVES.slice(),
	            template: "\n    <router-outlet></router-outlet>\n  "
	        }), 
	        __metadata('design:paramtypes', [])
	    ], Detail);
	    return Detail;
	}());
	exports.Detail = Detail;
	

/***/ },

/***/ 762:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var Index = (function () {
	    function Index() {
	    }
	    Index.prototype.ngOnInit = function () {
	        console.log('hello `Index` component');
	    };
	    Index = __decorate([
	        core_1.Component({
	            selector: 'index',
	            template: "\n    <h1>Hello from Index</h1>\n  "
	        }), 
	        __metadata('design:paramtypes', [])
	    ], Index);
	    return Index;
	}());
	exports.Index = Index;
	

/***/ },

/***/ 763:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var detail_component_1 = __webpack_require__(761);
	var index_component_1 = __webpack_require__(762);
	// async components must be named routes for WebpackAsyncRoute
	exports.routes = {
	    path: 'detail', component: detail_component_1.Detail,
	    children: [
	        { path: '', component: index_component_1.Index }
	    ]
	};
	

/***/ }

});
//# sourceMappingURL=1.map
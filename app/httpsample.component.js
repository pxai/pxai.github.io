System.register(["angular2/core", "angular2/common"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1;
    var HttpSampleComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            // Optimal way to get just what we need:
            // import {Observable} from "rxjs/Rx";
            // import "rxjs/add/operator/filter";
            // import "rxjs/add/operator/debounceTime";
            /**
            * Using a service to take care of the server interaction
            */
            HttpSampleComponent = (function () {
                function HttpSampleComponent(formBuilder) {
                    this.title = "Simple form with Observable async query";
                    this.users = [{ id: 1, username: 'esnowden', email: 'ed@kgb.ru' },
                        { id: 2, username: 'jassange', email: 'julian@gob.pe' }];
                    this.form = formBuilder.group({
                        login: ["", common_1.Validators.required]
                    });
                }
                /**
                * async call to server to check wether user exists
                */
                HttpSampleComponent.prototype.checkLogin = function (login) {
                };
                HttpSampleComponent.prototype.signup = function () {
                    if (this.form.find("login").value === "admin") {
                        this.form.find("login").setErrors({
                            loginExists: true
                        });
                    }
                    console.log("Sending form");
                    console.log(this.form.value);
                };
                HttpSampleComponent = __decorate([
                    core_1.Component({
                        selector: "control-group",
                        templateUrl: "app/httpsample.template.html",
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder])
                ], HttpSampleComponent);
                return HttpSampleComponent;
            }());
            exports_1("HttpSampleComponent", HttpSampleComponent);
        }
    }
});
//# sourceMappingURL=httpsample.component.js.map
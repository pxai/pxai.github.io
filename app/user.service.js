System.register(["rxjs/add/operator/map"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var UserService;
    return {
        setters:[
            function (_1) {}],
        execute: function() {
            /**
            * http gets injected through the constructor argument
            *
            */
            UserService = (function () {
                function UserService(http) {
                    this.http = http;
                }
                UserService.prototype.getUsers = function () {
                    // we subscribe to an observable, when data is ready
                    // we push data to the component. this will be a consumer
                    // We expose only data using map operator, that must be imported
                    return this.http.get("http://localhost:3000/api/users/")
                        .map(function (result) { return result.json(); });
                };
                UserService.prototype.save = function () {
                    this.http.put("http://localhost:3000/api/user/save", "");
                };
                UserService.prototype.update = function () {
                    this.http.put("http://localhost:3000/api/user/update", "");
                };
                UserService.prototype.delete = function () {
                    this.http.put("http://localhost:3000/api/user/delete/", "");
                };
                return UserService;
            }());
            exports_1("UserService", UserService);
        }
    }
});
//# sourceMappingURL=user.service.js.map
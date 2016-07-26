System.register(['./app.component', '@angular/core/testing', '@angular/compiler/testing'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var app_component_1, testing_1, testing_2;
    return {
        setters:[
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (testing_1_1) {
                testing_1 = testing_1_1;
            },
            function (testing_2_1) {
                testing_2 = testing_2_1;
            }],
        execute: function() {
            ////////  SPECS  /////////////
            /// Delete this
            testing_1.describe('Smoke test', function () {
                testing_1.it('should run a passing test', function () {
                    testing_1.expect(true).toEqual(true, 'should pass');
                });
            });
            testing_1.describe('AppComponent with TCB', function () {
                testing_1.it('should instantiate component', testing_1.async(testing_1.inject([testing_2.TestComponentBuilder], function (tcb) {
                    tcb.createAsync(app_component_1.AppComponent).then(function (fixture) {
                        testing_1.expect(fixture.componentInstance instanceof app_component_1.AppComponent).toBe(true, 'should create AppComponent');
                    });
                })));
                /*
                  it('should have expected <h1> text',
                    async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
                
                      tcb.createAsync(AppComponent).then(fixture => {
                      // fixture.detectChanges();  // would need to resolve a binding but we don't have a binding
                
                      let h1 = fixture.debugElement.query(el => el.name === 'h1').nativeElement;  // it works
                
                          h1 = fixture.debugElement.query(By.css('h1')).nativeElement;            // preferred
                
                      expect(h1.innerText).toMatch(/angular 2 app/i, '<h1> should say something about "Angular 2 App"');
                    });
                
                  })));
                  */
            });
        }
    }
});
//# sourceMappingURL=app.component.spec.js.map
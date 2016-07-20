"use strict";
/* tslint:disable:no-unused-variable */
var app_component_1 = require('./app.component');
var testing_1 = require('@angular/core/testing');
var testing_2 = require('@angular/compiler/testing');
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
//# sourceMappingURL=app.component.spec.js.map
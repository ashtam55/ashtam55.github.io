(function () {
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"], {
    /***/
    0:
    /*!***************************!*\
      !*** multi ./src/main.ts ***!
      \***************************/

    /*! no static exports found */

    /***/
    function _(module, exports, __webpack_require__) {
      module.exports = __webpack_require__(
      /*! E:\projects\LHL-Web\LHL\src\main.ts */
      "zUnb");
      /***/
    },

    /***/
    "AytR":
    /*!*****************************************!*\
      !*** ./src/environments/environment.ts ***!
      \*****************************************/

    /*! exports provided: environment */

    /***/
    function AytR(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "environment", function () {
        return environment;
      }); // This file can be replaced during build by using the `fileReplacements` array.
      // `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
      // The list of file replacements can be found in `angular.json`.


      var environment = {
        production: false
      };
      /*
       * For easier debugging in development mode, you can import the following file
       * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
       *
       * This import should be commented out in production mode because it will have a negative impact
       * on performance if an error is thrown.
       */
      // import 'zone.js/dist/zone-error';  // Included with Angular CLI.

      /***/
    },

    /***/
    "QX6l":
    /*!**************************************************!*\
      !*** ./src/app/dashboard/dashboard.component.ts ***!
      \**************************************************/

    /*! exports provided: DashboardComponent */

    /***/
    function QX6l(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "DashboardComponent", function () {
        return DashboardComponent;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");

      var DashboardComponent = /*#__PURE__*/function () {
        function DashboardComponent() {
          _classCallCheck(this, DashboardComponent);
        }

        _createClass(DashboardComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }]);

        return DashboardComponent;
      }();

      DashboardComponent.ɵfac = function DashboardComponent_Factory(t) {
        return new (t || DashboardComponent)();
      };

      DashboardComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: DashboardComponent,
        selectors: [["app-dashboard"]],
        decls: 31,
        vars: 0,
        consts: [[1, "outer-container"], [1, "gradient-container"], [1, ""], [1, "row", "mx-auto"], [1, "mx-auto"], [1, "row"], [1, "col-md-4"], [1, "col-md-8"], [1, "col-sm-6"], ["id", "reveal", "poster", "assets/loading.png", "loading", "'eager'", "camera-controls", "", "src", "assets/image.glb", "alt", "A 3D model of a lhl"], [1, "btn"]],
        template: function DashboardComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "h1", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, " TripSync ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "h1");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, " Specifications : ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "ul");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "li");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, " Easily configurable via Web-App, So no download needed just fire-it-up. ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "li");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, " More than 60 pre-defined transitions to play with. ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "li");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, " Elegant Mood Light that uses high powered, 16 million colour LEDs, to fit in your mood. ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "li");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, " Compact in size. ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "li");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, " Plug & Play. ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "li");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, " Integrate with your Social platform to get notified in different colour. ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "div", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, " ok ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "div", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](28, "model-viewer", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "button", 10);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, "Buy now");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
        },
        styles: ["html[_ngcontent-%COMP%], body[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  height: auto;\n}\n\nmodel-viewer[_ngcontent-%COMP%]   #reveal[_ngcontent-%COMP%] {\n  --poster-color: transparent;\n}\n\nmodel-viewer[_ngcontent-%COMP%] {\n  width: auto;\n  height: 40vh;\n}\n\n.outer-container[_ngcontent-%COMP%] {\n  padding: 1vh 1vw 0vh 1vw;\n  background: #1e1e1e;\n}\n\n.gradient-container[_ngcontent-%COMP%] {\n  border-radius: 25px;\n  color: #666;\n  text-align: center;\n  box-sizing: border-box;\n  border: 6px solid transparent;\n  background-clip: padding-box, border-box;\n  background-origin: padding-box, border-box;\n  background-image: linear-gradient(to right, #181818, #1e1e1e), linear-gradient(to right, #9943b8, #412d8a);\n  min-height: 98vh;\n  min-width: 94vw;\n}\n\n.btn[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 5%;\n  left: 6%;\n  width: 30%;\n  height: 6%;\n  max-width: 200px;\n  text-align: center;\n  color: rgba(255, 255, 255, 0.9);\n  border-radius: 50px;\n  background: linear-gradient(-45deg, #ffa63d, #ff3d77, #338aff, #3cf0c5);\n  background-size: 600%;\n  -webkit-animation: anime 16s linear infinite;\n  animation: anime 16s linear infinite;\n}\n\n@-webkit-keyframes anime {\n  0% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n  100% {\n    background-position: 0% 50%;\n  }\n}\n\n@keyframes anime {\n  0% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n  100% {\n    background-position: 0% 50%;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXGRhc2hib2FyZC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7RUFFSSxpQkFBQTtFQUNBLFlBQUE7QUFDSjs7QUFDQTtFQUNJLDJCQUFBO0FBRUo7O0FBQUU7RUFDRSxXQUFBO0VBQ0EsWUFBQTtBQUdKOztBQURBO0VBQ0ksd0JBQUE7RUFDQSxtQkFBQTtBQUlKOztBQUZBO0VBQ0ksbUJBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxzQkFBQTtFQUNBLDZCQUFBO0VBQ0Esd0NBQUE7RUFDQSwwQ0FBQTtFQUNBLDBHQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0FBS0o7O0FBSEE7RUFDSSxlQUFBO0VBQ0EsVUFBQTtFQUNBLFFBQUE7RUFDQSxVQUFBO0VBQ0EsVUFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSwrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsdUVBQUE7RUFDQSxxQkFBQTtFQUNBLDRDQUFBO0VBQ0Esb0NBQUE7QUFNSjs7QUFKQTtFQUNJO0lBQ0ksMkJBQUE7RUFPTjtFQUxFO0lBQ0ksNkJBQUE7RUFPTjtFQUxFO0lBQ0ksMkJBQUE7RUFPTjtBQUNGOztBQUxBO0VBQ0k7SUFDSSwyQkFBQTtFQU9OO0VBTEU7SUFDSSw2QkFBQTtFQU9OO0VBTEU7SUFDSSwyQkFBQTtFQU9OO0FBQ0YiLCJmaWxlIjoiZGFzaGJvYXJkLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaHRtbCxcclxuYm9keSB7XHJcbiAgICBtaW4taGVpZ2h0OiAxMDB2aDtcclxuICAgIGhlaWdodDogYXV0bztcclxufVxyXG5tb2RlbC12aWV3ZXIgI3JldmVhbCB7XHJcbiAgICAtLXBvc3Rlci1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbiAgfVxyXG4gIG1vZGVsLXZpZXdlciB7XHJcbiAgICB3aWR0aDogYXV0bztcclxuICAgIGhlaWdodDogNDB2aDtcclxuICB9XHJcbi5vdXRlci1jb250YWluZXIge1xyXG4gICAgcGFkZGluZzogMXZoIDF2dyAwdmggMXZ3O1xyXG4gICAgYmFja2dyb3VuZDogcmdiKDMwLCAzMCwgMzApO1xyXG59XHJcbi5ncmFkaWVudC1jb250YWluZXIge1xyXG4gICAgYm9yZGVyLXJhZGl1czogMjVweDtcclxuICAgIGNvbG9yOiAjNjY2O1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgIGJvcmRlcjogNnB4IHNvbGlkIHRyYW5zcGFyZW50O1xyXG4gICAgYmFja2dyb3VuZC1jbGlwOiBwYWRkaW5nLWJveCwgYm9yZGVyLWJveDtcclxuICAgIGJhY2tncm91bmQtb3JpZ2luOiBwYWRkaW5nLWJveCwgYm9yZGVyLWJveDtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgcmdiKDI0LCAyNCwgMjQpLCByZ2IoMzAsIDMwLCAzMCkpLCBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsICByZ2IoMTUzLCA2NywgMTg0KSwgcmdiKDY1LCA0NSwgMTM4KSk7XHJcbiAgICBtaW4taGVpZ2h0OiA5OHZoO1xyXG4gICAgbWluLXdpZHRoOiA5NHZ3O1xyXG59XHJcbi5idG4ge1xyXG4gICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgYm90dG9tOiA1JTtcclxuICAgIGxlZnQ6IDYlO1xyXG4gICAgd2lkdGg6IDMwJTtcclxuICAgIGhlaWdodDogNiU7XHJcbiAgICBtYXgtd2lkdGg6IDIwMHB4O1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC45KTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDUwcHg7XHJcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoLTQ1ZGVnLCAjZmZhNjNkLCAjZmYzZDc3LCAjMzM4YWZmLCAjM2NmMGM1KTtcclxuICAgIGJhY2tncm91bmQtc2l6ZTogNjAwJTtcclxuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBhbmltZSAxNnMgbGluZWFyIGluZmluaXRlO1xyXG4gICAgYW5pbWF0aW9uOiBhbmltZSAxNnMgbGluZWFyIGluZmluaXRlO1xyXG59XHJcbkAtd2Via2l0LWtleWZyYW1lcyBhbmltZSB7XHJcbiAgICAwJSB7XHJcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCUgNTAlO1xyXG4gICAgfVxyXG4gICAgNTAlIHtcclxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAxMDAlIDUwJTtcclxuICAgIH1cclxuICAgIDEwMCUge1xyXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAlIDUwJTtcclxuICAgIH1cclxufVxyXG5Aa2V5ZnJhbWVzIGFuaW1lIHtcclxuICAgIDAlIHtcclxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwJSA1MCU7XHJcbiAgICB9XHJcbiAgICA1MCUge1xyXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDEwMCUgNTAlO1xyXG4gICAgfVxyXG4gICAgMTAwJSB7XHJcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCUgNTAlO1xyXG4gICAgfVxyXG59XHJcbiJdfQ== */"]
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DashboardComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
          args: [{
            selector: 'app-dashboard',
            templateUrl: './dashboard.component.html',
            styleUrls: ['./dashboard.component.scss']
          }]
        }], function () {
          return [];
        }, null);
      })();
      /***/

    },

    /***/
    "Sy1n":
    /*!**********************************!*\
      !*** ./src/app/app.component.ts ***!
      \**********************************/

    /*! exports provided: AppComponent */

    /***/
    function Sy1n(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AppComponent", function () {
        return AppComponent;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./dashboard/dashboard.component */
      "QX6l");

      var AppComponent = function AppComponent() {
        _classCallCheck(this, AppComponent);

        this.title = 'LHL';
      };

      AppComponent.ɵfac = function AppComponent_Factory(t) {
        return new (t || AppComponent)();
      };

      AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: AppComponent,
        selectors: [["app-root"]],
        decls: 1,
        vars: 0,
        template: function AppComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-dashboard");
          }
        },
        directives: [_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_1__["DashboardComponent"]],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MifQ== */"]
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
          args: [{
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss']
          }]
        }], null, null);
      })();
      /***/

    },

    /***/
    "ZAI4":
    /*!*******************************!*\
      !*** ./src/app/app.module.ts ***!
      \*******************************/

    /*! exports provided: AppModule */

    /***/
    function ZAI4(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AppModule", function () {
        return AppModule;
      });
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/platform-browser */
      "jhN1");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./app-routing.module */
      "vY5A");
      /* harmony import */


      var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./app.component */
      "Sy1n");
      /* harmony import */


      var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ./dashboard/dashboard.component */
      "QX6l");

      var AppModule = function AppModule() {
        _classCallCheck(this, AppModule);
      };

      AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
        type: AppModule,
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
      });
      AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
        factory: function AppModule_Factory(t) {
          return new (t || AppModule)();
        },
        providers: [],
        imports: [[_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"]]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, {
          declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"], _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_4__["DashboardComponent"]],
          imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"]]
        });
      })();
      /*@__PURE__*/


      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
          args: [{
            declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"], _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_4__["DashboardComponent"]],
            schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["CUSTOM_ELEMENTS_SCHEMA"]],
            imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"]],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
          }]
        }], null, null);
      })();
      /***/

    },

    /***/
    "vY5A":
    /*!***************************************!*\
      !*** ./src/app/app-routing.module.ts ***!
      \***************************************/

    /*! exports provided: AppRoutingModule */

    /***/
    function vY5A(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function () {
        return AppRoutingModule;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");

      var routes = [];

      var AppRoutingModule = function AppRoutingModule() {
        _classCallCheck(this, AppRoutingModule);
      };

      AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
        type: AppRoutingModule
      });
      AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
        factory: function AppRoutingModule_Factory(t) {
          return new (t || AppRoutingModule)();
        },
        imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, {
          imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
          exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        });
      })();
      /*@__PURE__*/


      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
          args: [{
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
          }]
        }], null, null);
      })();
      /***/

    },

    /***/
    "zUnb":
    /*!*********************!*\
      !*** ./src/main.ts ***!
      \*********************/

    /*! no exports provided */

    /***/
    function zUnb(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./environments/environment */
      "AytR");
      /* harmony import */


      var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./app/app.module */
      "ZAI4");
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/platform-browser */
      "jhN1");

      if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
      }

      _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])["catch"](function (err) {
        return console.error(err);
      });
      /***/

    },

    /***/
    "zn8P":
    /*!******************************************************!*\
      !*** ./$$_lazy_route_resource lazy namespace object ***!
      \******************************************************/

    /*! no static exports found */

    /***/
    function zn8P(module, exports) {
      function webpackEmptyAsyncContext(req) {
        // Here Promise.resolve().then() is used instead of new Promise() to prevent
        // uncaught exception popping up in devtools
        return Promise.resolve().then(function () {
          var e = new Error("Cannot find module '" + req + "'");
          e.code = 'MODULE_NOT_FOUND';
          throw e;
        });
      }

      webpackEmptyAsyncContext.keys = function () {
        return [];
      };

      webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
      module.exports = webpackEmptyAsyncContext;
      webpackEmptyAsyncContext.id = "zn8P";
      /***/
    }
  }, [[0, "runtime", "vendor"]]]);
})();
//# sourceMappingURL=main-es5.js.map
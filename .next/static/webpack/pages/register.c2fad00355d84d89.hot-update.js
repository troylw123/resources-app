"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/register",{

/***/ "./pages/register.js":
/*!***************************!*\
  !*** ./pages/register.js ***!
  \***************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Layout */ \"./components/Layout.js\");\nvar _this = undefined;\n\nvar _s = $RefreshSig$();\n\n\nvar Register = function() {\n    _s();\n    var ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({\n        name: \"\",\n        email: \"\",\n        password: \"\",\n        error: \"\",\n        success: \"\",\n        buttonText: \"Register\"\n    }), state = ref[0], setState = ref[1];\n    var registerForm = function() {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"form-group\",\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                        onChange: handleChange(\"name\"),\n                        type: \"text\",\n                        className: \"form-control\",\n                        placeholder: \"Full Name\"\n                    }, void 0, false, {\n                        fileName: \"D:\\\\DMI Training\\\\MERN\\\\resources-app\\\\pages\\\\register.js\",\n                        lineNumber: 17,\n                        columnNumber: 9\n                    }, _this)\n                }, void 0, false, {\n                    fileName: \"D:\\\\DMI Training\\\\MERN\\\\resources-app\\\\pages\\\\register.js\",\n                    lineNumber: 16,\n                    columnNumber: 7\n                }, _this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"form-group\",\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                        onChange: handleChange(\"email\"),\n                        type: \"email\",\n                        className: \"form-control\",\n                        placeholder: \"Email Address\"\n                    }, void 0, false, {\n                        fileName: \"D:\\\\DMI Training\\\\MERN\\\\resources-app\\\\pages\\\\register.js\",\n                        lineNumber: 25,\n                        columnNumber: 9\n                    }, _this)\n                }, void 0, false, {\n                    fileName: \"D:\\\\DMI Training\\\\MERN\\\\resources-app\\\\pages\\\\register.js\",\n                    lineNumber: 24,\n                    columnNumber: 7\n                }, _this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"form-group\",\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                        onChange: handleChange(\"password\"),\n                        type: \"password\",\n                        className: \"form-control\",\n                        placeholder: \"Password\"\n                    }, void 0, false, {\n                        fileName: \"D:\\\\DMI Training\\\\MERN\\\\resources-app\\\\pages\\\\register.js\",\n                        lineNumber: 33,\n                        columnNumber: 9\n                    }, _this)\n                }, void 0, false, {\n                    fileName: \"D:\\\\DMI Training\\\\MERN\\\\resources-app\\\\pages\\\\register.js\",\n                    lineNumber: 32,\n                    columnNumber: 7\n                }, _this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"form-group\",\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        className: \"btn btn-outline-warning\",\n                        children: \"Register\"\n                    }, void 0, false, {\n                        fileName: \"D:\\\\DMI Training\\\\MERN\\\\resources-app\\\\pages\\\\register.js\",\n                        lineNumber: 41,\n                        columnNumber: 9\n                    }, _this)\n                }, void 0, false, {\n                    fileName: \"D:\\\\DMI Training\\\\MERN\\\\resources-app\\\\pages\\\\register.js\",\n                    lineNumber: 40,\n                    columnNumber: 7\n                }, _this)\n            ]\n        }, void 0, true, {\n            fileName: \"D:\\\\DMI Training\\\\MERN\\\\resources-app\\\\pages\\\\register.js\",\n            lineNumber: 15,\n            columnNumber: 5\n        }, _this);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Layout__WEBPACK_IMPORTED_MODULE_2__.Layout, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"col-md-4 offset-md-3\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                    children: \"Register\"\n                }, void 0, false, {\n                    fileName: \"D:\\\\DMI Training\\\\MERN\\\\resources-app\\\\pages\\\\register.js\",\n                    lineNumber: 49,\n                    columnNumber: 9\n                }, _this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                    fileName: \"D:\\\\DMI Training\\\\MERN\\\\resources-app\\\\pages\\\\register.js\",\n                    lineNumber: 50,\n                    columnNumber: 9\n                }, _this),\n                registerForm()\n            ]\n        }, void 0, true, {\n            fileName: \"D:\\\\DMI Training\\\\MERN\\\\resources-app\\\\pages\\\\register.js\",\n            lineNumber: 48,\n            columnNumber: 7\n        }, _this)\n    }, void 0, false, {\n        fileName: \"D:\\\\DMI Training\\\\MERN\\\\resources-app\\\\pages\\\\register.js\",\n        lineNumber: 47,\n        columnNumber: 5\n    }, _this);\n};\n_s(Register, \"CnW7kGcC/nDF4zHxBn3ZbN2zcgA=\");\n_c = Register;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Register);\nvar _c;\n$RefreshReg$(_c, \"Register\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9yZWdpc3Rlci5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7O0FBQXdDO0FBQ007QUFFOUMsSUFBTUcsUUFBUSxHQUFHLFdBQU07O0lBQ3JCLElBQTBCRixHQU94QixHQVB3QkEsK0NBQVEsQ0FBQztRQUNqQ0csSUFBSSxFQUFFLEVBQUU7UUFDUkMsS0FBSyxFQUFFLEVBQUU7UUFDVEMsUUFBUSxFQUFFLEVBQUU7UUFDWkMsS0FBSyxFQUFFLEVBQUU7UUFDVEMsT0FBTyxFQUFFLEVBQUU7UUFDWEMsVUFBVSxFQUFFLFVBQVU7S0FDdkIsQ0FBQyxFQVBLQyxLQUFLLEdBQWNULEdBT3hCLEdBUFUsRUFBRVUsUUFBUSxHQUFJVixHQU94QixHQVBvQjtJQVN0QixJQUFNVyxZQUFZLEdBQUc7NkJBQ25CLDhEQUFDQyxNQUFJOzs4QkFDSCw4REFBQ0MsS0FBRztvQkFBQ0MsU0FBUyxFQUFDLFlBQVk7OEJBQ3pCLDRFQUFDQyxPQUFLO3dCQUNKQyxRQUFRLEVBQUVDLFlBQVksQ0FBQyxNQUFNLENBQUM7d0JBQzlCQyxJQUFJLEVBQUMsTUFBTTt3QkFDWEosU0FBUyxFQUFDLGNBQWM7d0JBQ3hCSyxXQUFXLEVBQUMsV0FBVzs7Ozs7NkJBQ3ZCOzs7Ozt5QkFDRTs4QkFDTiw4REFBQ04sS0FBRztvQkFBQ0MsU0FBUyxFQUFDLFlBQVk7OEJBQ3pCLDRFQUFDQyxPQUFLO3dCQUNKQyxRQUFRLEVBQUVDLFlBQVksQ0FBQyxPQUFPLENBQUM7d0JBQy9CQyxJQUFJLEVBQUMsT0FBTzt3QkFDWkosU0FBUyxFQUFDLGNBQWM7d0JBQ3hCSyxXQUFXLEVBQUMsZUFBZTs7Ozs7NkJBQzNCOzs7Ozt5QkFDRTs4QkFDTiw4REFBQ04sS0FBRztvQkFBQ0MsU0FBUyxFQUFDLFlBQVk7OEJBQ3pCLDRFQUFDQyxPQUFLO3dCQUNKQyxRQUFRLEVBQUVDLFlBQVksQ0FBQyxVQUFVLENBQUM7d0JBQ2xDQyxJQUFJLEVBQUMsVUFBVTt3QkFDZkosU0FBUyxFQUFDLGNBQWM7d0JBQ3hCSyxXQUFXLEVBQUMsVUFBVTs7Ozs7NkJBQ3RCOzs7Ozt5QkFDRTs4QkFDTiw4REFBQ04sS0FBRztvQkFBQ0MsU0FBUyxFQUFDLFlBQVk7OEJBQ3pCLDRFQUFDTSxRQUFNO3dCQUFDTixTQUFTLEVBQUMseUJBQXlCO2tDQUFDLFVBQVE7Ozs7OzZCQUFTOzs7Ozt5QkFDekQ7Ozs7OztpQkFDRDtLQUNSO0lBRUQscUJBQ0UsOERBQUNiLHNEQUFNO2tCQUNMLDRFQUFDWSxLQUFHO1lBQUNDLFNBQVMsRUFBQyxzQkFBc0I7OzhCQUNuQyw4REFBQ08sSUFBRTs4QkFBQyxVQUFROzs7Ozt5QkFBSzs4QkFDakIsOERBQUNDLElBQUU7Ozs7eUJBQUc7Z0JBQ0xYLFlBQVksRUFBRTs7Ozs7O2lCQUNYOzs7OzthQUNDLENBQ1Q7QUFDSixDQUFDO0dBbkRLVCxRQUFRO0FBQVJBLEtBQUFBLFFBQVE7QUFxRGQsK0RBQWVBLFFBQVEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9wYWdlcy9yZWdpc3Rlci5qcz9hMDk3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBMYXlvdXQgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9MYXlvdXRcIjtcclxuXHJcbmNvbnN0IFJlZ2lzdGVyID0gKCkgPT4ge1xyXG4gIGNvbnN0IFtzdGF0ZSwgc2V0U3RhdGVdID0gdXNlU3RhdGUoe1xyXG4gICAgbmFtZTogXCJcIixcclxuICAgIGVtYWlsOiBcIlwiLFxyXG4gICAgcGFzc3dvcmQ6IFwiXCIsXHJcbiAgICBlcnJvcjogXCJcIixcclxuICAgIHN1Y2Nlc3M6IFwiXCIsXHJcbiAgICBidXR0b25UZXh0OiBcIlJlZ2lzdGVyXCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHJlZ2lzdGVyRm9ybSA9ICgpID0+IChcclxuICAgIDxmb3JtPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICA8aW5wdXRcclxuICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVDaGFuZ2UoXCJuYW1lXCIpfVxyXG4gICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcclxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRnVsbCBOYW1lXCJcclxuICAgICAgICAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlKFwiZW1haWxcIil9XHJcbiAgICAgICAgICB0eXBlPVwiZW1haWxcIlxyXG4gICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcclxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW1haWwgQWRkcmVzc1wiXHJcbiAgICAgICAgLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZShcInBhc3N3b3JkXCIpfVxyXG4gICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCJcclxuICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXHJcbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIlBhc3N3b3JkXCJcclxuICAgICAgICAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLW91dGxpbmUtd2FybmluZ1wiPlJlZ2lzdGVyPC9idXR0b24+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9mb3JtPlxyXG4gICk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8TGF5b3V0PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC00IG9mZnNldC1tZC0zXCI+XHJcbiAgICAgICAgPGgxPlJlZ2lzdGVyPC9oMT5cclxuICAgICAgICA8YnIgLz5cclxuICAgICAgICB7cmVnaXN0ZXJGb3JtKCl9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9MYXlvdXQ+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJlZ2lzdGVyO1xyXG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsIkxheW91dCIsIlJlZ2lzdGVyIiwibmFtZSIsImVtYWlsIiwicGFzc3dvcmQiLCJlcnJvciIsInN1Y2Nlc3MiLCJidXR0b25UZXh0Iiwic3RhdGUiLCJzZXRTdGF0ZSIsInJlZ2lzdGVyRm9ybSIsImZvcm0iLCJkaXYiLCJjbGFzc05hbWUiLCJpbnB1dCIsIm9uQ2hhbmdlIiwiaGFuZGxlQ2hhbmdlIiwidHlwZSIsInBsYWNlaG9sZGVyIiwiYnV0dG9uIiwiaDEiLCJiciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/register.js\n"));

/***/ })

});
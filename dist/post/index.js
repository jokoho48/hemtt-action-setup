/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 896:
/***/ ((module) => {

module.exports = require("fs");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __nccwpck_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@actions/core'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const fs_1 = __nccwpck_require__(896);
const annotate = (0, core_1.getInput)('annotate') !== 'false';
const file = '.hemttout/ci_annotations.txt';
function run() {
    if (!annotate)
        return;
    (0, core_1.info)('Annotating build.');
    if (!(0, fs_1.existsSync)(file)) {
        (0, core_1.info)('No annotations file found.');
        return;
    }
    const data = (0, fs_1.readFileSync)(file, 'utf8');
    const lines = data.split('\n');
    const annotations = lines.filter(line => line.length > 0).map(parseAnnotation);
    (0, core_1.info)(`Found ${annotations.length} annotations.`);
    for (const annotation of annotations) {
        switch (annotation.level) {
            case 'error':
                (0, core_1.error)(annotation.message, annotationParams(annotation));
                break;
            case 'warning':
                (0, core_1.warning)(annotation.message, annotationParams(annotation));
                break;
            default:
                (0, core_1.notice)(annotation.message, annotationParams(annotation));
                break;
        }
    }
}
function parseAnnotation(line) {
    const parts = line.split('||');
    return {
        start_line: parseInt(parts[0]),
        end_line: parseInt(parts[1]),
        start_column: parseInt(parts[2]),
        end_column: parseInt(parts[3]),
        level: parts[4],
        title: parts[5],
        message: parts[6],
        path: parts[7]
    };
}
function annotationParams(annotation) {
    const props = {
        file: annotation.path,
        title: annotation.title,
        startLine: annotation.start_line,
        endLine: annotation.end_line
    };
    if (annotation.start_line === annotation.end_line) {
        props.startColumn = annotation.start_column;
        props.endColumn = annotation.end_column;
    }
    return props;
}
run();

})();

module.exports = __webpack_exports__;
/******/ })()
;
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('src')) :
	typeof define === 'function' && define.amd ? define(['exports', 'src'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.RbtUseHttp = {}, global.src));
})(this, (function (exports, src) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	function _interopNamespace(e) {
		if (e && e.__esModule) return e;
		var n = Object.create(null);
		if (e) {
			Object.keys(e).forEach(function (k) {
				if (k !== 'default') {
					var d = Object.getOwnPropertyDescriptor(e, k);
					Object.defineProperty(n, k, d.get ? d : {
						enumerable: true,
						get: function () { return e[k]; }
					});
				}
			});
		}
		n["default"] = e;
		return Object.freeze(n);
	}

	var src__default = /*#__PURE__*/_interopDefaultLegacy(src);
	var src__namespace = /*#__PURE__*/_interopNamespace(src);



	Object.defineProperty(exports, 'HttpService', {
		enumerable: true,
		get: function () { return src__default["default"]; }
	});
	exports.useHttp = src__namespace;

	Object.defineProperty(exports, '__esModule', { value: true });

}));

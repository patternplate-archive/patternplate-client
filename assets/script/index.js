'use strict';

require('babel-core/polyfill');

var _applicationReactRoutes = require('../../application/react-routes');

function start() {
	var supportsSVG, data;
	return regeneratorRuntime.async(function start$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				supportsSVG = document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1');

				document.documentElement.classList.toggle('supports-svg', supportsSVG);

				data = JSON.parse(document.querySelector('[data-application-state]').textContent);
				context$1$0.next = 5;
				return _applicationReactRoutes.client(data, document.querySelector('[data-application]'));

			case 5:
			case 'end':
				return context$1$0.stop();
		}
	}, null, this);
}

start();
import 'dom4';
import 'web-animations-js';
import assign from 'object-assign';
import Promise from 'es6-promise';

if (!global.Promise) {
	global.Promise = Promise;
}

if (!Object.assign) {
	Object.assign = assign;
}

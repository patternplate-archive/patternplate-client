import base from './base';
import depth from './depth';
import highlights from './highlights';
import messages from './messages';
import patterns from './patterns';
import time from './time';

const ident = (state = {}) => state;

export default {
	base,
	config: ident,
	depth,
	highlights,
	messages,
	navigation: ident,
	patterns,
	schema: ident,
	time
};

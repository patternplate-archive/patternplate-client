import base from './base';
import depth from './depth';
import messages from './messages';
import patterns from './patterns';
import time from './time';

const ident = (state = {}) => state;

export default {
	base,
	config: ident,
	depth,
	messages,
	navigation: ident,
	patterns,
	schema: ident,
	time
};

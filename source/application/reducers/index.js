import activeBlock from './active-block';
import base from './base';
import depth from './depth';
import environment from './environment';
import expanded from './expanded';
import highlights from './highlights';
import id from './id';
import messages from './messages';
import patterns from './patterns';
import search from './search';
import searchMatches from './search-matches';
import sourceExpanded from './source-expanded';
import sourceId from './source-id';
import theme from './theme';
import time from './time';

const ident = (state = {}) => state;

export default {
	activeBlock,
	base,
	config: ident,
	depth,
	environment,
	expanded,
	highlights,
	id,
	messages,
	navigation: ident,
	patterns,
	schema: ident,
	search,
	searchMatches,
	sourceExpanded,
	sourceId,
	theme,
	time
};

export const dependencies = {
	searchMatches: ['expanded', 'navigation']
};

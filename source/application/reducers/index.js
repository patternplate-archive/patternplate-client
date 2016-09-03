import activeBlock from './active-block';
import base from './base';
import depth from './depth';
import environment from './environment';
import expanded from './expanded';
import highlights from './highlights';
import id from './id';
import issue from './issue';
import lightbox from './lightbox';
import menuEnabled from './menu-enabled';
import messages from './messages';
import navigation from './navigation';
import opacity from './opacity';
import pattern from './pattern';
import search from './search';
import searchMatches from './search-matches';
import sourceExpanded from './source-expanded';
import sourceId from './source-id';
import sourceType from './source-type';
import styles from './styles';
import theme from './theme';

const ident = (state = {}) => state;
const getDependencies = (reducer = {}) => reducer.dependencies || [];

export default {
	activeBlock,
	base,
	config: ident,
	depth,
	environment,
	expanded,
	highlights,
	id,
	issue,
	lightbox,
	menuEnabled,
	messages,
	navigation,
	opacity,
	pattern,
	schema: ident,
	search,
	searchMatches,
	sourceExpanded,
	sourceId,
	sourceType,
	styles,
	theme
};

export const dependencies = {
	pattern: getDependencies(pattern),
	searchMatches: getDependencies(searchMatches),
	styles: getDependencies(styles)
};

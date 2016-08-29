import activeBlock from './active-block';
import base from './base';
import depth from './depth';
import environment from './environment';
import expanded from './expanded';
import highlights from './highlights';
import id from './id';
import menuEnabled from './menu-enabled';
import messages from './messages';
import navigation from './navigation';
import pattern from './pattern';
import search from './search';
import searchMatches from './search-matches';
import sourceExpanded from './source-expanded';
import sourceId from './source-id';
import sourceType from './source-type';
import styles from './styles';
import theme from './theme';
import time from './time';

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
	menuEnabled,
	messages,
	navigation,
	pattern,
	schema: ident,
	search,
	searchMatches,
	sourceExpanded,
	sourceId,
	sourceType,
	styles,
	theme,
	time
};

export const dependencies = {
	searchMatches: getDependencies(searchMatches),
	styles: getDependencies(styles)
};

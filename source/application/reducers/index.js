import activeBlock from './active-block';
import base from './base';
import depth from './depth';
import demoContentDimensions from './demo-content-dimensions';
import demoDimensions from './demo-dimensions';
import environment from './environment';
import expanded from './expanded';
import id from './id';
import issue from './issue';
import lightbox from './lightbox';
import menuEnabled from './menu-enabled';
import messages from './messages';
import navigation from './navigation';
import opacity from './opacity';
import pattern from './pattern';
import rulers from './rulers';
import search from './search';
import searchMatches from './search-matches';
import scrollDemoX from './scroll-demo-x';
import scrollDemoY from './scroll-demo-y';
import sourceExpanded from './source-expanded';
import sourceId from './source-id';
import sourceType from './source-type';
import styles from './styles';
import theme from './theme';
import hide from './hide';
import window from './window';

const ident = (state = {}) => state;
const getDependencies = (reducer = {}) => reducer.dependencies || [];

export default {
	activeBlock,
	base,
	config: ident,
	demoContentDimensions,
	demoDimensions,
	depth,
	environment,
	expanded,
	hide,
	id,
	issue,
	lightbox,
	menuEnabled,
	messages,
	navigation,
	opacity,
	pattern,
	rulers,
	schema: ident,
	scrollDemoX,
	scrollDemoY,
	search,
	searchMatches,
	sourceExpanded,
	sourceId,
	sourceType,
	startBase: ident,
	styles,
	theme,
	window
};

export const dependencies = {
	pattern: getDependencies(pattern),
	searchMatches: getDependencies(searchMatches),
	styles: getDependencies(styles),
	scrollDemoY: getDependencies(scrollDemoY),
	scrollDemoX: getDependencies(scrollDemoX)
};

import activeBlock from './active-block';
import base from './base';
import connection from './connection';
import depth from './depth';
import demoContentDimensions from './demo-content-dimensions';
import demoDimensions from './demo-dimensions';
import doc from './doc';
import environment from './environment';
import expanded from './expanded';
import fetching from './fetching';
import id from './id';
import issue from './issue';
import lightbox from './lightbox';
import messages from './messages';
import navigation from './navigation';
import navigationEnabled from './navigation-enabled';
import opacity from './opacity';
import pattern from './pattern';
import rulers from './rulers';
import search from './search';
import searchEnabled from './search-enabled';
import searchPreview from './search-preview';
import scrollDemoX from './scroll-demo-x';
import scrollDemoY from './scroll-demo-y';
import schema from './schema';
import shortcuts from './shortcuts';
import sourceExpanded from './source-expanded';
import sourceId from './source-id';
import sourceType from './source-type';
import sources from './sources';
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
	connection,
	demoContentDimensions,
	demoDimensions,
	depth,
	doc,
	environment,
	expanded,
	fetching,
	hide,
	id,
	issue,
	lightbox,
	messages,
	navigation,
	navigationEnabled,
	opacity,
	pattern,
	rulers,
	schema,
	scrollDemoX,
	scrollDemoY,
	search,
	searchEnabled,
	searchPreview,
	shortcuts,
	sourceExpanded,
	sourceId,
	sourceType,
	sources,
	startBase: ident,
	styles,
	theme,
	window
};

export const dependencies = {
	connection: getDependencies(connection),
	pattern: getDependencies(pattern),
	styles: getDependencies(styles),
	scrollDemoY: getDependencies(scrollDemoY),
	scrollDemoX: getDependencies(scrollDemoX)
};

import activeBlock from './active-block';
import base from './base';
import codeEnabled from './code-enabled';
import connection from './connection';
import depth from './depth';
import demoContentDimensions from './demo-content-dimensions';
import demoDimensions from './demo-dimensions';
import demoDependenciesEnabled from './demo-dependencies-enabled';
import demoDependentsEnabled from './demo-dependents-enabled';
import dependenciesEnabled from './dependencies-enabled';
import dependentsEnabled from './dependents-enabled';
import environment from './environment';
import expanded from './expanded';
import fetching from './fetching';
import id from './id';
import infoEnabled from './info-enabled';
import lightbox from './lightbox';
import manifestEnabled from './manifest-enabled';
import messages from './messages';
import mountEnabled from './mount-enabled';
import navigationEnabled from './navigation-enabled';
import opacity from './opacity';
import pattern from './pattern';
import rulers from './rulers';
import search from './search';
import searchEnabled from './search-enabled';
import searchPreview from './search-preview';
import searchValue from './search-value';
import scrollDemoX from './scroll-demo-x';
import scrollDemoY from './scroll-demo-y';
import schema from './schema';
import shortcuts from './shortcuts';
import sourceExpanded from './source-expanded';
import sourceId from './source-id';
import sourceType from './source-type';
import sources from './sources';
import theme from './theme';
import hideEnabled from './hide-enabled';
import window from './window';

const ident = (state = {}) => state;
const getDependencies = (reducer = {}) => reducer.dependencies || [];

export default {
	activeBlock,
	base,
	codeEnabled,
	config: ident,
	connection,
	demoContentDimensions,
	demoDimensions,
	demoDependenciesEnabled,
	demoDependentsEnabled,
	dependenciesEnabled,
	dependentsEnabled,
	depth,
	environment,
	expanded,
	fetching,
	hideEnabled,
	id,
	infoEnabled,
	lightbox,
	manifestEnabled,
	messages,
	mountEnabled,
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
	searchValue,
	shortcuts,
	sourceExpanded,
	sourceId,
	sourceType,
	sources,
	startBase: ident,
	theme,
	window
};

export const dependencies = {
	connection: getDependencies(connection),
	pattern: getDependencies(pattern),
	scrollDemoY: getDependencies(scrollDemoY),
	scrollDemoX: getDependencies(scrollDemoX)
};

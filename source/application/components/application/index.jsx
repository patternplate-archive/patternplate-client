import React, {PropTypes as t} from 'react';
import join from 'classnames';
import Helmet from 'react-helmet';

import BreadCrumbs from '../bread-crumbs';
import ConsoleLightbox from '../../containers/console';
import ProblemLightbox from '../../containers/problem';
import Navigation from '../navigation';
import Toolbar from '../toolbar';

export default Application;

function Application(props) {
	const handleSearch = props.onSearch;

	const className = join('application', {
		'application--menu-enabled': props.menuEnabled,
		'application--theme-loading': props.themeLoading
	});

	return (
		<div className={className}>
			<Helmet
				meta={[
					{
						name: 'description',
						content: props.description
					}
				]}
				link={createLinks(props.styles, {base: props.base})}
				title={props.title}
				onChangeClientState={getThemeLoadedListener(props.onThemeLoaded)}
				/>
			<Toolbar
				about={props.about}
				base={props.base}
				icon="patternplate"
				location={props.location}
				menuEnabled={props.menuEnabled}
				onThemeChange={props.onThemeChange}
				pathname={props.pathname}
				query={props.query}
				theme={props.theme}
				title={props.title}
				version={props.version}
				/>
			<Navigation
				activePattern={props.activePattern}
				base={props.base}
				expanded={props.expanded}
				enabled={props.menuEnabled}
				hierarchy={props.hierarchy}
				navigation={props.navigation}
				onSearch={handleSearch}
				path={props.path}
				pathname={props.pathname}
				query={props.query}
				location={props.location}
				searchValue={props.search}
				/>
			<main className="application__content">
				{
					props.breadcrumbs.length > 0 &&
						<BreadCrumbs
							base={props.base}
							crumbs={props.breadcrumbs}
							location={props.location}
							/>
				}
				{props.children}
			</main>
			{
				props.lightbox === 'console' &&
					<ConsoleLightbox/>
			}
			{
				props.issue &&
					<ProblemLightbox/>
			}
		</div>
	);
}

Application.propTypes = {
	activePattern: t.string.isRequired,
	about: t.arrayOf(t.shape({
		label: t.string,
		value: t.string
	})).isRequired,
	base: t.string.isRequired,
	breadcrumbs: t.arrayOf(t.shape({
		id: t.string.isRequired,
		name: t.string.isRequired,
		target: t.shape({
			pathname: t.string.isRequired,
			query: t.object.isRequired
		}).isRequired
	})),
	children: t.any,
	description: t.string.isRequired,
	expanded: t.bool.isRequired,
	hierarchy: t.object.isRequired,
	issue: t.bool.isRequired,
	location: t.shape({
		pathname: t.string.isRequired,
		query: t.object.isRequired
	}).isRequired,
	lightbox: t.string,
	menuEnabled: t.bool.isRequired,
	navigation: t.object.isRequired,
	onSearch: t.func.isRequired,
	onThemeLoaded: t.func.isRequired,
	onThemeChange: t.func.isRequired,
	path: t.string.isRequired,
	pathname: t.string.isRequired,
	query: t.object.isRequired,
	theme: t.string.isRequired,
	title: t.string.isRequired,
	version: t.string.isRequired,
	search: t.string,
	styles: t.arrayOf(t.string).isRequired,
	themeLoading: t.bool.isRequired
};

function createLinks(styles, options) {
	return styles.map(createStyle(options));
}

function createStyle(options) {
	return style => {
		return {
			'rel': 'stylesheet',
			'href': `${options.base}style/${style}.css`,
			'data-style-id': style
		};
	};
}

function getThemeLoadedListener(fn) {
	return (...args) => {
		const [, {linkTags: added = []}] = args;
		const tags = added.filter(tag => tag.rel === 'stylesheet');
		const tag = tags[tags.length - 1];
		if (tag) {
			tag.onload = () => {
				fn(tag.dataset.styleId);
			};
		}
	};
}

import React, {Component, PropTypes as t} from 'react';
import autobind from 'autobind-decorator';
import join from 'classnames';
import Helmet from 'react-helmet';

import ConsoleLightbox from '../../containers/console';
import ProblemLightbox from '../../containers/problem';
import ShortcutsLightbox from '../../containers/shortcuts';
import Navigation from '../navigation';

@autobind
export default class Application extends Component {
	componentDidMount() {
		global.addEventListener('resize', this.onResize);
	}

	componentWillUnmount() {
		global.removeEventListener('resize', this.onResize);
	}

	onResize() {
		this.props.onResize({
			width: global.innerWidth,
			height: global.innerHeight
		});
	}

	render() {
		const {props} = this;
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
						},
						{
							name: 'viewport',
							content: 'width=device-width, initial-scale=1'
						}
					]}
					link={createLinks(props.styles)}
					title={props.title}
					onChangeClientState={getThemeLoadedListener(props.onThemeLoaded)}
					/>
				<Navigation
					activePattern={props.activePattern}
					base={props.base}
					enabled={props.menuEnabled}
					expanded={props.expanded}
					hierarchy={props.hierarchy}
					hide={props.hide}
					icon={props.logo}
					menuEnabled={props.menuEnabled}
					navigation={props.navigation}
					onSearch={handleSearch}
					onThemeChange={props.onThemeChange}
					pathname={props.pathname}
					query={props.query}
					requestSearchBlur={props.requestSearchBlur}
					searchValue={props.search}
					theme={props.theme}
					title={props.title}
					version={props.version}
					/>
				<main className="application__content">
					{props.children}
				</main>
				{
					props.lightbox === 'console' &&
						<ConsoleLightbox/>
				}
				{
					props.lightbox === 'shortcuts' &&
						<ShortcutsLightbox/>
				}
				{
					props.issue &&
						<ProblemLightbox/>
				}
			</div>
		);
	}
}

Application.propTypes = {
	activePattern: t.string.isRequired,
	base: t.string.isRequired,
	children: t.any,
	description: t.string.isRequired,
	expanded: t.bool.isRequired,
	hierarchy: t.object.isRequired,
	hide: t.bool.isRequired,
	issue: t.bool.isRequired,
	lightbox: t.string,
	logo: t.string.isRequired,
	menuEnabled: t.bool.isRequired,
	navigation: t.object.isRequired,
	onResize: t.func.isRequired,
	onSearch: t.func.isRequired,
	onThemeLoaded: t.func.isRequired,
	onThemeChange: t.func.isRequired,
	pathname: t.string.isRequired,
	query: t.object.isRequired,
	requestSearchBlur: t.func.isRequired,
	theme: t.string.isRequired,
	title: t.string.isRequired,
	version: t.string.isRequired,
	search: t.string,
	styles: t.arrayOf(t.string).isRequired,
	themeLoading: t.bool.isRequired
};

function createLinks(styles) {
	return styles.map(createStyle());
}

function createStyle() {
	return style => {
		return {
			'rel': 'stylesheet',
			'href': `/style/${style}.css`,
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

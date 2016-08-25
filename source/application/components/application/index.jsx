import React, {PropTypes as t} from 'react';
import join from 'classnames';
import Helmet from 'react-helmet';
import Toolbar from '../toolbar';
import Navigation from '../navigation';

export default Application;

function Application(props) {
	const handleSearch = props.onSearch;

	const className = join('application', {
		'application--menu-enabled': props.menuEnabled
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
				link={[
					{
						rel: 'stylesheet',
						href: `/style/${props.theme}.css`
					}
				]}
				title={props.title}
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
			{props.children}
		</div>
	);
}

Application.propTypes = {
	about: t.arrayOf(t.shape({
		label: t.string,
		value: t.string
	})).isRequired,
	base: t.string.isRequired,
	children: t.any,
	description: t.string.isRequired,
	expanded: t.bool.isRequired,
	hierarchy: t.object.isRequired,
	location: t.shape({
		pathname: t.string.isRequired,
		query: t.object.isRequired
	}).isRequired,
	menuEnabled: t.bool.isRequired,
	navigation: t.object.isRequired,
	onSearch: t.func.isRequired,
	onThemeChange: t.func.isRequired,
	path: t.string.isRequired,
	pathname: t.string.isRequired,
	query: t.object.isRequired,
	theme: t.string.isRequired,
	title: t.string.isRequired,
	version: t.string.isRequired,
	search: t.string
};

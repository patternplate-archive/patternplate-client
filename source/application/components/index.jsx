import React, {PropTypes as t} from 'react';
import Helmet from 'react-helmet';
import Toolbar from './toolbar';
import Navigation from './navigation';

export default Application;

function Application(props) {
	const handleSearch = props.onSearch;
	return (
		<div className="application">
			<Helmet
				meta={[
					{
						name: 'description',
						content: 'patternplate'
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
				onThemeChange={props.onThemeChange}
				query={props.query}
				theme={props.theme}
				title={props.title}
				version={props.version}
				/>
			<Navigation
				base={props.base}
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
	hierarchy: t.object.isRequired,
	location: t.shape({
		pathname: t.string.isRequired,
		query: t.object.isRequired
	}).isRequired,
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

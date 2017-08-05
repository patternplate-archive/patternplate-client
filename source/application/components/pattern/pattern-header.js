import React, {PropTypes as t} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import join from 'classnames';
import {noop} from 'lodash';

import * as actions from '../../actions';
import BreadCrumbs from '../bread-crumbs';
import Headline from '../common/headline';
import Icon from '../common/icon';
import urlQuery from '../../utils/url-query';

const autoMount = 'https://github.com/sinnerschrader/patternplate-transform-react-to-markup#component-auto-mounting';

const withWiring = Component => {
	const mapProps = state => {
		return {
			location: state.routing.locationBeforeTransitions,
			pattern: state.pattern,
			shortcuts: state.shortcuts
		};
	};
	const mapDispatch = dispatch => {
		return bindActionCreators({
			handleClick() {
				return actions.loadPattern({
					reloadTime: Date.now()
				});
			}
		}, dispatch);
	};
	return connect(mapProps, mapDispatch)(Component);
};

const Reload = withWiring(props => {
	const reloadTitle = `Reload demo for "${props.pattern.manifest.displayName}" ${props.shortcuts.reload.toString()}`;
	const reloadClassName = join(
		'button',
		'button--reload',
		{
			'reload--reloading': props.pattern.loading,
			'button--is-active': props.pattern.loading,
			'reload--error': props.errored
		}
	);
	return (
		<Link
			className={reloadClassName}
			title={reloadTitle}
			disabled={props.loading}
			onClick={props.loading ? noop : props.handleClick}
			to={{
				pathname: props.location.pathname,
				query: {
					...props.location.query,
					reload: props.pattern.reloadTime
				}
			}}
			>
			<Icon symbol="reload"/>
		</Link>
	);
});

Reload.propTypes = {
	loading: t.bool.isRequired,
	errored: t.bool.isRequired,
	onReloadClick: t.func.isRequired,
	location: t.object.isRequired,
	reloadTime: t.string.isRequired
};

export default function PatternHeader(props) {
	const flagClassName = join(`pattern__flag`, {
		[`pattern__flag--${props.flag}`]: props.flag
	});

	const fullscreen = urlQuery.format({
		pathname: `${props.base}demo/${props.id}/index.html`,
		query: {
			environment: props.environment
		}
	});
	const fullscreenTitle = `Open "${props.name}" in fullscreen ${props.shortcuts.openFullscreen}`;

	const rulersTitle = props.rulers ?
		`Disable rulers ${props.shortcuts.toggleRulers.toString()}` :
		`Enable rulers ${props.shortcuts.toggleRulers.toString()}`;

	const rulersClassName = join(
		`button button--rulers`,
		{
			'button--is-active': props.rulers
		}
	);

	const opacityClassName = join(
		'button button--opacity',
		{
			'button--is-active': props.opacity
		}
	);
	const opacitySymbol = props.opacity ? 'checkers' : 'checkers-inverted';
	const opacityTitle = props.opacity ?
		`Show opacity ${props.shortcuts.toggleOpacity.toString()}` :
		`Hide opacity ${props.shortcuts.toggleOpacity.toString()}`;

	return (
		<div className="pattern-header-container">
			<BreadCrumbs
				base={props.base}
				crumbs={props.breadcrumbs}
				location={props.location}
				className="pattern-path"
				/>
			<Headline className="pattern-header" order={2}>
				<span className="pattern-name">
					{props.name}
				</span>
				<small className="pattern-version">
					{props.version ? `v${props.version}` : ''}
				</small>
				{
					props.flag ?
						<small className={flagClassName}>
							<Link
								title={`Search patterns with flag ${props.flag}`}
								to={{
									pathname: props.location.pathname,
									query: {...props.location.query, search: `flag:${props.flag}`}
								}}
								>
								{props.flag}
							</Link>
						</small> :
						null
				}
				{props.tags.map((tag, key) =>
					<small key={key} className="pattern-tag">
						<Link
							title={`Search patterns with tag ${tag}`}
							to={{
								pathname: props.location.pathname,
								query: {...props.location.query, search: `tag:${tag}`}
							}}
							key={key}
							>
							{tag}
						</Link>
					</small>
				)}
				{
					props.automount &&
						<small className="pattern-option">
							<a
								href={autoMount}
								target="_blank"
								title="Learn about component auto mounting on Github"
								rel="noopener"
								>
								auto-mount
							</a>
						</small>
				}
			</Headline>
			<div className="pattern-header__actions">
				<Reload/>
				<Link
					className={rulersClassName}
					title={rulersTitle}
					to={{
						pathname: props.location.pathname,
						query: {
							...props.location.query,
							rulers: !props.rulers
						}
					}}
					>
					<Icon symbol="rulers"/>
				</Link>
				<Link
					className={opacityClassName}
					title={opacityTitle}
					to={{
						pathname: props.location.pathname,
						query: {
							...props.location.query,
							opacity: !props.opacity
						}
					}}
					>
					<Icon symbol={opacitySymbol}/>
				</Link>
				<a
					className="button fullscreen"
					target="_blank"
					rel="noopener"
					href={fullscreen}
					title={fullscreenTitle}
					>
					<Icon symbol="fullscreen"/>
				</a>
			</div>
		</div>
	);
}

PatternHeader.propTypes = {
	automount: t.bool.isRequired,
	base: t.string.isRequired,
	breadcrumbs: t.arrayOf(t.shape({
		id: t.string.isRequired,
		name: t.string.isRequired,
		target: t.shape({
			pathname: t.string.isRequired,
			query: t.object.isRequired
		}).isRequired
	})).isRequired,
	environment: t.string.isRequired,
	errored: t.bool.isRequired,
	flag: t.string,
	id: t.string.isRequired,
	loading: t.bool.isRequired,
	location: t.shape({
		pathname: t.string.isRequired,
		query: t.object.isRequired
	}),
	name: t.string.isRequired,
	onReloadClick: t.func.isRequired,
	opacity: t.bool.isRequired,
	reloadTime: t.number,
	reloadedTime: t.number,
	rulers: t.bool.isRequired,
	shortcuts: t.any.isRequired,
	tags: t.arrayOf(t.string),
	version: t.string.isRequired
};

PatternHeader.defaultProps = {
	tags: [],
	onReloadClick: noop
};

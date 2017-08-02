import React, {PropTypes as t} from 'react';
import {Link} from 'react-router';
import join from 'classnames';
import {noop} from 'lodash';

import BreadCrumbs from '../bread-crumbs';
import Headline from '../common/headline';
import Icon from '../common/icon';
import urlQuery from '../../utils/url-query';

const autoMount = 'https://github.com/sinnerschrader/patternplate-transform-react-to-markup#component-auto-mounting';

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
	const fullscreenTitle = `Open "${props.name}" in fullscreen [ctrl+f]`;

	const reloadTitle = `Reload demo for "${props.name}" [ctrl+r]`;
	const reloadClassName = join(
		'button',
		'button--reload',
		{
			'reload--reloading': props.loading,
			'button--is-active': props.loading,
			'reload--error': props.errored
		}
	);

	const rulersTitle = props.rulers ?
		`Disable rulers [ctrl+l]` :
		`Enable rulers [ctrl+l]`;

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
		'Hide opacity [ctrl+o]':
		'Show opacity [ctrl+o]';

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
				<Link
					className={reloadClassName}
					title={reloadTitle}
					disabled={props.loading}
					onClick={props.loading ? noop : props.onReloadClick}
					to={{
						pathname: props.location.pathname,
						query: {
							...props.location.query,
							reload: props.reloadTime
						}
					}}
					>
					<Icon symbol="reload"/>
				</Link>
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
	tags: t.arrayOf(t.string),
	version: t.string.isRequired
};

PatternHeader.defaultProps = {
	tags: [],
	onReloadClick: noop
};

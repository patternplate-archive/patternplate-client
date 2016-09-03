import React, {PropTypes as t} from 'react';
import {Link} from 'react-router';
import join from 'classnames';
import {noop} from 'lodash';

import Headline from '../common/headline';
import Icon from '../common/icon';
import urlQuery from '../../utils/url-query';

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

	const reloadClassName = join('button reload', {
		'reload--reloading': props.loading,
		'reload--error': props.errored
	});

	return (
		<div className="pattern-header-container">
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
				<div className="button">
					<Icon symbol="checkers"/>
				</div>
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
	base: t.string.isRequired,
	errored: t.bool.isRequired,
	environment: t.string.isRequired,
	id: t.string.isRequired,
	name: t.string.isRequired,
	version: t.string.isRequired,
	flag: t.string,
	tags: t.arrayOf(t.string),
	loading: t.bool.isRequired,
	reloadTime: t.number,
	reloadedTime: t.number,
	onReloadClick: t.func.isRequired,
	location: t.shape({
		pathname: t.string.isRequired,
		query: t.object.isRequired
	})
};

PatternHeader.defaultProps = {
	tags: [],
	onReloadClick: noop
};

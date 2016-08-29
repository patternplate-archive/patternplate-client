import React, {PropTypes as t} from 'react';
import {Link} from 'react-router';
import join from 'classnames';
import {noop} from 'lodash';

import Headline from '../common/headline';

export default function PatternHeader(props) {
	const {
		id,
		name,
		version,
		flag,
		tags,
		location,
		reloading,
		reloadTime
	} = props;

	const flagClassName = join(`pattern__flag`, {
		[`pattern__flag--${flag}`]: flag
	});

	const reloadTitle = `Reload "${name}" at ${id}`;

	return (
		<div className="pattern-header-container">
			<Headline className="pattern-header" order={2}>
				<span className="pattern-name">
					{name}
				</span>
				<small className="pattern-version">
					{version ? `v${version}` : ''}
				</small>
				{
					flag ?
						<small className={flagClassName}>
							<Link
								title={`Search patterns with flag ${flag}`}
								to={{
									pathname: location.pathname,
									query: {...location.query, search: `flag:${flag}`}
								}}
								>
								{flag}
							</Link>
						</small> :
						null
				}
				{tags.map((tag, key) =>
					<small key={key} className="pattern-tag">
						<Link
							title={`Search patterns with tag ${tag}`}
							to={{
								pathname: location.pathname,
								query: {...location.query, search: `tag:${tag}`}
							}}
							key={key}
							>
							{tag}
						</Link>
					</small>
				)}
			</Headline>
			<div className="pattern-haeder__actions">
				<Link
					className="button"
					title={reloadTitle}
					disabled={reloading}
					onClick={props.onReloadClick}
					to={{
						pathname: location.pathname,
						query: {
							...location.query,
							reload: reloadTime
						}
					}}
					>
					Reload
				</Link>
			</div>
		</div>
	);
}

PatternHeader.propTypes = {
	base: t.string.isRequired,
	id: t.string.isRequired,
	name: t.string.isRequired,
	version: t.string.isRequired,
	flag: t.string,
	tags: t.arrayOf(t.string),
	loading: t.bool.isRequired,
	reloading: t.bool.isRequired,
	reloadTime: t.number,
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

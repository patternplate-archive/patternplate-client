import React from 'react';
import {Link} from 'react-router';
import urlQuery from '../../../utils/url-query';
import Pattern from '../index';
import Icon from '../../common/icon';

import getAugmentedChildren from '../../../utils/augment-hierarchy';

export default function getPatternContent(type, data, properties) {
	const {location} = properties;
	const environment = urlQuery.parse(location.pathname).query.environment;

	if (type === 'pattern') {
		const patternData = Array.isArray(data) ?
			data[0] :
			data;

		return [
			patternData && <Pattern
				{...patternData}
				environment={environment}
				key={patternData.id}
				config={properties.config}
				location={properties.location}
				/>
		].filter(Boolean);
	}

	if (type === 'folder') {
		const {folders, patterns} = getAugmentedChildren(
			data.children,
			properties.config.hierarchy
		);

		const rows = Object.values(folders.concat(patterns)).map(child => {
			const {type, displayName, id, manifest = {}} = child;
			const {options = {}, tags = [], flag} = manifest;
			const {hidden = false} = options;

			if (hidden) {
				return null;
			}

			const splat = id;
			const patternLink = ['/pattern', splat].join('/');

			if (type === 'pattern') {
				return (
					<tr key={id}>
						<td>
							<Link
								to={{
									pathname: patternLink,
									query: location.query
								}}
								title={`Navigate to pattern ${splat}`}
								>
								<Icon symbol="pattern"/>
								{displayName}
							</Link>
						</td>
						<td>
							{child.manifest.version}
						</td>
						<td>
							{tags.map((tag, key) =>
								<Link
									to={{
										pathname: location.pathname,
										query: {...location.query, search: `tag:${tag}`}
									}}
									key={key}
									className="pattern-tag"
									title={`Search patterns with tag ${tag}`}
									>
									{tag}
								</Link>
							)}
						</td>
						<td>
							{
								flag &&
									<Link
										to={{
											pathname: location.pathname,
											query: {...location.query, search: `flag:${flag}`}
										}}
										title={`Search patterns with flag ${flag}`}
										className={`pattern__flag pattern__flag--${flag}`}
										>
										{flag}
									</Link>
							}
						</td>
						<td>
							<a
								href={`/demo/${id}`}
								target="_blank"
								title={`Show pattern ${id} in fullscreen`}
								rel="nofollow"
								>
								<Icon symbol="fullscreen"/>
								<span>Fullscreen</span>
							</a>
						</td>
					</tr>
				);
			}
			return (
				<tr key={id}>
					<td colSpan={5}>
						<Link
							to={{
								pathname: patternLink,
								query: location.query
							}}
							title={`Navigate to folder ${id}`}
							>
							<Icon symbol="folder"/>
							{displayName}
						</Link>
					</td>
				</tr>
			);
		});

		const up = data.id.split('/').slice(0, -1).join('/');
		const upLink = [`/pattern`, up].join('/');
		const nested = up.split('/').filter(Boolean).length > 0;

		return (
			<table className="pattern-folder">
				<tbody>
					{nested &&
						<tr key="up">
							<td colSpan={5}>
								<Link
									to={{
										pathname: upLink,
										query: location.query
									}}
									title={`Navigate up to ${upLink}`}
									>
									<Icon symbol="folder"/>
									..
								</Link>
							</td>
						</tr>
					}
					{rows}
				</tbody>
			</table>
		);
	}

	return null;
}

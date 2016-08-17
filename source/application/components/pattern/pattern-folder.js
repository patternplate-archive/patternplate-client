import React, {PropTypes as t} from 'react';
import {Link} from 'react-router';
import join from 'classnames';

import Icon from '../common/icon';

function ItemField(props) {
	const Component = props.component;
	const className = join('pattern-field', props.className, {
		[`pattern-field--${props.valueKey}`]: props.value
	});

	return (
		<Component className={className}>
			{props.children || props.value}
		</Component>
	);
}

ItemField.propTypes = {
	component: t.string.isRequired,
	valueKey: t.string.isRequired,
	value: t.any,
	className: t.string,
	children: t.any
};

ItemField.defaultProps = {
	component: 'div'
};

function PatternFolderItem(props) {
	const {name, type, id, location} = props;
	const to = {
		pathname: `/pattern/${id}`,
		query: location.query
	};

	const title = `Navigate to ${type} "${name}" at ${id}`;
	const href = `/demo/${id}`;

	return (
		<li className="pattern-item">
			<ItemField valueKey="name" value={props.name}>
				<Link to={to} title={title}>
					<Icon symbol={type}>{name}</Icon>
					<span>{props.name}</span>
				</Link>
			</ItemField>
			<ItemField valueKey="version" value={props.version}/>
			<ItemField valueKey="tags" value={props.tags}/>
			<ItemField valueKey="flag" value={props.flag}/>
			{
				props.type === 'pattern' ?
					<a
						href={href}
						target="_blank"
						rel="nofollow"
						className="pattern-field"
						title={`Open ${type} "${name}" at ${id} in fullscreen`}
						>
						<Icon symbol="fullscreen" description="Fullscreen">
							{`${id} in fullscreen`}
						</Icon>
					</a> :
					<div className="pattern-field"/>
			}
		</li>
	);
}

PatternFolderItem.propTypes = {
	id: t.string.isRequired,
	name: t.string.isRequired,
	type: t.string.isRequired,
	version: t.string,
	tags: t.array,
	flag: t.string,
	location: t.shape({
		pathname: t.string.isRequired,
		query: t.object.isRequired
	}).isRequired
};

export default function PatternFolder({items, location, up}) {
	return (
		<ul className="pattern-folder">
			<li className="pattern-folder-head">
				<div className="pattern-folder-head__cell"/>
				<div className="pattern-folder-head__cell">Version</div>
				<div className="pattern-folder-head__cell">Tags</div>
				<div className="pattern-folder-head__cell">Flag</div>
				<div className="pattern-folder-head__cell"/>
			</li>
			{
				up &&
					<PatternFolderItem
						id={up}
						name=".."
						type="folder"
						location={location}
						/>
			}
			{
				items.map(item => (
					<PatternFolderItem
						{...item}
						location={location}
						key={item.id}
						/>
				))
			}
		</ul>
	);
}

PatternFolder.propTypes = {
	items: t.arrayOf(t.shape(PatternFolderItem.propTypes)).isRequired,
	location: t.shape({
		pathname: t.string.isRequired,
		query: t.object.isRequired
	}).isRequired,
	up: t.string
};

PatternFolder.defaultProps = {
	items: []
};

import React, {PropTypes as t} from 'react';
import {Link} from '@marionebl/react-router';
import join from 'classnames';

import Icon from '../common/icon';

function ItemField(props) {
	const Component = props.component;
	const className = join('pattern-field', props.className, {
		[`pattern-field--${props.valueKey}`]: props.value
	});
	const children = props.children || props.value;

	return (
		<Component className={className}>
			{
				Array.isArray(children) ?
					children.map((c, i) => {
						return <span key={i}>{c}</span>;
					}) :
					children
			}
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
	const {name, type, id, location, base} = props;
	const to = {
		pathname: `${base}pattern/${id}`,
		query: location.query
	};

	const title = `Navigate to ${type} "${name}" at ${id}`;
	const href = `${base}demo/${id}`;

	return (
		<li className="pattern-item">
			<ItemField valueKey="name" value={props.name}>
				<Link to={to} title={title}>
					<Icon base={base} symbol={type}>{name}</Icon>
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
						<Icon base={base} symbol="fullscreen" description="Fullscreen">
							{`${id} in fullscreen`}
						</Icon>
					</a> :
					<div className="pattern-field"/>
			}
		</li>
	);
}

PatternFolderItem.propTypes = {
	base: t.string.isRequired,
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

export default function PatternFolder({items, location, up, base}) {
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
						base={base}
						/>
			}
			{
				items.map(item => (
					<PatternFolderItem
						{...item}
						location={location}
						key={item.id}
						base={base}
						/>
				))
			}
		</ul>
	);
}

PatternFolder.propTypes = {
	base: t.string.isRequired,
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

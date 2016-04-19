import React, {Component, PropTypes as types} from 'react';
import {findDOMNode} from 'react-dom';
import autobind from 'autobind-decorator';
import deepEqual from 'deep-equal';
import pure from 'pure-render-decorator';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import NavigationItem from './navigation-item';
import getAugmentedChildren from '../../utils/augment-hierarchy';

/* function scrollIntoView(element, options) {
	const {top, bottom} = element.getBoundingClientRect();
	const upper = top < 60;
	const lower = bottom > global.window.innerHeight - 60;
	const needed = upper || lower;
	if (needed) {
		element.scrollIntoView({
			block: lower ? 'end' : 'start',
			...options
		});
	}
} */

@pure
class NavigationTree extends Component {
	displayName = 'NavigationTree';

	static propTypes = {
		data: types.object,
		path: types.string,
		query: types.object,
		children: types.oneOfType([
			types.node,
			types.arrayOf(types.node)
		]),
		config: types.object
	};

	activeReference = null;
	activeElement = null;

	activeFolderReference = null;
	activeFolderElement = null;

	@autobind
	handleFolderClick(e, component) {
		this.getActiceFolderReference(component);
	}

	@autobind
	getActiceFolderReference(node) {
		const element = node instanceof Component ?
			findDOMNode(node) :
			node;
		const reference = node instanceof Component ?
			node :
			this;
		this.activeFolderReference = reference;
		this.activeFolderElement = element;
	}

	@autobind
	getActiveReference(node) {
		const element = node instanceof Component ?
			findDOMNode(node) :
			node;
		const reference = node instanceof Component ?
			node :
			this;

		if (reference.props.active) {
			this.activeReference = reference;
			this.activeElement = element;
		}
	}

	render() {
		const {data, path, children, config, query} = this.props;
		const {folders, patterns} = getAugmentedChildren(data, config.hierarchy);
		const searched = path.split('/').slice(2).join('/');

		const [activePattern] = patterns.filter(pattern => searched === pattern.id);

		const nested = folders.map(folder => {
			const currentPath = path.split('/');
			const folderPath = folder.id.split('/');
			const active = deepEqual(currentPath.slice(2, 2 + folderPath.length), folderPath);
			const ref = active ? this.getActiceFolderReference : null;

			return (
				<NavigationItem
					name={folder.displayName}
					symbol={folder.icon}
					id={folder.id}
					query={query}
					key={folder.id}
					active={active}
					ref={ref}
					onClick={this.handleFolderClick}
					>
					<NavigationTree
						path={path}
						config={config}
						data={folder.children}
						id={folder.id}
						query={query}
						/>
				</NavigationItem>
			);
		});

		const items = patterns.map(pattern => {
			const {
				displayName,
				id,
				type,
				manifest
			} = pattern;

			const active = pattern === activePattern;
			const {options = {}} = manifest;
			const {hidden = false} = options;

			return (
				<NavigationItem
					name={displayName}
					hidden={hidden}
					id={id}
					key={id}
					symbol={type}
					active={active}
					ref={this.getActiveReference}
					query={query}
					/>
			);
		});

		return (
			<CSSTransitionGroup
				component="ul"
				className="navigation-tree"
				transitionName="pattern-content-transition"
				transitionEnterTimeout={300}
				transitionLeaveTimeout={300}
				>
				{children}
				{nested}
				{items}
			</CSSTransitionGroup>
		);
	}
}

export default NavigationTree;

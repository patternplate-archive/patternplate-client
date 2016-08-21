import React, {Component, PropTypes as types} from 'react';
import {findDOMNode} from 'react-dom';
import autobind from 'autobind-decorator';
import deepEqual from 'deep-equal';
import pure from 'pure-render-decorator';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import NavigationItem from './navigation-item';
import getAugmentedChildren from '../../utils/augment-hierarchy';

@pure
class NavigationTree extends Component {
	displayName = 'NavigationTree';

	static propTypes = {
		base: types.string.isRequired,
		data: types.object,
		path: types.string,
		searchQuery: types.string,
		children: types.oneOfType([
			types.node,
			types.arrayOf(types.node)
		]),
		config: types.object,
		hierarchy: types.object,
		location: types.object
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
		const {base, data, children, path, searchQuery, hierarchy, location} = this.props;
		const {folders, patterns} = getAugmentedChildren(data, hierarchy);
		const matcher = new RegExp(`^${base}pattern`);
		const currentPathFragments = path.replace(matcher, '').split('/').filter(Boolean);
		const currentPath = currentPathFragments.join('/');

		const nested = folders.map(folder => {
			const folderPath = folder.id.split('/').filter(Boolean);
			const active = deepEqual(currentPathFragments.slice(0, folderPath.length), folderPath);
			const ref = active ? this.getActiceFolderReference : null;

			return (
				<NavigationItem
					name={folder.displayName}
					symbol={folder.icon}
					id={folder.id}
					searchQuery={searchQuery}
					key={folder.id}
					active={active}
					ref={ref}
					onClick={this.handleFolderClick}
					location={location}
					base={base}
					type="directory"
					>
					<NavigationTree
						id={folder.id}
						path={path}
						data={folder.children}
						searchQuery={searchQuery}
						hierarchy={hierarchy}
						location={location}
						base={base}
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

			const {options = {}} = manifest;
			const {hidden = false} = options;

			return (
				<NavigationItem
					base={base}
					name={displayName}
					hidden={hidden}
					id={id}
					key={id}
					symbol={type}
					ref={this.getActiveReference}
					searchQuery={searchQuery}
					location={location}
					type={type}
					active={currentPath === id}
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

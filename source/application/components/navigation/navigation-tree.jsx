import React, {Component, PropTypes as types} from 'react';
import {findDOMNode} from 'react-dom';
import autobind from 'autobind-decorator';
import deepEqual from 'deep-equal';
import pure from 'pure-render-decorator';

import NavigationItem from './navigation-item';
import getAugmentedChildren from '../../utils/augment-hierarchy';

const {window} = global;

function scrollIntoView(element, options) {
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
}

function loop(predicate = () => {}, container = {}) {
	container.loop = window.requestAnimationFrame(e => {
		predicate(e);
		container.loo = loop(predicate);
	});
}

function unloop({loop}) {
	if (loop) {
		window.cancelAnimationFrame(loop);
	}
}

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

	state = {
		anchored: null
	};

	componentDidMount() {
		this.loop = loop(() => {
			const {activeFolderElement, activeFolderReference} = this;
			if (activeFolderElement && activeFolderReference) {
				const {top} = activeFolderElement.getBoundingClientRect();
				const anchored = top <= 54;
				this.setState({
					anchored: anchored ? activeFolderReference.props.id : null
				});
			}
		}, this);
	}

	componentWillUnmount() {
		unloop(this);
	}

	@autobind
	handleAnchoredClick(e) {
		scrollIntoView(e.target.parentNode.parentNode);
	}

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
		const {anchored} = this.state;
		const {folders, patterns} = getAugmentedChildren(data, config.hierarchy);
		const searched = path.split('/').slice(2).join('/');

		const [activePattern] = patterns.filter(pattern => searched === pattern.id);

		const nested = folders.map(folder => {
			const currentPath = path.split('/');
			const folderPath = folder.id.split('/');
			const active = deepEqual(currentPath.slice(2, 2 + folderPath.length), folderPath);
			const ref = active ? this.getActiceFolderReference : null;
			const isAnchored = anchored === folder.id;

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
					{isAnchored &&
						<NavigationItem
							component="div"
							name={folder.displayName}
							symbol={folder.icon}
							id={folder.id}
							key={`${folder.id}-anchored`}
							active={active}
							anchored={isAnchored}
							query={query}
							onClick={this.handleAnchoredClick}
							/>
					}
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
			<ul
				className="navigation-tree"
				>
				{children}
				{nested}
				{items}
			</ul>
		);
	}
}

export default NavigationTree;

import React, {Component, PropTypes as types} from 'react';
import pure from 'pure-render-decorator';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import NavigationItem from './navigation-item';
import getAugmentedChildren from '../../utils/augment-hierarchy';

@pure
class NavigationTree extends Component {
	displayName = 'NavigationTree';

	static propTypes = {
		id: types.string,
		activePattern: types.string,
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

	render() {
		const {base, data, children, hierarchy, activePattern, searchQuery, location} = this.props;
		const {folders, patterns} = getAugmentedChildren(data, hierarchy);

		return (
			<CSSTransitionGroup
				component="ul"
				className="navigation-tree"
				transitionName="pattern-content-transition"
				transitionEnterTimeout={300}
				transitionLeaveTimeout={300}
				>
				{children}
				{
					folders.map(folder => {
						const active = activePattern.startsWith(folder.id);

						return (
							<NavigationItem
								name={folder.displayName}
								symbol={folder.icon}
								symbolActive={folder.iconActive}
								id={folder.id}
								searchQuery={searchQuery}
								key={folder.id}
								active={active || folder.expanded}
								onClick={this.handleFolderClick}
								location={location}
								base={base}
								type="directory"
								>
								<NavigationTree
									activePattern={activePattern}
									id={folder.id}
									data={folder.children}
									searchQuery={searchQuery}
									hierarchy={hierarchy}
									location={location}
									base={base}
									/>
							</NavigationItem>
						);
					})
				}
				{
					patterns.map(pattern => {
						const {
							displayName,
							expanded,
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
								id={pattern.id}
								key={pattern.id}
								symbol={type}
								ref={this.getActiveReference}
								searchQuery={searchQuery}
								location={location}
								type={type}
								active={activePattern === pattern.id || expanded}
								/>
							);
					})
				}
			</CSSTransitionGroup>
		);
	}
}

export default NavigationTree;

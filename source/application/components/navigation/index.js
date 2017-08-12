import React, {PropTypes as t} from 'react';
import styled from 'styled-components';

import NavigationTree from './navigation-tree';
import NavigationToolbar from './navigation-toolbar';
import Logo from '../../containers/logo';

export default class Navigation extends React.Component {
	constructor(...args) {
		super(...args);
		this.getRef = this.getRef.bind(this);
		this.handleScrollRequest = this.handleScrollRequest.bind(this);
	}

	handleScrollRequest(e) {
		const item = e.target.getBoundingClientRect();
		const list = this.ref.getBoundingClientRect();

		if (e.props.type !== 'folder' && item.bottom > list.bottom) {
			this.ref.scrollTop = e.target.offsetTop - list.height + item.height;
		}

		if (item.top < list.top) {
			this.ref.scrollTop = e.target.offsetTop;
		}
	}

	getRef(ref) {
		this.ref = ref;
	}

	render() {
		const {props} = this;
		return (
			<StyledNavigation>
				<StyledNavigationTree innerRef={this.getRef}>
					<Logo/>
					<NavigationTree
						active={props.active}
						data={props.navigation.children}
						onScrollRequest={this.handleScrollRequest}
						prefix="/pattern"
						>
						<Documentation
							active={props.active}
							docs={props.docs}
							/>
					</NavigationTree>
				</StyledNavigationTree>
				<StyledNavigationToolbar>
					<NavigationToolbar/>
				</StyledNavigationToolbar>
			</StyledNavigation>
		);
	}
}

Navigation.propTypes = {
	active: t.string.isRequired,
	docs: t.object.isRequired,
	navigation: t.object.isRequired
};

const StyledNavigation = styled.div`
	display: flex;
	height: 100%;
	flex-direction: column;
	justify-content: space-between;
	position: relative;
	background: ${props => props.theme.tint}
`;

const StyledNavigationTree = styled.div`
	flex-grow: 1;
	flex-shrink: 1;
	overflow-x: hidden;
	overflow-y: scroll;
	-webkit-overflow-scroll: touch;
`;

const StyledNavigationToolbar = styled.div`
	flex-grow: 0;
	flex-shrink: 0;
`;

function Documentation(props) {
	return (
		<StyledDocumentationTree
			active={props.active}
			className="docs-navigation"
			data={props.docs.children}
			prefix="/doc"
			/>
	);
}

Documentation.propTypes = {
	active: t.string.isRequired,
	docs: t.object.isRequired
};

const StyledDocumentationTree = styled(NavigationTree)`
	margin-bottom: 5px;
	border-bottom: 1px solid ${props => props.theme.border};
	padding-bottom: 5px;
`;

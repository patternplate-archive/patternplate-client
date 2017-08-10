import React, {PropTypes as t} from 'react';
import styled from 'styled-components';

import NavigationTree from './navigation-tree';
import NavigationToolbar from './navigation-toolbar';

export default Navigation;

function Navigation(props) {
	return (
		<StyledNavigation>
			<StyledNavigationTree>
				<NavigationTree
					active={props.active}
					data={props.navigation.children}
					hide={props.hide}
					hierarchy={props.hierarchy}
					prefix="/pattern"
					>
					<Documentation
						active={props.active}
						docs={props.docs}
						hide={props.hide}
						hierarchy={props.hierarchy}
						/>
				</NavigationTree>
			</StyledNavigationTree>
			<StyledNavigationToolbar>
				<NavigationToolbar/>
			</StyledNavigationToolbar>
		</StyledNavigation>
	);
}

Navigation.propTypes = {
	active: t.string.isRequired,
	docs: t.object.isRequired,
	enabled: t.bool.isRequired,
	hierarchy: t.object,
	hide: t.bool.isRequired,
	icon: t.string.isRequired,
	navigation: t.object.isRequired,
	pathname: t.string.isRequired,
	shortcuts: t.any.isRequired,
	theme: t.string.isRequired,
	title: t.string.isRequired,
	version: t.string.isRequired
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
			hide={props.hide}
			prefix="/doc"
			/>
	);
}

Documentation.propTypes = {
	active: t.string.isRequired,
	docs: t.object.isRequired,
	hide: t.bool.isRequired
};

const StyledDocumentationTree = styled(NavigationTree)`
	margin-bottom: 5px;
	border-bottom: 1px solid ${props => props.theme.border};
	padding-bottom: 5px;
`;

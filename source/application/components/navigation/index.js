import React, {PropTypes as t} from 'react';
import styled from 'styled-components';

import NavigationTree from './navigation-tree';
import NavigationItem from './navigation-item';
import NavigationToolbar from './navigation-toolbar';

export default Navigation;

function Navigation(props) {
	return (
		<StyledNavigation>
			<StyledNavigationTree>
				<NavigationTree
					activePattern={props.activePattern}
					data={props.navigation.children}
					hide={props.hide}
					hierarchy={props.hierarchy}
					pathname={props.pathname}
					prefix="/pattern"
					>
					<Documentation
						activePattern={props.activePattern}
						docs={props.docs}
						hide={props.hide}
						hierarchy={props.hierarchy}
						pathname={props.pathname}
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
	activePattern: t.string.isRequired,
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
			active={props.pathname === '/' || props.pathname.indexOf('/doc') === 0}
			activePattern={props.activePattern}
			className="docs-navigation"
			data={props.docs.children}
			hide={props.hide}
			pathname={props.pathname}
			prefix="/doc"
			>
			<StyledDocumentationItem
				active={props.pathname === '/' || props.pathname === '/doc'}
				hidden={false}
				hide={props.hide}
				id="/"
				key="/"
				linkTo=""
				name={props.docs.manifest.displayName}
				type="doc"
				symbol="doc"
				symbolActive="doc"
				/>
		</StyledDocumentationTree>
	);
}

Documentation.propTypes = {
	activePattern: t.string.isRequired,
	docs: t.object.isRequired,
	hide: t.bool.isRequired,
	pathname: t.string.isRequired
};

const StyledDocumentationTree = styled(NavigationTree)`
	margin-bottom: 5px;
	border-bottom: 1px solid ${props => props.theme.border};
	padding-bottom: 5px;
`;

const StyledDocumentationItem = styled(NavigationItem)`
	padding-top: 5px;
`;

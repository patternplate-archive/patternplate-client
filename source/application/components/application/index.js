import autobind from 'autobind-decorator';
import React, {Component, PropTypes as t} from 'react';
import Helmet from 'react-helmet';
import styled, {ThemeProvider, injectGlobal} from 'styled-components';
import tag from 'tag-hoc';

import Code from '../../containers/code';
import Favicon from '../../containers/favicon';
import Fullscreen from '../../containers/fullscreen';
import Hamburger from '../../containers/hamburger';
import Info from '../../containers/info';
import InfoPane from '../../containers/info-pane';
import Navigation from '../../containers/navigation';
import Opacity from '../../containers/opacity';
import Search from '../../containers/search';

@autobind
export default class Application extends Component {
	componentDidMount() {
		this.props.onLoad();
		global.addEventListener('resize', this.onResize);
	}

	componentWillMount() {
		/* eslint-disable no-unused-expressions */
		injectGlobal`
			html,
			body {
				height: 100%;
				overflow: hidden;
			}
			body {
				margin: 0;
				height: 100%;
			}
			[data-application] {
				height: 100%;
			}
		`;
		/* eslint-enable */
	}

	componentWillUnmount() {
		global.removeEventListener('resize', this.onResize);
	}

	onResize() {
		this.props.onResize({
			width: global.innerWidth,
			height: global.innerHeight
		});
	}

	render() {
		const {props} = this;

		return (
			<ThemeProvider theme={props.themes[props.theme]}>
				<StyledApplication>
					<Helmet meta={meta(props)} title={props.title}/>
					<Favicon/>
					<ThemeProvider theme={props.themes.dark}>
						<StyledNavigationBox enabled={props.navigationEnabled}>
							{
								props.navigationEnabled &&
									<Navigation/>
							}
						</StyledNavigationBox>
					</ThemeProvider>
					<StyledContentContainer>
						<StyledContent navigationEnabled={props.navigationEnabled}>
							{props.children}
							{props.searchEnabled &&
								<ThemeProvider theme={props.themes.dark}>
									<StyledSearchBox>
										<StyledSearchFrame>
											<Search/>
										</StyledSearchFrame>
									</StyledSearchBox>
								</ThemeProvider>
							}
							{props.infoEnabled &&
								<ThemeProvider theme={props.themes.dark}>
									<StyledInfoBox>
										<InfoPane/>
									</StyledInfoBox>
								</ThemeProvider>
							}
						</StyledContent>
						<ThemeProvider theme={props.themes.dark}>
							<StyledControlsBox enabled={props.navigationEnabled}>
								<StyledControlsArea orient="left">
									<StyledControlsItem>
										<Hamburger/>
									</StyledControlsItem>
									<StyledControlsItem>
										<Info/>
									</StyledControlsItem>
									<StyledControlsItem>
										<Code/>
									</StyledControlsItem>
								</StyledControlsArea>
								<StyledControlsArea orient="right">
									<StyledControlsItem>
										<Opacity/>
									</StyledControlsItem>
									<StyledControlsItem>
										<Fullscreen/>
									</StyledControlsItem>
								</StyledControlsArea>
							</StyledControlsBox>
						</ThemeProvider>
					</StyledContentContainer>
					<Lightbox id={props.lightbox}/>
				</StyledApplication>
			</ThemeProvider>
		);
	}
}

Application.propTypes = {
	children: t.any,
	description: t.string.isRequired,
	lightbox: t.string,
	navigationEnabled: t.bool.isRequired,
	onLoad: t.func.isRequired,
	onResize: t.func.isRequired,
	searchEnabled: t.bool.isRequired,
	theme: t.string.isRequired,
	themes: t.any.isRequired,
	title: t.string.isRequired
};

function Lightbox(props) {
	switch (props.id) {
		default:
			return null;
	}
}

Lightbox.propTypes = {
	id: t.string
};

const WIDTH = 300;
const NAVIGATION_WIDTH = props => props.enabled ? WIDTH : 0;
const TOOLBAR_HEIGHT = 60;
const ORIENTATION = props => {
	const direction = props.orient === 'right' ? 'left' : 'right';
	return `margin-${direction}: auto`;
};

const StyledApplication = styled.div`
	box-sizing: border-box;
	display: flex;
	width: 100%;
	height: 100%;
	background: ${props => props.theme.background};
`;

const StyledNavigationBox = styled(tag(['enabled'])('div'))`
	position: relative;
	z-index: 2;
	height: 100%;
	width: ${NAVIGATION_WIDTH}px;
	flex: 0 0 ${NAVIGATION_WIDTH}px;
`;

const StyledControlsArea = styled.div`
	display: flex;
	${ORIENTATION};
`;

const StyledControlsBox = styled.div`
	display: flex;
	align-items: center;
	flex: 0 0 ${TOOLBAR_HEIGHT}px;
	position: relative;
	z-index: 2;
	box-sizing: border-box;
	height: ${TOOLBAR_HEIGHT}px;
	padding: 0 15px;
`;

const StyledControlsItem = styled.div`
	& + & {
		padding-left: 10px;
	}
`;

const StyledContent = styled.div`
	flex: 1 1 100%;
	width: 100%;
	height: calc(100% - 60px);
	position: relative;
`;

const StyledContentContainer = styled.div`
	display: flex;
	flex: 1 1 calc(100% - ${NAVIGATION_WIDTH}px);
	width: calc(100% - ${NAVIGATION_WIDTH}px);
	height: 100%;
	flex-direction: column;
	overflow: hidden;
`;

const StyledSearchBox = styled.div`
	position: absolute;
	top: 12.5vh;
	bottom: 10vh;
	right: 0;
	left: 0;
	width: 100%;
	pointer-events: none;
`;

const StyledSearchFrame = styled.div`
	width: 90%;
	min-width: 320px;
	max-width: 750px;
	max-height: 100%;
	margin: 0 auto;
	overflow: hidden;
`;

const StyledInfoBox = styled.div`
	padding: 0 15px;
`;

function meta(props) {
	return [
		{name: 'description', content: props.description},
		{name: 'viewport', content: 'width=device-width, initial-scale=1'}
	];
}

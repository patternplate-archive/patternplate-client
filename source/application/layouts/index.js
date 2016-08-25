 /* eslint-disable react/no-danger */
import React, {PropTypes as t} from 'react';
import {renderToStaticMarkup as render} from 'react-dom/server';

export default layout;

function layout(props) {
	return `<!doctype html>${render(<Layout {...props}/>)}`;
}

function Layout(props) {
	const attributes = props.attributes.toComponent();
	return (
		<html {...attributes}>
			<head>
				{props.title.toComponent()}
				{props.meta.toComponent()}
				{props.link.toComponent()}
				{props.style.toComponent()}
			</head>
			<body>
				<Content content={props.content}/>
				<State data={props.data}/>
				{
					props.scripts.map(src => {
						return <script key={src} src={src}/>;
					})
				}
			</body>
		</html>
	);
}

Layout.propTypes = {
	attributes: t.object.isRequired,
	content: t.string.isRequired,
	data: t.string.isRequired,
	link: t.object.isRequired,
	meta: t.object.isRequired,
	scripts: t.arrayOf(t.string).isRequired,
	style: t.object.isRequired,
	title: t.object.isRequired
};

function Content(props) {
	return (
		<div data-application
			dangerouslySetInnerHTML={{__html: props.content}}
			/>
	);
}

Content.propTypes = {
	content: t.string.isRequired
};

function State(props) {
	return (
		<script
			data-application-state
			dangerouslySetInnerHTML={{__html: props.data}}
			type="application/json"
			/>
	);
}

State.propTypes = {
	data: t.string.isRequired
};

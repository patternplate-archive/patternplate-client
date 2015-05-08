function layout (props) {
	return `<!doctype html>
	<html>
		<head>
			<title>${props.title}</title>
			<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
			<link rel="icon" type="image/png" href="/static/images/favicon-32.png" sizes="32x32" />
			<link rel="icon" type="image/png" href="/static/images/favicon-16.png" sizes="16x16" />
			<style>${props.style.demo || props.style.index}</style>
		</head>
		<body>
			${props.content}
			<script>${props.script.demo || props.script.index}</script>
			<script src="/script/content.js"></script>
		</body>
	</html>
	`;
}

export default layout;

function layout (props) {
	return `<!doctype html>
	<html>
		<head>
			<title>${props.title}</title>
			<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
			<link rel="icon" type="image/png" href="/static/images/favicon-32.png" sizes="32x32" />
			<link rel="icon" type="image/png" href="favicon-16.png" sizes="16x16" />
			<style data-demo-style-index="data-demo-style-index">${props.style.index}</style>
			<style data-demo-style-demo="data-demo-style-demo">${props.style.demo}</style>
		</head>
		<body>
			${props.content}
			<script data-demo-script-index="data-demo-script-index">${props.script.index}</script>
			<script data-demo-script-demo="data-demo-script-demo">${props.script.demo}</script>
			<script src="/script/content.js"></script>
		</body>
	</html>
	`;
}

export default layout;

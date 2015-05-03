function layout (props) {
	return `<!doctype html>
	<html>
		<head>
			<title>${props.title}</title>
			<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
			<style demo-style-index>${props.style.index}</style>
			<style demo-style-demo>${props.style.demo}</style>
		</head>
		<body>
			${props.content}
			<script demo-script-index>${props.script.index}</script>
			<script demo-script-demo>${props.script.demo}</script>
			<script src="/script/content.js"></script>
		</body>
	</html>
	`;
}

export default layout;

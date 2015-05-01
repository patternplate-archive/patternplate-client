function layout (props) {
	return `<!doctype html>
	<html>
		<head>
			<title>${props.title}</title>
		</head>
		<body>
			<div application="application">${props.content}</div>
			<script application-state="application-state" type="application/json">${props.data}</script>
			<script src="${props.script}"></script>
		</body>
	</html>
	`;
}

export default layout;

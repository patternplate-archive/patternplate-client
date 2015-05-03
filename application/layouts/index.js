function layout (props) {
	return `<!doctype html>
	<html>
		<head>
			<title>${props.title}</title>
			<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
			<link rel="stylesheet" href="${props.stylesheet}" application-theme="application-theme">
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

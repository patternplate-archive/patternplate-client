function layout(props) {
	return `<!doctype html>
	<html>
		<head>
			<title>${props.title}</title>
			<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
			<link rel="icon" type="image/png" href="/static/images/patternplate-favicon-32.png" sizes="32x32" />
			<link rel="icon" type="image/png" href="/static/images/patternplate-favicon-16.png" sizes="16x16" />
			<link rel="stylesheet" href="${props.stylesheet}" data-application-theme="data-application-theme">
		</head>
		<body>
			<div class="inline-svg" data-application-icons="data-application-icons">${props.icons}</div>
			<div data-application="data-application">${props.content}</div>
			<script data-application-state="data-application-state" type="application/json">${props.data}</script>
			<script src="/script/vendors.js"></script>
			<script src="${props.script}"></script>
		</body>
	</html>
	`;
}

export default layout;

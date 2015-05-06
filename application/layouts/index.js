"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
function layout(props) {
	return "<!doctype html>\n\t<html>\n\t\t<head>\n\t\t\t<title>" + props.title + "</title>\n\t\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, user-scalable=no\">\n\t\t\t<link rel=\"icon\" type=\"image/png\" href=\"/static/images/favicon-32.png\" sizes=\"32x32\" />\n\t\t\t<link rel=\"icon\" type=\"image/png\" href=\"/static/images/favicon-16.png\" sizes=\"16x16\" />\n\t\t\t<link rel=\"stylesheet\" href=\"" + props.stylesheet + "\" data-application-theme=\"data-application-theme\">\n\t\t</head>\n\t\t<body>\n\t\t\t<div class=\"inline-svg\" data-application-icons=\"data-application-icons\">" + props.icons + "</div>\n\t\t\t<div data-application=\"data-application\">" + props.content + "</div>\n\t\t\t<script data-application-state=\"data-application-state\" type=\"application/json\">" + props.data + "</script>\n\t\t\t<script src=\"" + props.script + "\"></script>\n\t\t</body>\n\t</html>\n\t";
}

exports["default"] = layout;
module.exports = exports["default"];
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
function layout(props) {
	return "<!doctype html>\n\t<html>\n\t\t<head>\n\t\t\t<title>" + props.title + "</title>\n\t\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, user-scalable=no\">\n\t\t\t<link rel=\"icon\" type=\"image/png\" href=\"/static/images/favicon-32.png\" sizes=\"32x32\" />\n\t\t\t<link rel=\"icon\" type=\"image/png\" href=\"/static/images/favicon-16.png\" sizes=\"16x16\" />\n\t\t\t<style>" + (props.style.demo || props.style.index) + "</style>\n\t\t</head>\n\t\t<body>\n\t\t\t" + props.content + "\n\t\t\t<script>" + (props.script.demo || props.script.index) + "</script>\n\t\t\t<script src=\"/script/content.js\"></script>\n\t\t</body>\n\t</html>\n\t";
}

exports["default"] = layout;
module.exports = exports["default"];
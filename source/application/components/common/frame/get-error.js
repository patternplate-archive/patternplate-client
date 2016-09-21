import getField from './get-field';
export default getError;

function getError(lines) {
	const pattern = getField('Pattern')(lines);
	const transform = getField('Transform')(lines);
	const file = getField('File')(lines);

	const error = new Error(lines.join('\n'));
	error.pattern = pattern;
	error.transform = transform;
	error.fileName = file;
	return error;
}

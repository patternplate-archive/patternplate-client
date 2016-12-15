import {find, startsWith} from 'lodash';
export default getField;

function getField(name) {
	return lines => {
		const lookup = `${name}: `;
		const line = find(lines, line => startsWith(line, lookup));
		return line.slice(lookup.length - 1);
	};
}

export default getField;

function getField(name) {
	return lines => {
		const lookup = `${name}: `;
		const line = lines.find(line => line.startsWith(lookup));
		return line.slice(lookup.length - 1);
	};
}

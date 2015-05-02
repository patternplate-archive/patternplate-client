function patternApiFilterFactory () {
	async function patternApiFilter (data, path) {
		if (!path.match(/^pattern\/(.*)/)) {
			return data;
		}

		if (typeof data === 'undefined') {
			return data;
		}

		let copy = data;

		if (Array.isArray(copy)) {
			copy.forEach(async function applyTransformToArrayItem (item, index) {
				copy[index] = await patternApiFilter(item, path);
			});
		}

		return copy;
	}

	return patternApiFilter;
}

export default patternApiFilterFactory;

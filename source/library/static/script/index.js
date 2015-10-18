import 'babel-core/polyfill';
import render from '../../universal/client';

const queries = {
	mount: () => document.querySelectorAll('[data-mount]'),
	data: key => document.querySelectorAll(`[data-mount-data=${key}]`)
};

function deserialize(key) {
	const elements = [...queries.data(key)];
	return elements.reduce((result, element) => {
		return {...result, ...JSON.parse(element.textContent)};
	}, {});
}

function mount(element) {
	const data = deserialize(element.dataset.mount);
	render(data, element);
}

function main() {
	const mountElements = [...queries.mount()];
	mountElements.map(mount);
}

main();

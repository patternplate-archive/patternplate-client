import React from 'react';
import {render} from 'react-dom';
import client from '../../library/universal/client';

const queries = {
	mount: '[data-mount-node]',
	data: '[data-mount-data]'
};

async function main() {
	const mountElement = document.querySelector(queries.mount);
	const dataElement = document.querySelector(queries.data);

	if (!mountElement) {
		throw new Error(`No mount point found, searched for "${queries.mount}"`);
	}

	if (!dataElement) {
		throw new Error(`No data element found, searched for "${queries.data}"`);
	}

	const state = JSON.parse(dataElement.textContent);
	const Application = client(state);

	render(<Application />, mountElement);
}

main()
	.catch(err => console.error(err));

import 'babel-polyfill';
import router from '../../application/react-routes/client';

const select = global.document.querySelector.bind(global.document);

async function main() {
	const vault = select('[data-application-state]');
	const slot = select('[data-application]');
	const data = JSON.parse(vault.textContent);
	return router(data, slot);
}

main()
	.catch(error => {
		setTimeout(() => {
			throw error;
		});
	});

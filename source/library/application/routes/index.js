import universal from '../../universal/server';

export default function () {
	return async function() {
		const path = this.params.path || this.captures[0] || '';
		const search = this.request.search || '';

		const document = await universal(`/${path}${search}`);
		this.body = `<!doctype html>${document}`;
	};
}

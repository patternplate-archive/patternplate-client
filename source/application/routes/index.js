import renderPage from '../../library/render-page';

function indexRouteFactory(application) {
	return async function indexRoute() {
		this.body = await renderPage(application, this.request.url);
	};
}

export default indexRouteFactory;

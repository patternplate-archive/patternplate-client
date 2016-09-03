import urlQuery from '../utils/url-query';

export default openFullscreen;
export const type = 'OPEN_FULLSCREEN';

function openFullscreen() {
	return (dispatch, getState) => {
		const {base, id, environment} = getState();
		if (id === '..' || !window.open) {
			return;
		}

		const href = urlQuery.format({
			pathname: `${base}demo/${id}/index.html`,
			query: {environment}
		});

		window.open(href, '_blank');
	};
}

openFullscreen.type = type;

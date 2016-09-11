export default scrollDemo;
export const type = 'SCROLL_DEMO';

function scrollDemo({x, y}) {
	return (dispatch, getState) => {
		const state = getState();
		if (x !== state.demoScrollX) {
			global.requestAnimationFrame(() => {
				dispatch({
					type: 'SCROLL_DEMO_X',
					payload: x
				});
			});
		}
		if (y !== state.demoScrollY) {
			global.requestAnimationFrame(() => {
				dispatch({
					type: 'SCROLL_DEMO_Y',
					payload: y
				});
			});
		}
	};
}

scrollDemo.type = type;

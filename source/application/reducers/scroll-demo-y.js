export default function (state = 0, action) {
	if (action.type === 'SCROLL_DEMO_Y') {
		return action.payload;
	}
	return state;
}

export default function (state = 0, action) {
	if (action.type === 'SCROLL_DEMO_X') {
		return action.payload;
	}
	return state;
}

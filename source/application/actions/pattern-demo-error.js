export default createPatternDemoError;

function createPatternDemoError(payload) {
	return (dispatch, getState) => {
		const state = getState();
		return dispatch({
			type: 'PATTERN_DEMO_ERROR',
			payload: {
				message: payload.message,
				pattern: payload.pattern || state.id,
				stack: payload.stack,
				file: payload.file || payload.fileName || state.sourceId
			}
		});
	};
}

createPatternDemoError.type = 'PATTERN_DEMO_ERROR';

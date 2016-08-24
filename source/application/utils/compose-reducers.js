export default function composeReducers(...args) {
	return (state, action) => {
		return args.reduce((state, arg) => arg(state, action), state);
	};
}

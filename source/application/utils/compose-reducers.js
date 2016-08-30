export default function composeReducers(...args) {
	return (state, action, dependencies) => {
		return args.reduce((state, arg) => arg(state, action, dependencies), state);
	};
}

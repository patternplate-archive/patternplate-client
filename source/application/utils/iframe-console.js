class IframeConsole {
	constructor(origin = '') {
		this.origin = origin;
		this.prefix = `[${origin}]`;
		this.native = global.window.console;
	}

	trace(...args) {
		return this.native.trace(...[this.prefix, ...args]);
	}

	debug(...args) {
		return this.native.debug(...[this.prefix, ...args]);
	}

	info(...args) {
		return this.native.info(...[this.prefix, ...args]);
	}

	log(...args) {
		return this.native.log(...[this.prefix, ...args]);
	}

	warn(...args) {
		return this.native.warn(...[this.prefix, ...args]);
	}

	error(...args) {
		return this.native.error(...[this.prefix, ...args]);
	}
}

export default IframeConsole;

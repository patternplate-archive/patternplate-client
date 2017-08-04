const CODES = {
	esc: 27,
	space: 32,
	c: 67,
	d: 68,
	e: 69,
	f: 70,
	h: 72,
	i: 73,
	o: 79,
	k: 75,
	l: 76,
	r: 82,
	t: 84
};

export default class Shortcut {
	constructor({action, character, description, modifiers}) {
		this.character = character;
		this.code = CODES[character];
		this.action = action;
		this.active = ('document' in global);
		this.description = description;
		this.modifiers = modifiers || ['ctrlKey', 'altKey'];
		this.bind = this.bind.bind(this);
	}

	bind(store) {
		if (!this.active) {
			return;
		}
		global.addEventListener('keydown', e => {
			if (!this.modifiers.every(m => e[m])) {
				return;
			}

			const code = e.data ? e.data.keyCode : e.keyCode;
			if (code !== this.code) {
				return;
			}
			store.dispatch(this.action());
		});
	}

	toString() {
		const keys = [...this.modifiers, this.character].map(c => c.replace('Key', ''));
		return `[${keys.join('+')}]`;
	}
}

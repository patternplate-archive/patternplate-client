import * as actions from './actions';
import Shortcut from './utils/shortcut';

export default createShortcuts;

function createShortcuts() {
	const bind = store => {
		Object.keys(bind).forEach(name => {
			bind[name].bind(store);
		});
	};

	bind.toggleConsole = new Shortcut({
		character: 'c',
		description: 'Toggle the debug console',
		action: actions.toggleConsole
	});

	bind.openDocumentation = new Shortcut({
		character: 'd',
		description: 'Open the documentation',
		action: actions.openDocumentation
	});

	bind.openFullscreen = new Shortcut({
		character: 'f',
		description: 'Open fullscreen view for pattern',
		action: actions.openFullscreen
	});

	bind.toggleHide = new Shortcut({
		character: 'h',
		description: 'Toggle visibility of hidden patterns',
		action: actions.toggleHide
	});

	bind.info = new Shortcut({
		character: 'i',
		description: 'Toggle info pattern',
		action: actions.toggleInfo
	});

	bind.toggleOpacity = new Shortcut({
		character: 'o',
		description: 'Toggle opacity indcator background',
		action: actions.toggleOpacity
	});

	bind.toggleShortcuts = new Shortcut({
		character: 'k',
		description: 'Show keyboard shortcuts reference',
		action: actions.toggleKeyboardShortcuts
	});

	bind.toggleRulers = new Shortcut({
		character: 'l',
		description: 'Toggle pattern rulers',
		action: actions.toggleRulers
	});

	bind.toggleNavigation = new Shortcut({
		character: 'n',
		description: 'Toggle navigation',
		action: actions.toggleNavigation
	});

	bind.reload = new Shortcut({
		character: 'r',
		description: 'Force a data sync',
		action: () => actions.reload({reloadTime: Date.now()})
	});

	bind.toggleSearch = new Shortcut({
		character: 'space',
		description: 'Enable search',
		action: () => actions.toggleSearch()
	});

	bind.toggleTheme = new Shortcut({
		character: 't',
		description: 'Toggle active theme',
		action: actions.toggleTheme
	});

	bind.close = new Shortcut({
		character: 'esc',
		modifiers: [],
		action: actions.closeAllTheThings
	});

	bind.up = new Shortcut({
		character: 'arrow-up',
		modifiers: [],
		action: () => actions.arrow('up')
	});

	bind.right = new Shortcut({
		character: 'arrow-right',
		modifiers: [],
		action: () => actions.arrow('right')
	});

	bind.down = new Shortcut({
		character: 'arrow-down',
		modifiers: [],
		action: () => actions.arrow('down')
	});

	bind.left = new Shortcut({
		character: 'arrow-left',
		modifiers: [],
		action: () => actions.arrow('left')
	});

	return bind;
}

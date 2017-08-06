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

	bind.toggleIssue = new Shortcut({
		character: 'i',
		description: 'Toggle issue reportng helper',
		action: actions.toggleIssue
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

	return bind;
}

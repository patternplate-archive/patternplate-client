/*eslint-disable no-console */
import IframeConsole from './iframe-console';

class IFrameWindow {
	constructor (frame) {
		this.window = frame.contentWindow.window;
		let console = new IframeConsole(frame.src);

		Object.assign(this.window, {
			'alert': function iframeAlert () {
				return console.warn('window.alert is disabled in patterns.');
			},
			'confirm': function iframeConfirm () {
				return console.warn('window.confirm is disabled in patterns.');
			},
			'open': function iframeOpen () {
				return console.warn('window.open is disabled in patterns.');
			}
		}, {
			'console': console
		});
	}
}

function iframeWindowFactory (...args) {
	return new IFrameWindow(...args);
}

export default iframeWindowFactory;
export {iframeWindowFactory as iframeWindowFactory};
export {IFrameWindow as IFrameWindow};

import {handleAction} from 'redux-actions';
import {updateTime} from '../actions';

export default handleAction(updateTime, {
	next: state => {
		const now = Date.now();
		return now - state > 1000 ? now : state;
	}
}, Date.now());

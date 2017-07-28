import url from 'url';
import {createPromiseThunkAction} from './promise-thunk-action';
import fetch from '../utils/fetch';

export default createPromiseThunkAction('LOAD_SCHEMA', async base => {
	const uri = url.resolve(base, 'api');
	const response = await fetch(uri);
	return response.json();
});

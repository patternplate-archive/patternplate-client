import {connect} from 'react-redux';

import ProblemLightbox from '../components/content/problem';
export default connect(mapProps)(ProblemLightbox);

function mapProps(state) {
	return {
		base: state.base,
		shortcuts: state.shortcuts,
		state: JSON.stringify(state, null, '  '),
		theme: state.theme,
		version: state.schema.appVersion,
		serverVersion: state.schema.serverVersion,
		clientVersion: state.schema.clientVersion,
		location: state.routing.locationBeforeTransitions,
		nodeVersion: state.schema.nodeVersion,
		npmVersion: state.schema.npmVersion,
		osName: state.schema.osName,
		osVersion: state.schema.osVersion,
		browserName: state.schema.clientRuntimeName,
		browserVersion: state.schema.clientRuntimeVersion,
		runtimeName: state.schema.serverRuntimeName,
		runtimeVersion: state.schema.serverRuntimeVersion,
		clientOsName: state.schema.clientOsName,
		clientOsVersion: state.schema.clientOsVersion,
		serverOsName: state.schema.serverOsName,
		serverOsVersion: state.schema.serverOsVersion
	};
}

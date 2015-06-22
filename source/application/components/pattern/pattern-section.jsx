import {polyfill} from 'es6-promise';
polyfill();

import React from 'react';
import {PropTypes} from 'react';
import CSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

import humanize from 'string-humanize';
import 'isomorphic-fetch';

import Pattern from './index';
import PatternLoader from './pattern-loader';
import Headline from '../common/headline';

class PatternSection extends React.Component {
	displayName = 'PatternSection';
	state = { 'data': null, 'error': false };

	static propTypes = {
		'id': PropTypes.string.isRequired
	};

	async get(id, force = false) {
		let response;
		let data;
		let url = `/api/pattern/${id}`;

		try {
			response = await fetch(url, { 'headers': {'Accept': 'application/json'}, 'credentials': 'include' });
		} catch (err) {
			this.setState({ 'data': null, 'error': true });
			this.props.eventEmitter.emit('error', `${err.message} ${url}`);
			return;
		}

		if (this.state.data !== null) {
			return;
		}

		try {
			if (response.status >= 400) {
				// Try to get a meaningfull error message
				let message;
				try {
					let data = await response.json();
					message = data.message || response.statusText;
				} catch(error) {
					message = `${response.statusText} ${url}`;
				}
				throw new Error(message);
			}
		} catch (error) {
			this.setState({ 'data': null, 'error': true });
			this.props.eventEmitter.emit('error', `${error.message}`);
			return;
		}

		try {
			data = await response.json();
		} catch (err) {
			this.setState({ 'data': null, 'error': true });
			this.props.eventEmitter.emit('error', `Could not parse data for ${url}`);
		}

		this.setState({ 'data': data, 'error': false });
	}

	componentWillMount() {
		this.setState({
			'data': this.props.data
		});
	}

	componentDidMount() {
		if (! this.state.data) {
			this.get(this.props.id);
		}
	}

	componentWillReceiveProps(props) {
		this.setState({ 'data': null });
		this.get(props.id);
	}

	render () {
		var content;

		let frags = this.props.id ? this.props.id.split('/') : [];
		frags = frags.length > 1 ? frags.slice(0, frags.length - 1) : frags;

		let name = frags.map((fragment) => humanize(fragment)).join(' ');
		let loader = this.state.data ? '' : <PatternLoader {...this.state} key="loader" />;

		if (this.state.data) {
			let data = Array.isArray(this.state.data) ? this.state.data : [this.state.data];
			content = data.map((item) => {
				return <Pattern {...item} key={item.id} />
			});
		} else {
			content = '';
		}

		return (
			<section className="pattern-section">
				<CSSTransitionGroup component="div" transitionName="pattern-content-transition" transitionEnter={false}>
					{loader}
				</CSSTransitionGroup>
				{content}
			</section>
		);
	}
}

export default PatternSection;

import {polyfill} from 'es6-promise';
polyfill();

import React from 'react';
import CSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

import humanize from 'string-humanize';
import 'isomorphic-fetch';

import Pattern from './index.jsx';
import PatternLoader from './pattern-loader.jsx';
import Headline from '../common/headline.jsx';

class PatternSection extends React.Component {
	displayName = 'PatternSection';
	state = { 'data': null, 'error': false };

	async get(id, force = false) {
		try {
			let response = await fetch(`/api/pattern/${id}`);
			if (response.code < 200 || response.code >= 300) {
				throw new Error('Error while fetching');
			}

			let data = await response.json();
			if (! data) {
				throw new Error('No data for');
			}

			this.setState({ 'data': data, 'error': false });
		} catch (err) {
			this.setState({ 'data': null, 'error': true });
			this.props.eventEmitter.emit('error', `${err.message} ${this.props.id}`);
		}
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

		let frags = this.props.id.split('/');
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

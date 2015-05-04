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
	state = { 'data': null };

	async get(id, force = false) {
		let response = await fetch(`/api/pattern/${id}`);
		this.setState({ 'data': await response.json() });
	}

	componentWillMount() {
		this.setState({
			'data': this.props.data
		});
	}

	componentDidMount() {
		this.get(this.props.id);
	}

	componentWillReceiveProps(props) {
		this.get(props.id);
	}

	update() {
		this.get(this.props.id, true);
	}

	render () {
		let content = <PatternLoader />;
		let frags = this.props.id.split('/');
		frags = frags.length > 1 ? frags.slice(0, frags.length - 1) : frags;

		let name = frags.map((fragment) => humanize(fragment)).join(' ');
		let loader = this.state.data ? '' : <PatternLoader key="loader" />;

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
				<CSSTransitionGroup component="div" transitionName="pattern-content-transition">
					{loader}
				</CSSTransitionGroup>
				{content}
			</section>
		);
	}
}

export default PatternSection;

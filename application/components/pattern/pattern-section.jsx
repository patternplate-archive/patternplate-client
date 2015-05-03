import {polyfill} from 'es6-promise';
polyfill();

import React from 'react';
import humanize from 'string-humanize';
import 'isomorphic-fetch';

import Pattern from './index.jsx';
import PatternLoader from './pattern-loader.jsx';
import Headline from '../common/headline.jsx';

class PatternSection extends React.Component {
	displayName = 'PatternSection';
	state = { 'data': null };

	async get(id) {
		let response = await fetch(`/api/pattern/${id}`);
		let data = await response.json();
		this.setState({ 'data': data });
	}

	componentDidMount() {
		this.get(this.props.id);
	}

	componentWillReceiveProps(props) {
		this.get(props.id);
	}

	render () {
		let content = <PatternLoader />;
		let frags = this.props.id.split('/');
		frags = frags.length > 1 ? frags.slice(0, frags.length - 1) : frags;

		let name = frags.map((fragment) => humanize(fragment)).join(' ');

		if (this.state.data) {
			let data = Array.isArray(this.state.data) ? this.state.data : [this.state.data];
			content = data.map((item) => {
				return <Pattern {...item} key={item.id} />
			});
		}

		return (
			<section className="pattern-section">
				{content}
			</section>
		);
	}
}

export default PatternSection;

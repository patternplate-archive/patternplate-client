import {polyfill} from 'es6-promise';
polyfill();

import React from 'react';
import {PropTypes} from 'react';
import { Link } from 'react-router';
import CSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

import humanize from 'string-humanize';
import 'isomorphic-fetch';

import Pattern from './index';
import PatternLoader from './pattern-loader';
import PatternDependencies from './pattern-dependencies';
import Headline from '../common/headline';
import Icon from '../common/icon';

import getAugmentedChildren from '../../utils/augment-hierarchy';

class PatternSection extends React.Component {
	displayName = 'PatternSection';
	state = { 'data': null, 'error': false, 'type': null };

	static propTypes = {
		'id': PropTypes.string.isRequired
	};

	async get(props) {
		let { navigation, id, config } = props;

		// check if this is a pattern or folder
		let splits = id.split('/');
		let last = splits.pop();

		let folder = splits.reduce((folder, pathItem) => folder[pathItem].children, navigation);
		let type = (folder && folder[last].type) || 'pattern';

		if (type == 'folder' && config.useFolderTable) {
			this.setState({ 'data': folder[last], 'error': false, 'type': 'folder' });
			return;
		}

		let url = `/api/pattern/${id}`;

		let response;
		let data;

		try {
			response = await fetch(url, { 'headers': {'Accept': 'application/json'}, 'credentials': 'include' });
		} catch (err) {
			this.setState({ 'data': null, 'error': true, 'type': null });
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
			this.setState({ 'data': null, 'error': true, 'type': null });
			this.props.eventEmitter.emit('error', `${error.message}`);
			return;
		}

		try {
			data = await response.json();
			if(!Array.isArray(data)){
				data = [data];
			}
			data.forEach((item) => {
				this.generateDependencyGraph(item);
			});
		} catch (err) {
			this.setState({ 'data': null, 'error': true, 'type': null });
			this.props.eventEmitter.emit('error', `Could not parse data for ${url}`);
		}

		this.setState({ 'data': data, 'error': false, 'type': 'pattern' });
	}

  generateDependencyGraph(data) {
		try {
		data.results.index['Dependencies'] = {
			'id': 'Dependencies',
			'controlKey': 'Dependencies',
			'in': 'html',
			'source': React.renderToStaticMarkup(<PatternDependencies data={data} />)
		};
		} catch (e) {
			console.error(e);
		}
  }

	componentWillMount() {
		this.setState({
			'data': this.props.data,
			'type': 'pattern'
		});
	}

	componentDidMount() {
		if (! this.state.data) {
			this.get(this.props);
		}
	}

	componentWillReceiveProps(props) {
		this.setState({ 'data': null, 'type': 'pattern' });
		this.get(props);
	}

	render () {
		let { type, data } = this.state;

		if (type == 'folder') {

			let { folders, patterns } = getAugmentedChildren(data.children, this.props.config.hierarchy);

			let rows = Object.values(folders.concat(patterns)).map(child => {

				let { type, displayName, id } = child;
				let link = `/pattern/${id}`;

				if (type == 'pattern') {

					return (
						<tr key={id}>
							<td><Icon symbol="pattern" /></td>
							<td><Link to={link}>{displayName}</Link></td>
							<td>{child.manifest.version}</td>
							<td>
								<Link to={link} title="Show pattern">
									<Icon symbol="arrow-double-right" />
									<span>Show pattern</span>
								</Link>
							</td>
							<td>
								<a href={`/demo/${id}`} target="_blank" title="Fullscreen">
									<Icon symbol="fullscreen" />
									<span>Fullscreen</span>
								</a>
							</td>
						</tr>
					);

				} else {

					return (
						<tr key={id}>
							<td><Icon symbol="folder" /></td>
							<td>
								<Link to={link}>{displayName}</Link>
							</td>
							<td />
							<td />
							<td>
								<Icon symbol="folder" className="mobile-only" />
							</td>
						</tr>
					);

				}
			});

			let up = '/pattern/' + data.id.split('/').slice(0, -1).join('/');

			return (
				<table className="pattern-folder">
					<thead>
						<tr>
							<th width={10} />
							<th>Title</th>
							<th>Version</th>
							<th width={50} />
							<th width={50} />
						</tr>
					</thead>
					<tbody>
						<tr id="up!">
							<td><Icon symbol="folder" /></td>
							<td title="Folder up"><Link to={up}>..</Link></td>
							<td />
							<td />
							<td>
								<Icon symbol="folder" className="mobile-only" />
							</td>
						</tr>
						{rows}
					</tbody>
				</table>
			);

		} else if (type == 'pattern') {
			let content = 'Not found.';

			let frags = this.props.id ? this.props.id.split('/') : [];
			frags = frags.length > 1 ? frags.slice(0, frags.length - 1) : frags;

			let loader = data ? '' : <PatternLoader {...this.state} key="loader" />;

			if (data) {
				data = Array.isArray(data) ? data : [data];
				content = data.map((item) => {
					return <Pattern {...item} key={item.id} config={this.props.config} />
				});
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

		return <span>No type: {type}</span>;
	}
}

export default PatternSection;

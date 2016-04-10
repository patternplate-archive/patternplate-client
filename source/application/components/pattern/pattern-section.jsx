import {polyfill} from 'es6-promise';
polyfill();

import React from 'react';
import {PropTypes} from 'react';
import {Link} from 'react-router';
import CSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import shallowCompare from 'react-addons-shallow-compare';

import 'isomorphic-fetch';

import Pattern from './index';
import PatternLoader from './pattern-loader';
import Icon from '../common/icon';

import getAugmentedChildren from '../../utils/augment-hierarchy';

class PatternSection extends React.Component {
	displayName = 'PatternSection';
	state = {
		data: null,
		error: false,
		type: null
	};

	static propTypes = {
		id: PropTypes.string.isRequired
	};

	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	}

	async get(props) {
		const {navigation, id, config} = props;

		// check if this is a pattern or folder
		const splits = id.split('/');
		const last = splits.pop();

		const folder = splits.reduce((folder, pathItem) => folder[pathItem].children, navigation);
		const type = (folder && folder[last] && folder[last].type) || 'pattern';

		if (type === 'folder' && config.useFolderTable) {
			this.setState({
				data: folder[last],
				error: false,
				type: 'folder'
			});
			return;
		}

		const url = `/api/pattern/${id}`;

		let response;
		let data;

		try {
			response = await global.fetch(url, {
				headers: {
					Accept: 'application/json'
				},
				credentials: 'include'
			});
		} catch (err) {
			this.setState({
				data: null,
				error: true,
				type: null
			});
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
					data = await response.json();
					message = data.message || response.statusText;
				} catch (error) {
					message = `${response.statusText} ${url}`;
				}
				throw new Error(message);
			}
		} catch (error) {
			this.setState({
				data: null,
				error: true,
				type: null
			});
			this.props.eventEmitter.emit('error', `${error.message}`);
			return;
		}

		try {
			data = await response.json();
			if (!Array.isArray(data)) {
				data = [data];
			}
		} catch (err) {
			this.setState({
				data: null,
				error: true,
				type: null
			});
			this.props.eventEmitter.emit('error', `Could not parse data for ${url}`);
		}

		this.setState({
			data,
			error: false,
			type: 'pattern'
		});
	}

	componentWillMount() {
		this.setState({
			data: this.props.data,
			type: 'pattern'
		});
	}

	componentDidMount() {
		if (!this.state.data) {
			this.get(this.props);
		}
	}

	componentWillReceiveProps(props) {
		if (props.id !== this.props.id) {
			this.setState({
				data: null,
				type: 'pattern'
			});
			this.get(props);
		}
	}

	render() {
		const {type} = this.state;
		let {data} = this.state;

		const fragments = this.props.id.split('/');
		const paths = fragments
			.map((fragment, index) => {
				return {
					name: fragment,
					path: fragments.slice(0, index + 1).join('/')
				};
			});

		const breadcrumbs = paths.length > 1 ? (
			<ul className="pattern-breadcrumbs">
				{paths.map(path => {
					return (
						<li className="pattern-breadcrumb" key={path.name}>
							<Link
								to="pattern"
								params={{splat: path.path}}
								>
								<span>{path.name}</span>
							</Link>
						</li>
					);
				})}
			</ul>
		) : null;

		if (type === 'folder') {
			const {folders, patterns} = getAugmentedChildren(
				data.children,
				this.props.config.hierarchy
			);

			const rows = Object.values(folders.concat(patterns)).map(child => {
				const {type, displayName, id, manifest = {}} = child;
				const {options = {}, tags = [], flag} = manifest;
				const {hidden = false} = options;

				if (hidden) {
					return null;
				}

				const splat = id;
				const link = `pattern`;

				if (type === 'pattern') {
					return (
						<tr key={id}>
							<td><Icon symbol="pattern" /></td>
							<td><Link to={link} params={{splat}}>{displayName}</Link></td>
							<td>{child.manifest.version}</td>
							<td>
								{tags.map((tag, key) =>
									<span key={key} className="pattern-tag">{tag}</span>
								)}
							</td>
							<td>
								<span className={`pattern__flag pattern__flag--${flag}`}>
									{flag}
								</span>
							</td>
							<td>
								<Link to={link} params={{splat}} title="Show pattern">
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
				}
				return (
					<tr key={id}>
						<td><Icon symbol="folder" /></td>
						<td>
							<Link to={link} params={{splat}}>{displayName}</Link>
						</td>
						<td/>
						<td/>
						<td/>
						<td/>
						<td>
							<Icon symbol="folder" className="mobile-only" />
						</td>
					</tr>
				);
			});

			const link = `pattern`;
			const up = data.id.split('/').slice(0, -1).join('/');
			const nested = up.split('/').filter(Boolean).length > 0;

			return (
				<section className="pattern-section">
					{breadcrumbs}
					<table className="pattern-folder">
						<thead>
							<tr>
								<th width={10}/>
								<th>Title</th>
								<th>Version</th>
								<th>Tags</th>
								<th>Flag</th>
								<th width={50}/>
								<th width={50}/>
							</tr>
						</thead>
						<tbody>
							{nested &&
								<tr id="up!">
									<td><Icon symbol="folder" /></td>
									<td title="Folder up">
										<Link to={link} params={{splat: up}}>..</Link>
									</td>
									<td/>
									<td/>
									<td/>
									<td/>
									<td>
										<Icon symbol="folder" className="mobile-only" />
									</td>
								</tr>
							}
							{rows}
						</tbody>
					</table>
				</section>
			);
		} else if (type === 'pattern') {
			let content;
			let frags = this.props.id ? this.props.id.split('/') : [];
			frags = frags.length > 1 ? frags.slice(0, frags.length - 1) : frags;

			const loader = data ? '' : <PatternLoader {...this.state} key="loader" />;

			if (data) {
				data = Array.isArray(data) ? data : [data];
				content = data.map(item => {
					return <Pattern {...item} key={item.id} config={this.props.config}/>;
				});
			}

			return (
				<section className="pattern-section">
					{breadcrumbs}
					<CSSTransitionGroup
						component="div"
						transitionName="pattern-content-transition"
						transitionLeaveTimeout={500}
						transitionEnter={false}
						>
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

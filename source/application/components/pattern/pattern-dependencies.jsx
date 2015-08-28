import React from 'react';
import {PropTypes} from 'react';
import classnames from 'classnames';

import Icon from '../common/icon';

export default class PatternDependencies extends React.Component {

	getManifests(list) {
		let manifests = [];
		if (list) {
			for (let key of Object.keys(list)) {
				manifests.push(list[key]);
			}
		}
		return manifests;
	}

	render () {
		let dependencies = this.getManifests(this.props.data.dependencies);
		let dependents = this.getManifests(this.props.data.manifest.dependentPatterns);

		return (
			<div className="pattern-dependencies">
				<div className="pattern-dependencies-column">
					<div className="pattern-dependencies-column-headline">Dependencies</div>
					<ul className="pattern-dependencies-column-content">
						{dependencies.map((dependency) => {
							return (
								<li>
									<a href={'/pattern/' + dependency.id}>
										{dependency.manifest.displayName || dependency.manifest.name}
									</a>
								</li>
							);
						})}
					</ul>
				</div>
				<div className="pattern-dependencies-column">
					<div className="pattern-dependencies-column-headline">Pattern</div>
					<div className="pattern-dependencies-column-content">
						{this.props.data.manifest.displayName || this.props.data.manifest.name}
					</div>
				</div>
				<div className="pattern-dependencies-column">
					<div className="pattern-dependencies-column-headline">Dependent</div>
					<ul className="pattern-dependencies-column-content">
						{dependents.map((dependent) => {
							return (
								<li>
									<a href={'/pattern/' + dependent.id}>
										{dependent.displayName || dependent.name}
									</a>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		);
	}
}

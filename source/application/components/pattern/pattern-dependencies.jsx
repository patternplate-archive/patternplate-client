import React, {PropTypes as types} from 'react';
import {Link} from 'react-router';
import classnames from 'classnames';

export default class PatternDependencies extends React.Component {
	static defaultProps = {
		data: types.shape({
			manifest: types.shape({
				name: types.string,
				displayName: types.string,
				dependentPatterns: types.object
			}),
			dependencies: types.object
		})
	};

	render() {
		const {manifest} = this.props.data;
		const dependencies = Object.values(this.props.data.dependencies);
		const dependents = Object.values(this.props.data.manifest.dependentPatterns);
		const className = classnames(this.props.className, 'pattern-dependencies');

		return (
			<div className={className}>
				<div className="pattern-dependencies-column">
					<div className="pattern-dependencies-column-headline">Dependencies</div>
					<ul className="pattern-dependencies-column-content">
						{dependencies.map(dependency => {
							const splat = dependency.id;
							const name = dependency.manifest.displayName || dependency.manifest.name;
							return (
								<li key={splat}>
									<Link to="pattern" params={{splat}} title={name}>
										{name}
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
				<div className="pattern-dependencies-column">
					<div className="pattern-dependencies-column-headline">Pattern</div>
					<div className="pattern-dependencies-column-content center-pattern">
						{manifest.displayName || manifest.name}
					</div>
				</div>
				<div className="pattern-dependencies-column">
					<div className="pattern-dependencies-column-headline">Dependent</div>
					<ul className="pattern-dependencies-column-content">
						{dependents.map(dependent => {
							const splat = dependent.id;
							const name = dependent.displayName || dependent.name;
							return (
								<li key={splat}>
									<Link to="pattern" params={{splat}} title={name}>
										{name}
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		);
	}
}

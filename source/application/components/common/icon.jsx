import join from 'classnames';
import {uniq} from 'lodash';
import React, {PropTypes as t} from 'react';
import ReactDOM from 'react-dom';
import withSideEffect from 'react-side-effect';
import icons from './icons';

const iconNames = Object.keys(icons);

export default withSideEffect(toState, onChange)(Icon);

function toState(propsList) {
	const list = propsList
		.map(item => item.symbol)
		.sort();
	const symbols = uniq(list);
	return <IconRegistry symbols={symbols}/>;
}

function onChange(registry) {
	const element = getRegistryMountPoint();
	ReactDOM.render(registry, element);
}

function getRegistryMountPoint() {
	const found = document.querySelector('[data-icon-registry]');
	if (found) {
		return found;
	}

	const created = document.createElement('div');
	created.setAttribute('data-icon-registry', true);
	document.body.appendChild(created);
	return created;
}

function Icon(props) {
	const className = join('icon', props.className, {
		'icon--has-description': props.description
	});

	const textStyle = {display: props.fallback ? 'none' : null};
	const xlinkHref = `#${props.symbol}`;

	return (
		<div className={className} style={props.style}>
			<div className="svg-icon">
			{
				<svg className="svg">
					<use xlinkHref={xlinkHref}/>
				</svg>
			}
			</div>
			<div className="svg-text" style={textStyle}>
				{props.children}
			</div>
			{
				props.description &&
					<small className="icon__description">
						{props.description}
					</small>
			}
		</div>
	);
}

Icon.propTypes = {
	symbol: t.oneOf(iconNames).isRequired,
	className: t.string,
	fallback: t.bool.isRequired,
	children: t.any,
	description: t.string,
	style: t.object
};

Icon.defaultProps = {
	fallback: true
};

const hiddenStyles = {
	position: 'fixed',
	height: 0,
	width: 0,
	overflow: 'hidden',
	padding: 0,
	visibility: 'hidden'
};

function IconRegistry(props) {
	return (
		<svg style={hiddenStyles}>
			{
				props.symbols
					.map(symbol => {
						const paths = icons[symbol] || [];

						return (
							<symbol
								id={symbol}
								key={symbol}
								viewBox="0 0 24 24"
								>
								{
									paths.map((pathProps, index) => {
										const {tagName: Component = 'path', ...props} = pathProps;
										return <Component key={index} {...props}/>;
									})
								}
							</symbol>
							);
					})
			}
		</svg>
	);
}

IconRegistry.propTypes = {
	symbols: t.arrayOf(t.oneOf(iconNames)).isRequired
};

IconRegistry.defaultProps = {
	symbols: []
};

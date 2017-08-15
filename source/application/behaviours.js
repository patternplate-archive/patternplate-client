import React from 'react';

export function skippable(Component, prop = 'active') {
	return props => props[prop] === true ? <Component {...props}/> : null;
}

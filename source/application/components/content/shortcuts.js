import React, {PropTypes as t} from 'react';
import {Link} from 'react-router';

import Markdown from '../../containers/markdown';
import Lightbox from '../lightbox';

const source = `
> Better living through keyboard controls. :tada:

\`patternplate-client\` provides a number of keyboard shortcuts for your convenience.
Most links reveal attached keyboard shortcuts when hovered, complementing the table below.

| Combination         | Effect                                         |
|:-------------------:|:-----------------------------------------------|
`;

export default ShortcutsLightbox;

function ShortcutsLightbox(props) {
	const buttons = [
		<Link
			key="0"
			to={{
				...props.location,
				query: {
					...props.location.query,
					lightbox: false
				}
			}}
			title={`Close this lightbox ${props.shortcuts.close}`}
			className="button lightbox__button"
			>
			Close
		</Link>
	];

	const keys = Object.keys(props.shortcuts)
		.map(name => props.shortcuts[name])
		.filter(short => short.description)
		.map(short => {
			return `| \`${short.toString()}\` | ${short.description} |`;
		})
		.join('\n');

	const s = `${source}${keys}`;
	console.log(s);

	return (
		<Lightbox
			title="Keyboard shortcuts"
			backdrop
			buttons={buttons}
			>
			<Markdown
				base={props.base}
				className="lightbox__instructions"
				source={s}
				/>
		</Lightbox>
	);
}

ShortcutsLightbox.propTypes = {
	base: t.string.isRequired,
	location: t.shape({
		pathname: t.string.isRequired,
		query: t.object.isRequired
	}),
	shortcuts: t.object.isRequired
};

import React, {PropTypes as t} from 'react';
import {Link} from 'react-router';

import Markdown from '../../containers/markdown';
import Lightbox from '../lightbox';

const source = `
> Better living through keyboard controls. :tada:

\`patternplate-client\` provides a number of keyboard shortcuts for your convenience.
Most links reveal attached keyboard shortcuts when hovered, complementing the table below.

| Combination     | Scope      | Effect                                         |
|:---------------:|:----------:|:-----------------------------------------------|
|\`Ctrl+k\`       | Global     | Show this reference                            |
|\`Ctrl+c\`       | Global     | Toggle the debug console                       |
|\`Ctrl+d\`       | Global     | Open the documentation                         |
|\`Ctrl+e\`       | Global     | Toggle expansion of the sidebar                |
|\`Ctrl+enter\`   | Console    | Apply changes to application state             |
|\`Ctrl+f\`       | Pattern    | Open current pattern in new tab                |
|\`Ctrl+h\`       | Global     | Toggle visibility of hidden patterns           |
|\`Ctrl+i\`       | Global     | Toggle issue reportng helper                   |
|\`Ctrl+l\`       | Pattern    | Toggle pattern rulers                          |
|\`Ctrl+o\`       | Global     | Show/hide opacity indicators                   |
|\`Ctrl+r\`       | Pattern    | Reload the current pattern                     |
|\`Ctrl+space\`   | Global     | Toggle search focus                            |
|\`Ctrl+t\`       | Global     | Toggle active theme                            |
|\`Esc\`          | Global     | Close everything that could be considered open |
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
			title="Close this lightbox [esc]"
			className="button lightbox__button"
			>
			Close
		</Link>
	];
	return (
		<Lightbox
			title="Keyboard shortcuts"
			backdrop
			buttons={buttons}
			>
			<Markdown
				base={props.base}
				className="lightbox__instructions"
				source={source}
				/>
		</Lightbox>
	);
}

ShortcutsLightbox.propTypes = {
	base: t.string.isRequired,
	location: t.shape({
		pathname: t.string.isRequired,
		query: t.object.isRequired
	})
};

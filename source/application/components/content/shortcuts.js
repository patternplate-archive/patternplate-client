import React, {PropTypes as t} from 'react';
import {Link} from 'react-router';

import Markdown from '../../containers/markdown';
import Lightbox from '../lightbox';

const source = `
> Better living through keyboard controls. :tada:

\`patternplate-client\` provides a number of keyboard shortcuts for your convenience.
Most links reveal attached keyboard shortcuts when hovered, complementing the table below.

| Combination         | Scope      | Effect                                         |
|:-------------------:|:----------:|:-----------------------------------------------|
|\`Ctrl+Alt+k\`       | Global     | Show this reference                            |
|\`Ctrl+Alt+c\`       | Global     | Toggle the debug console                       |
|\`Ctrl+Alt+d\`       | Global     | Open the documentation                         |
|\`Ctrl+Alt+e\`       | Global     | Toggle expansion of the sidebar                |
|\`Ctrl+Alt+enter\`   | Console    | Apply changes to application state             |
|\`Ctrl+Alt+f\`       | Pattern    | Open current pattern in new tab                |
|\`Ctrl+Alt+h\`       | Global     | Toggle visibility of hidden patterns           |
|\`Ctrl+Alt+i\`       | Global     | Toggle issue reportng helper                   |
|\`Ctrl+Alt+l\`       | Pattern    | Toggle pattern rulers                          |
|\`Ctrl+Alt+o\`       | Global     | Show/hide opacity indicators                   |
|\`Ctrl+Alt+r\`       | Pattern    | Reload the current pattern                     |
|\`Ctrl+Alt+space\`   | Global     | Toggle search focus                            |
|\`Ctrl+Alt+t\`       | Global     | Toggle active theme                            |
|\`Esc\`              | Global     | Close everything that could be considered open |
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

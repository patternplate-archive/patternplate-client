import React from 'react';
import classnames from 'classnames';

class Toolbar extends React.Component {
	displayName = 'Toolbar';

	static defaultProps = {
		items: []
	};

	render () {
		let items = (this.props.items || []).map((item) => <option key={item.path} value={encodeURIComponent(item.path)}>{item.version} - {item.environment} - {item.revision}</option>)
		let available = items.length > 0;

		let display;

		if (available) {
			display = (<label className="download-select">
				<select name="path">
					{items}
				</select>
			</label>);
		} else {
			display = (<span className="download-select">No builds available</span>);
		}

		return (
			<form target="_blank" method="get" action="/api/build/" className="download-list">
				{display}
				<button className="download-button" type="submit" disabled={!available}>Download</button>
			</form>
		)
	}
}

export default Toolbar;

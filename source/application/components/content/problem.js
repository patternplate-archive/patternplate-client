import React, {Component, PropTypes as t} from 'react';
import {Link} from 'react-router';
import autobind from 'autobind-decorator';
// import strip from 'strip-indent';

import queryString from 'query-string';

import Lightbox from '../lightbox';
import Editor from '../common/editor';
import Markdown from '../../containers/markdown';

@autobind
export default class ProblemLightbox extends Component {
	static propTypes = {
		base: t.string.isRequired,
		state: t.string.isRequired,
		theme: t.oneOf(['dark', 'light']).isRequired,
		version: t.string.isRequired,
		serverVersion: t.string.isRequired,
		clientVersion: t.string.isRequired,
		browserName: t.string.isRequired,
		browserVersion: t.string.isRequired
	};

	render() {
		const {props} = this;
		const issueTemplate = getIssueTemplate(props, true);

		return (
			<Lightbox
				title="Report an issue"
				backdrop
				>
				<Markdown
					base={props.base}
					className="problem-lightbox__instructions"
					source={getInstructions(props)}
					/>
				<div className="problem-lightbox__preview">
					<Editor
						className="editor problem-lightbox__state"
						reaOnly
						value={issueTemplate}
						/>
				</div>
				<div className="problem-lightbox__button-row">
					<Link
						to={{
							...props.location,
							query: {
								...props.location.query,
								issue: false
							}
						}}
						title="Close this lightbox [esc]"
						className="button problem-lightbox__button problem-lightbox__button--abort"
						>
						Close
					</Link>
				</div>
			</Lightbox>
		);
	}
}

function getIssueTemplate(props, includeDetails) {
	return `
- [ ] Provide a brief title of the problem
- [ ] Describe what you are trying to do
- [ ] Describe actual behaviour
- [ ] Describe expected behaviour

## Steps to reproduce
\`[Describe how to produce the bug in the application by manual action]\`

## Actual
\`[The faulty behaviour as produced by the steps above]\`

## Expected
\`[Result of the steps above that match user expectations and allow usage]\`

${includeDetails ? getDetails(props) : ''}
`;
}

function getDetails(props) {
	return `
## Details
<details id="application-state">
<summary>Application State</summary>
\`\`\`json
${props.state}
\`\`\`
</details>
<details>
<summary>Versions</summary>
<table>
	<thead>
		<tr>
			<th>
				Software
			</th>
			<th>
				Version
			</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>
				patternplate
			</td>
			<th>
				${props.version}
			</td>
		</tr>
		<tr>
			<td>
				patternplate-server
			</td>
			<th>
				${props.serverVersion}
			</td>
		</tr>
		<tr>
			<td>
				patternplate-client
			</td>
			<th>
				${props.clientVersion}
			</td>
		</tr>
		<tr>
			<td>
				${props.browserName}
			</td>
			<th>
				${props.browserVersion}
			</td>
		</tr>
		<tr>
			<td>
				${props.runtimeName ? props.runtimeName : 'Runtime'}
			</td>
			<th>
				${props.runtimeVersion}
			</td>
		</tr>
		<tr>
			<td>
				${props.clientOsName ? props.clientOsName : 'OS'} (Client)
			</td>
			<th>
				${props.clientOsVersion}
			</td>
		</tr>
		<tr>
			<td>
				${props.serverOsName ? props.serverOsName : 'OS'} (Server)
			</td>
			<th>
				${props.serverOsVersion}
			</td>
		</tr>
	</tbody>
</table>
</details>
`;
}

function getInstructions(props) {
	const query = queryString.stringify({
		title: `[v${props.version}]`,
		body: `[Please paste the contents of patternplate issue template here]`
	});

	return `
> patternplate issue template, please use for issue reporting :bow:

\`[Cmd+A] [Cmd+C]\` the markdown below into a new isse at
[sinnerschrader/patternplate](https://github.com/sinnerschrader/patternplate/issues/new?${query})
`;
}

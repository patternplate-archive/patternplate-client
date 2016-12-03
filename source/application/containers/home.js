import {connect} from 'react-redux';
import unescapeHtml from 'unescape-html';
import Home from '../components/content/home';

export default connect(state => {
	return {
		base: state.base,
		readme: selectReadme(state)
	};
})(Home);

function getDefaultReadme(data) {
	return `
# :construction: Add documentation

> Undocumented software could not exist just as well.
>
> – The Voice of Common Sense

Currently there is no readme data at \`./patterns/readme.md\`, so we left this
friendly reminder here to change that soon.

You could start right away:

\`\`\`sh
echo "# ${data.name}\\n This patternplate contains ..." > patterns/readme.md
\`\`\`

Some ideas on what to write into your pattern readme

*  Why this Living Styleguide interface exists, e.g. what problems it should solve
*  What the components in are intended for, e.g. a brand, website or product
*  The component hierarchy you use, e.g. Atomic Design
*  Naming conventions
*  Rules for dependencies
*  Browser matrix

---

Help us to make this message more helpful on [GitHub](https://github.com/sinnerschrader/patternplate).

`;
}

function selectReadme(state) {
	if (state.schema.readme) {
		return unescapeHtml(state.schema.readme);
	}
	return getDefaultReadme({
		name: state.config.title || state.schema.name,
		description: state.schema.description
	});
}

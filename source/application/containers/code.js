import * as actions from '../actions';
import CodeButton from '../components/code-button';
import withToggle from '../connectors/with-toggle';
import withActiveForPattern from '../connectors/with-active-for-pattern';

const CodeToggle = withToggle(actions.toggleCode)(CodeButton);
export default withActiveForPattern(CodeToggle);

import * as actions from '../actions';
import Opacity from '../components/opacity';
import withToggle from '../connectors/with-toggle';
import withActiveForPattern from '../connectors/with-active-for-pattern';

const OpacityToggle = withToggle(actions.toggleOpacity)(Opacity);
export default withActiveForPattern(OpacityToggle);

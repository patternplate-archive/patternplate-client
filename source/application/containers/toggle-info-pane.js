import * as actions from '../actions';
import InfoPane from '../components/toggle-info-pane';
import withToggle from '../connectors/with-toggle';
import withActiveForPattern from '../connectors/with-active-for-pattern';
import {skippable} from '../components/behaviours';

const InfoPaneToggle = withToggle(actions.toggleInfo)(InfoPane);
export default withActiveForPattern(skippable(InfoPaneToggle));

import * as actions from '../actions';
import SearchButton from '../components/search-button';
import withToggle from '../connectors/with-toggle';

export default withToggle(actions.toggleSearch)(SearchButton);

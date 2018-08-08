import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
// import {
//   makeSelectRepos,
//   makeSelectLoading,
//   makeSelectError
// } from 'containers/App/selectors';
// import { loadRepos } from '../App/actions';
import { changeUsername, loadRepos, loadNetwork } from './actions';
import { 
  makeSelectUsername,
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
  
  makeSelectNetwork,
  makeSelectNetworkLoading,
  makeSelectLoadingNetworkError,

} from './selectors';
import reducer from './reducer';
import saga from './saga';
import HomePage from './HomePage';
 
const mapDispatchToProps = (dispatch) => ({
  onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
  onSubmitForm: (evt) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    dispatch(loadRepos());
  },
  onNetworkLoad: (evt) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    dispatch(loadNetwork());
  },
});

const mapStateToProps = createStructuredSelector({
  web3Info: makeSelectNetwork(),
  web3InfoLoading: makeSelectNetworkLoading(),
  web3InfoLoadingError: makeSelectLoadingNetworkError(),
  
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer, withSaga, withConnect)(HomePage);
export { mapDispatchToProps };

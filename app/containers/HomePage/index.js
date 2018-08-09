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
import { 
  changeUsername,
  loadRepos,
  loadNetwork,
  updateSelectedGasPrice, 
  loadGasPrice,
  changeTokenInfo,
  loadTokenInfo,
} from './actions';
import { 
  makeSelectUsername,
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
  
  makeSelectNetwork,
  makeSelectNetworkLoading,
  makeSelectLoadingNetworkError,

  makeSelectGasPrice,
  makeSelectGasPriceLoading,
  makeSelectLoadingGasPriceError,

  makeSelectTokenInfoLoading,
  makeSelectLoadingTokenInfoError,
  makeSelectTokenInfo,

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
  onLoadGasPrice: (evt) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    dispatch(loadGasPrice());
  },
  onLoadTokenInfo: (evt) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    dispatch(loadTokenInfo());
  },
  onUpdateSelectedGasPrice: (evt) => dispatch(updateSelectedGasPrice(evt)),
  onUpdateSelectTokenAddress: (evt) => dispatch(changeTokenInfo(evt)),
});

const mapStateToProps = createStructuredSelector({
  web3Info: makeSelectNetwork(),
  web3InfoLoading: makeSelectNetworkLoading(),
  web3InfoLoadingError: makeSelectLoadingNetworkError(),
  
  gasPriceInfo: makeSelectGasPrice(),
  gasPriceInfoLoading: makeSelectGasPriceLoading(),
  gasPriceInfoLoadingError: makeSelectLoadingGasPriceError(),
  
  tokenInfoLoading: makeSelectTokenInfoLoading(),
  tokenInfoLoadingError: makeSelectLoadingTokenInfoError(),
  tokenInfo: makeSelectTokenInfo(),

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

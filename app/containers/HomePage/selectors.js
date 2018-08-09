/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');
/**
 *   loadingNetwork: false,
  loadingNetworkError: '',
  networkInfo: null
 */

const makeSelectCurrentUser = () => createSelector(
  selectHome,
  (homeState) => homeState.get('currentUser')
);

const makeSelectLoading = () => createSelector(
  selectHome,
  (homeState) => homeState.get('loading')
);

const makeSelectError = () => createSelector(
  selectHome,
  (homeState) => homeState.get('error')
);

const makeSelectRepos = () => createSelector(
  selectHome,
  (homeState) => homeState.getIn(['userData', 'repositories'])
);


const makeSelectUsername = () => createSelector(
  selectHome,
  (homeState) => homeState.get('username')
);

///////// Network Load ///////

const makeSelectNetworkLoading = () => createSelector(
  selectHome,
  (homeState) => homeState.get('loadingNetwork')
);

const makeSelectLoadingNetworkError = () => createSelector(
  selectHome,
  (homeState) => homeState.get('loadingNetworkError')
);
 
const makeSelectNetwork = () => createSelector(
  selectHome,
  (homeState) => homeState.get('networkInfo')
);

///////// GasPrice Load ///////

const makeSelectGasPriceLoading = () => createSelector(
  selectHome,
  (homeState) => homeState.get('loadingGasPrice')
);

const makeSelectLoadingGasPriceError = () => createSelector(
  selectHome,
  (homeState) => homeState.get('loadingGaspriceError')
);
 
const makeSelectGasPrice = () => createSelector(
  selectHome,
  (homeState) => homeState.get('gasPrice')
);

export {
  selectHome,
  makeSelectUsername,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  
  makeSelectNetworkLoading,
  makeSelectLoadingNetworkError,
  makeSelectNetwork,

  makeSelectGasPriceLoading,
  makeSelectLoadingGasPriceError,
  makeSelectGasPrice,
};

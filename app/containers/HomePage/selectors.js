/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

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

///////// Token Info Load ///////

const makeSelectTokenInfoLoading = () => createSelector(
  selectHome,
  (homeState) => homeState.get('loadingTokenInfo')
);

const makeSelectLoadingTokenInfoError = () => createSelector(
  selectHome,
  (homeState) => homeState.get('loadingTokenInfoError')
);
 
const makeSelectTokenInfo = () => createSelector(
  selectHome,
  (homeState) => homeState.get('tokenInfo')
);

const makeSelectTokenAddress = () => createSelector(
  selectHome,
  (homeState) => homeState.get('tokenAddress')
);

const makeSelectTargetAddresses = () => createSelector(
  selectHome,
  (homeState) => homeState.get('targetAddresses')
);

///////// Tx Info Load ///////

const makeSelectTxInfoLoading = () => createSelector(
  selectHome,
  (homeState) => homeState.get('loadingTxInfo')
);

const makeSelectLoadingTxInfoError = () => createSelector(
  selectHome,
  (homeState) => homeState.get('loadingTxInfoError')
);
 
const makeSelectTxInfo = () => createSelector(
  selectHome,
  (homeState) => homeState.get('txInfo')
);

export {
  selectHome,  
  makeSelectNetworkLoading,
  makeSelectLoadingNetworkError,
  makeSelectNetwork,

  makeSelectGasPriceLoading,
  makeSelectLoadingGasPriceError,
  makeSelectGasPrice,

  makeSelectTokenInfoLoading,
  makeSelectLoadingTokenInfoError,
  makeSelectTokenInfo,

  makeSelectTokenAddress,
  makeSelectTargetAddresses,

  makeSelectTxInfoLoading,
  makeSelectLoadingTxInfoError,
  makeSelectTxInfo,
};

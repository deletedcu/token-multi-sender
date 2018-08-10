/**
 * Gets the repositories of the user from Github
 */
import Web3Utils from 'web3-utils';
import { call, put, select, takeLatest, take, all } from 'redux-saga/effects';
import { loadNetworkPromise, finalizeWeb3InfoPromise } from './getWeb3Promise';
import getGasPricePromise from './getGasPricePromise';
import { getDecimalsPromise, getBalancePromise, getEthBalancePromise, getAllowancePromise, 
  getCurrentFeePromise, getTokenSymbolPromise, getArrayLimitPromise } from './getTokenInfoPromise';
import { 
  LOAD_REPOS,
  LOAD_NETWORK,
  LOAD_GASPRICE,
  LOAD_TOKEN_INFO,
  LOAD_NETWORK_ERROR,
  LOAD_NETWORK_SUCCESS,
} from './constants';
import { 
  reposLoaded,
  repoLoadingError,
  loadNetwork,
  networkLoaded,
  networkLoadingError,

  gasPriceLoaded,
  gasPriceLoadingError,
  loadGasPrice,
  loadTokenInfo,
  tokenInfoLoaded,
  tokenInfoLoadingError,
 } from './actions';

import request from 'utils/request';
import { 
  makeSelectUsername,
  makeSelectNetwork, 
  makeSelectTokenAddress, 
} from './selectors';

/**
 * Github repos request/response handler
 */
export function* getRepos() {
  // Select username from store
  const username = yield select(makeSelectUsername());
  const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(request, requestURL);
    yield put(reposLoaded(repos, username));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

/**
 *  This is the saga called when HomePage container mounted. 
 */
export function* loadNetworkSaga() {
  try {
    const web3Info = yield call(loadNetworkPromise);
    const finalWeb3Info = yield call(finalizeWeb3InfoPromise, web3Info);
    yield put(networkLoaded(finalWeb3Info));
    yield put(loadGasPrice()); 
    yield put(loadTokenInfo());
  } catch (err) {
    yield put(networkLoadingError(err));
  }
}

/**
 *  This is the saga called when HomePage asks selectable gas price. 
 */
export function* loadGasPriceInfoSaga() {
  try {
    console.log('Gas Saga_ start');
    const gasPrice = yield call(getGasPricePromise);   
    yield put(gasPriceLoaded(gasPrice));
  } catch (err) {
    yield put(gasPriceLoadingError(err));
  }
}
/**
 *  This is the saga called when HomePage asks selectable token Info. 
 */
export function* loadTokenInfoSaga() {
  try {
    console.log('LoadToken_start');
    //// tokenInfo structuring
    const tokenInfo = {
      tokenAddress: yield select(makeSelectTokenAddress()),
      tokenDecimals: undefined,
      defAccTokenBalance: undefined,
      defAccEthBalance: undefined,
      allowance: undefined,
      currentFee: undefined,
      tokenSymbol: undefined,
      arrayLimit: undefined,
      
      jsonAddresses = [{"0x0": 0.0}],
      addresses_to_send: [],
      dublicates: [],
      totalBalance: 0,
      invalid_addresses: [],
      balances_to_send: []
    }
    const currentfinalWeb3Info = yield select(makeSelectNetwork());
    // console.log('BEFORE', tokenInfo);
    
    ////Process the ERC20 token and ETH
    if(Web3Utils.isAddress(currentfinalWeb3Info.defaultAccount) && tokenInfo.tokenAddress !== "0x000000000000000000000000000000000000bEEF"){
      //// get Decimals for ERC20 token
      console.log('ERC20', currentfinalWeb3Info)
      const param = {
        web3Info: currentfinalWeb3Info,
        address: tokenInfo.tokenAddress,
        decimals: null, 
        proxyMultiSenderAddress: process.env.REACT_APP_PROXY_MULTISENDER || '0xa5025faba6e70b84f74e9b1113e5f7f4e7f4859f'     
      }
      const tokenDecimals = yield call(getDecimalsPromise, param);  
      tokenInfo.tokenDecimals = tokenDecimals; 
      param.decimals = tokenDecimals;
      
      const defAccTokenBalance = yield call(getBalancePromise, param);
      tokenInfo.defAccTokenBalance = defAccTokenBalance;

      const defAccEthBalance = yield call(getEthBalancePromise, param);
      tokenInfo.defAccEthBalance = defAccEthBalance;

      const allowance = yield call(getAllowancePromise, param);
      tokenInfo.allowance = allowance;

      const currentFee = yield call(getCurrentFeePromise, param);
      tokenInfo.currentFee = currentFee;

      const tokenSymbol = yield call(getTokenSymbolPromise, param);
      tokenInfo.tokenSymbol = tokenSymbol;

      const arrayLimit = yield call(getArrayLimitPromise, param);
      tokenInfo.arrayLimit = arrayLimit;

    } else {
      // this.tokenAddress = tokenAddress;
      // await this.getCurrentFee()
      // await this.getEthBalance()
      // this.getArrayLimit()
      // this.decimals = 18;
      // this.defAccTokenBalance = this.ethBalance;
    }
    //// Get Decimals in the only ERC20 token    
    yield put(tokenInfoLoaded(tokenInfo));
  } catch (err) {
    yield put(tokenInfoLoadingError(err));
  }
}
/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_REPOS, getRepos);
  yield takeLatest(LOAD_NETWORK, loadNetworkSaga);
  yield takeLatest(LOAD_GASPRICE, loadGasPriceInfoSaga);
  yield takeLatest(LOAD_TOKEN_INFO, loadTokenInfoSaga);
}

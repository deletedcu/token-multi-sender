/**
 * Gets the repositories of the user from Github
 */
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { loadNetworkPromise, finalizeWeb3InfoPromise } from './getWeb3Promise';
import getGasPricePromise from './getGasPricePromise';
import { getDecimalsPromise } from './getTokenInfoPromise';
import { 
  LOAD_REPOS,
  LOAD_NETWORK,
  LOAD_GASPRICE,
  LOAD_TOKEN_INFO,
} from './constants';
import { 
  reposLoaded,
  repoLoadingError,

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
import { makeSelectUsername, makeSelectNetwork } from './selectors';

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
export function* loadNetwork() {
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
export function* loadGasPriceInfo() {
  try {
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
    const tokenInfo = {
      tokenDecimals: undefined,
    }

    const web3Info = yield select(makeSelectNetwork());
    console.log('sagaWeb3',web3Info);
    const param = {
      web3: web3Info.web3,
      address: '0xc8e2c43bb41d7ca1e7d60ae503ef858aab17f64c'
    }
    const tokenDecimals = yield call(getDecimalsPromise, param);  
    tokenInfo.tokenDecimals = tokenDecimals; 

    
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
  yield takeLatest(LOAD_NETWORK, loadNetwork);
  yield takeLatest(LOAD_GASPRICE, loadGasPriceInfo);
  yield takeLatest(LOAD_TOKEN_INFO, loadTokenInfoSaga);
}

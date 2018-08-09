/**
 * Gets the repositories of the user from Github
 */
import Web3 from 'web3'
import Web3Utils from 'web3-utils';
import ERC20ABI from '../../abis/ERC20ABI.json'
import StormMultiSenderABI from '../../abis/StormMultisender.json'

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { loadNetworkPromise, finalizeWeb3InfoPromise } from './getWeb3Promise';
import getGasPricePromise from './getGasPricePromise';

import { 
  LOAD_REPOS, 

  LOAD_NETWORK,

  LOAD_GASPRICE,

} from './constants';
import { 
  reposLoaded,
  repoLoadingError,

  networkLoaded,
  networkLoadingError,

  gasPriceLoaded,
  gasPriceLoadingError,
  loadGasPrice,
 } from './actions';

import request from 'utils/request';
import { makeSelectUsername } from './selectors';

const BN = require('bignumber.js');
function add(a, b) {
  return new BN(a).plus(new BN(b));
}

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
}

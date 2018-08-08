/**
 * Gets the repositories of the user from Github
 */
import Web3 from 'web3'
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { 
  LOAD_REPOS, 

  LOAD_NETWORK,
  LOAD_NETWORK_SUCCESS,
  LOAD_NETWORK_ERROR,
} from './constants';
import { 
  reposLoaded,
  repoLoadingError,

  networkLoaded,
  networkLoadingError,
 } from './actions';

import request from 'utils/request';
import { makeSelectUsername } from './selectors';


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
 * Load Blockchain Network
 */
function loadNetworkPromise() {
  return new Promise(function (resolve, reject) {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener('load', function () {
      var results
      var web3 = window.web3

      // Checking if Web3 has been injected by the browser (Mist/MetaMask)
      if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider.
        web3 = new window.Web3(web3.currentProvider)
        web3.version.getNetwork((err, netId) => {
          let netIdName, trustApiName, explorerUrl;
          console.log('netId', netId);
          switch (netId) {
            case "1":
              netIdName = 'Foundation'
              trustApiName = 'api'
              explorerUrl = 'https://etherscan.io'
              console.log('This is Foundation', netId)
              break;
            case "3":
              netIdName = 'Ropsten'
              trustApiName = 'ropsten'
              explorerUrl = 'https://ropsten.etherscan.io'
              console.log('This is Ropsten', netId)
              break;
            case "4":
              netIdName = 'Rinkeby'
              trustApiName = 'rinkeby'
              explorerUrl = 'https://rinkeby.etherscan.io'
              console.log('This is Rinkeby', netId)
              break;
            case "42":
              netIdName = 'Kovan'
              trustApiName = 'kovan'
              explorerUrl = 'https://kovan.etherscan.io'
              console.log('This is Kovan', netId)
              break;
            case "99":
              netIdName = 'POA Core'
              trustApiName = 'poa'
              explorerUrl = 'https://poaexplorer.com'
              console.log('This is Core', netId)
              break;
            case "77":
              netIdName = 'POA Sokol'
              trustApiName = 'https://trust-sokol.herokuapp.com'
              explorerUrl = 'https://sokol.poaexplorer.com'
              console.log('This is Sokol', netId)
              break;
            default:
              netIdName = 'Unknown'
              console.log('This is an unknown network.', netId)
          }
          document.title = `${netIdName} - MultiSender dApp`
          var defaultAccount = web3.eth.defaultAccount || null;
          if(defaultAccount === null){
            reject({message: 'Please unlock your metamask and refresh the page'})
          }
          results = {
            web3Instance: web3,
            netIdName,
            netId,
            injectedWeb3: true,
            defaultAccount,
            trustApiName,
            explorerUrl
          }
          resolve(results)
        })

        console.log('Injected web3 detected.');

      } else {
        // Fallback to localhost if no web3 injection.
        const errorMsg = `Metamask is not installed. Please go to
        https://metamask.io and return to this page after you installed it`
        reject({message: errorMsg})
        console.log('No web3 instance injected, using Local web3.');
        console.error('Metamask not found'); 
      }
    })
  })
}

/**
 *  Finalize the web3 info for usage.
 */
function finalizeWeb3InfoPromise(web3Config) {
  return new Promise(function (resolve, reject) {
    //this.getUserTokens(web3Config)
    let finalWeb3Info = {
      web3: null,
      defaultAccount: null,
      userTokens: null,
      netIdName: null,
    }
    const {web3Instance, defaultAccount, trustApiName, netIdName } = web3Config;
    window.fetch(`https://${trustApiName}.trustwalletapp.com/tokens?address=${defaultAccount}`).then((res) => {
      return res.json()
    }).then((res) => {
      let tokens = res.docs.map(({contract}) => {
        const {address, symbol} = contract;
        return {label: `${symbol} - ${address}`, value: address}
      })
      tokens.unshift({
        value: '0x000000000000000000000000000000000000bEEF',
        label: "ETH - Ethereum Native Currency"
      })
      console.log('web3 info finalized')
      // this.loading = false;
      finalWeb3Info.userTokens = tokens;
      finalWeb3Info.defaultAccount = defaultAccount;
      finalWeb3Info.web3 = new Web3(web3Instance.currentProvider); 
      finalWeb3Info.netIdName = netIdName;   
      resolve(finalWeb3Info);    
    }).catch((e) => {
      // this.loading = false;
      console.error(e);
      reject({message: e})
    })
  })

}

/**
 *  This is the saga called when HomePage container mounted. 
 */
export function* loadNetwork() {
  try {
    const web3Info = yield call(loadNetworkPromise);
    const finalWeb3Info = yield call(finalizeWeb3InfoPromise, web3Info);
    yield put(networkLoaded(finalWeb3Info));
  } catch (err) {
    yield put(networkLoadingError(err));
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
}

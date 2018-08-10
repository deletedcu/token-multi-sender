/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { 
  CHANGE_USERNAME,
  LOAD_REPOS,
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS_ERROR,

  LOAD_NETWORK,
  LOAD_NETWORK_SUCCESS,
  LOAD_NETWORK_ERROR,

  LOAD_GASPRICE,
  LOAD_GASPRICE_SUCCESS,
  LOAD_GASPRICE_ERROR,
  UPDATE_SELECTED_GAS_PRICE,

  LOAD_TOKEN_INFO,
  LOAD_TOKEN_INFO_SUCCESS,
  LOAD_TOKEN_INFO_ERROR,
  UPDATE_TOKEN_ADDRESS,

  LOAD_TARGET_ADDRESSES
} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
export function changeUsername(name) {
  return {
    type: CHANGE_USERNAME,
    name
  };
}

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export function loadRepos() {
  return {
    type: LOAD_REPOS,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function reposLoaded(repos, username) {
  return {
    type: LOAD_REPOS_SUCCESS,
    repos,
    username,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error,
  };
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~   INIT NETWORK LOAD  ~~~~~~~~~~~~~~~~~~~~~~~~~~~
/**
 * Load the blockchain provider network, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_NETWORK
 */
export function loadNetwork() {
  return {
    type: LOAD_NETWORK,
  };
}

/**
 * Dispatched when the web3 detected blockchain network
 *
 * @param  {object} networkInfo The blockchain network data
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function networkLoaded(networkInfo) {
  return {
    type: LOAD_NETWORK_SUCCESS,
    networkInfo,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} loadingNetworkError The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function networkLoadingError(loadingNetworkError) {
  return {
    type: LOAD_NETWORK_ERROR,
    loadingNetworkError,
  };
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~   GAS PRICE LOAD AND UPDATE  ~~~~~~~~~~~~~~~~~~~~~~~~~~~
/**
 * Load the Gas price, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_GASPRICE
 */
export function loadGasPrice() {
  return {
    type: LOAD_GASPRICE,
  };
}

/**
 * Dispatched when the gas price was obtained successfully
 *
 * @param  {object} gasPrice The blockchain gas data
 *
 * @return {object}      An action object with a type of LOAD_GASPRICE_SUCCESS
 */
export function gasPriceLoaded(gasPrice) {
  return {
    type: LOAD_GASPRICE_SUCCESS,
    gasPrice,
  };
}

/**
 * Dispatched when loading the gas price fails
 *
 * @param  {object} loadingGaspriceError The error
 *
 * @return {object}       An action object with a type of LOAD_GASPRICE_ERROR
 */
export function gasPriceLoadingError(loadingGaspriceError) {
  return {
    type: LOAD_GASPRICE_ERROR,
    loadingGaspriceError,
  };
}

/**
 * Dispatched when the gas price was changed by user
 *
 * @param  {object} selectedGasPrice The blockchain gas price selected by user
 *
 * @return {object}      An action object with a type of UPDATE_SELECTED_GAS_PRICE
 */
export function updateSelectedGasPrice(selectedGasPrice) {
  return {
    type: UPDATE_SELECTED_GAS_PRICE,
    selectedGasPrice,
  };
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~   TOKEN RELATED INFO LOAD AND UPDATE  ~~~~~~~~~~~~~~~~~~~~~~~~~~~
/**
 * Load the Token Info, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_TOKEN_INFO
 */
export function loadTokenInfo() {
  return {
    type: LOAD_TOKEN_INFO,
  };
}

/**
 * Dispatched when the token relation info was obtained successfully
 *
 * @param  {object} tokenInfo The blockchain token data
 *
 * @return {object}      An action object with a type of LOAD_TOKEN_INFO_SUCCESS 
 */
export function tokenInfoLoaded(tokenInfo) {
  return {
    type: LOAD_TOKEN_INFO_SUCCESS,
    tokenInfo,
  };
}

/**
 * Dispatched when loading the token info fails
 *
 * @param  {object} loadingTokenInfoError The error
 *
 * @return {object}       An action object with a type of LOAD_TOKEN_INFO_ERROR passing the error
 */
export function tokenInfoLoadingError(loadingTokenInfoError) {
  return {
    type: LOAD_TOKEN_INFO_ERROR,
    loadingTokenInfoError,
  };
}

/**
 * Dispatched when the token info was changed by user
 *
 * @param  {object} updatedTokenAddress The blockchain token address chosen by user
 *
 * @return {object}      An action object with a type of UPDATE_TOKEN_ADDRESS 
 */
export function changeTokenInfo(updatedTokenAddress) {
  return {
    type: UPDATE_TOKEN_ADDRESS,
    updatedTokenAddress,
  };
}

/**
 * Dispatched when the target addresses by user
 *
 * @param  {object} targetAddresses target address JSON chosen by user
 *
 * @return {object}      An action object with a type of UPDATE_TOKEN_ADDRESS 
 */
export function loadTargetAddresses(targetAddresses) {
  return {
    type: LOAD_TARGET_ADDRESSES,
    targetAddresses,
  };
}
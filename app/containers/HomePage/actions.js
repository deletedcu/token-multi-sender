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
  LOAD_TARGET_ADDRESSES,

  LOAD_TX_INFO,
  LOAD_TX_INFO_SUCCESS,
  LOAD_TX_INFO_ERROR,
  STOP_POLL_TX_STATUS,
  
} from './constants';

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
 * @return {object}      An action object with a type of LOAD_NETWORK_SUCCESS 
 */
export function networkLoaded(networkInfo) {
  return {
    type: LOAD_NETWORK_SUCCESS,
    networkInfo,
  };
}

/**
 * Dispatched when loading the data fails
 *
 * @param  {object} loadingNetworkError The error
 *
 * @return {object}       An action object with a type of LOAD_NETWORK_ERROR passing the error
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
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~   SET TOKEN TO SEND AND TARGET ADDRESSES  ~~~~~~~~~~~~~~~~~~~~~~~~~~~
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


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~   TX SEND INFO LOAD AND UPDATE  ~~~~~~~~~~~~~~~~~~~~~~~~~~~
/**
 * Load the Tx Info, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_TX_INFO
 */
export function loadTxInfo() {
  return {
    type: LOAD_TX_INFO,
  };
}

/**
 * Dispatched when the tx info was obtained successfully
 *
 * @param  {object} txInfo The blockchain tx data
 *
 * @return {object}      An action object with a type of LOAD_TX_INFO_SUCCESS 
 */
export function txInfoLoaded(txInfo) {
  return {
    type: LOAD_TX_INFO_SUCCESS,
    txInfo,
  };
}

/**
 * Dispatched when loading the tx info fails
 *
 * @param  {object} loadingTxInfoError The error
 *
 * @return {object}       An action object with a type of LOAD_TX_INFO_ERROR passing the error
 */
export function txInfoLoadingError(loadingTxInfoError) {
  return {
    type: LOAD_TX_INFO_ERROR,
    loadingTxInfoError,
  };
}

/**
 * stop the polling Tx status checck, this action starts the request saga
 *
 * @return {object} An action object with a type of STOP_POLL_TX_STATUS
 */
export function stopPollingTxStatus() {
  return {
    type: STOP_POLL_TX_STATUS,
  };
}
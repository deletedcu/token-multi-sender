/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';

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

  LOAD_TX_INFO,
  LOAD_TX_INFO_SUCCESS,
  LOAD_TX_INFO_ERROR,

  UPDATE_TOKEN_ADDRESS,
  LOAD_TARGET_ADDRESSES,
 } from './constants';
import { fail } from 'assert';

// The initial state of the App
const initialState = fromJS({
  loadingNetwork: false,
  loadingNetworkError: null,
  networkInfo: null,

  loadingGasPrice: null,
  loadingGaspriceError: null,
  gasPrice: null,

  loadingTokenInfo: null,
  loadingTokenInfoError: null,
  tokenInfo: null,
  tokenAddress: '0x000000000000000000000000000000000000bEEF',

  targetAddresses: null,

  loadingTxInfo: null,
  loadingTxInfoError: null,
  txInfo: null,
}); 

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_TX_INFO:
      return state
        .set('loadingTxInfo', true)
        .set('loadingTxInfoError', null);
    case LOAD_TX_INFO_SUCCESS:
      return state
        .set('loadingTxInfo', false)
        .set('txInfo', action.txInfo) ///This was arrived after converted as Immutable object
        .set('loadingTxInfoError', null); 
    case LOAD_TX_INFO_ERROR:
      return state
        .set('loadingTxInfo', false)        
        .set('loadingTxInfoError', action.loadingTxInfoError);      

    case LOAD_TARGET_ADDRESSES:
      return state
        .set('targetAddresses', action.targetAddresses);
    case LOAD_TOKEN_INFO:
      return state
        .set('loadingTokenInfo', true)
        .set('loadingTokenInfoError', null);
    case LOAD_TOKEN_INFO_SUCCESS:
      return state
        .set('loadingTokenInfo', false)
        .set('tokenInfo', action.tokenInfo)
        .set('loadingTokenInfoError', null); 
    case LOAD_TOKEN_INFO_ERROR:
      return state
        .set('loadingTokenInfo', false)        
        .set('loadingTokenInfoError', action.loadingTokenInfoError);          
    case UPDATE_TOKEN_ADDRESS:
      return  state
        .set('tokenAddress', action.updatedTokenAddress);

    case LOAD_GASPRICE:
      return state
        .set('loadingGasPrice', true)
        .set('loadingGaspriceError', null);
    case LOAD_GASPRICE_SUCCESS:
      return state
        .set('loadingGasPrice', false)
        .set('gasPrice', action.gasPrice)
        .set('loadingGaspriceError', null); 
    case LOAD_GASPRICE_ERROR:
      return state
        .set('loadingGasPrice', false)        
        .set('loadingGaspriceError', action.loadingGaspriceError);          
    case UPDATE_SELECTED_GAS_PRICE:
      return  state
        .set('gasPrice', action.selectedGasPrice)
        .set('loadingGaspriceError', null);

    case LOAD_NETWORK:
      return state
        .set('loadingNetwork', true)
        .set('loadingGasPrice', false)
        .set('loadingNetworkError', null)
    case LOAD_NETWORK_SUCCESS:
      return state
        .set('loadingNetwork', false)
        .set('networkInfo', action.networkInfo)
        .set('loadingNetworkError', null); 
    case LOAD_NETWORK_ERROR:
      return state
        .set('loadingNetwork', false)        
        .set('loadingNetworkError', action.loadingNetworkError);          
    default:
      return state;
  }
}

export default homeReducer;

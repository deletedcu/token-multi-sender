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
  CHANGE_USERNAME,
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
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

 } from './constants';
import { fail } from 'assert';

// The initial state of the App
const initialState = fromJS({
  username: '',

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
});

function homeReducer(state = initialState, action) {
  switch (action.type) {

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
    
    case LOAD_REPOS:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['userData', 'repositories'], false);
    case LOAD_REPOS_SUCCESS:
      return state
        .setIn(['userData', 'repositories'], action.repos)
        .set('loading', false)
        .set('currentUser', action.username);
    case LOAD_REPOS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case CHANGE_USERNAME:
      // Delete prefixed '@' from the github username
      return state.set('username', action.name.replace(/@/gi, ''));
    default:
      return state;
  }
}

export default homeReducer;

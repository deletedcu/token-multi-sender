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
  
 } from './constants';
import { fail } from 'assert';

// The initial state of the App
const initialState = fromJS({
  username: '',

  loadingNetwork: false,
  loadingNetworkError: '',
  networkInfo: null
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_NETWORK:
      return state
        .set('loadingNetwork', true)
        .set('loadingNetworkError', null);
    case LOAD_NETWORK_SUCCESS:
      return state
        .set('loadingNetwork', false)
        .set('networkInfo', action.networkInfo)
        .set('loadingNetworkError', null); 
    case LOAD_NETWORK_ERROR:
      return state
        .set('loadingNetwork', false)        
        .set('loadingNetworkError', action.networkError);          
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

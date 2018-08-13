/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_NETWORK = 'app/HomePage/LOAD_NETWORK';
export const LOAD_NETWORK_SUCCESS = 'app/HomePage/LOAD_NETWORK_SUCCESS';
export const LOAD_NETWORK_ERROR = 'app/HomePage/LOAD_NETWORK_ERROR';

export const LOAD_GASPRICE = 'app/HomePage/GASPRICE';
export const LOAD_GASPRICE_SUCCESS = 'app/HomePage/GASPRICE_SUCCESS';
export const LOAD_GASPRICE_ERROR = 'app/HomePage/GASPRICE_ERROR';
export const UPDATE_SELECTED_GAS_PRICE = 'app/HomePage/UPDATE_SELECTED_GAS_PRICE';

export const LOAD_TOKEN_INFO = 'app/HomePage/LOAD_TOKEN_INFO';
export const LOAD_TOKEN_INFO_SUCCESS = 'app/HomePage/LOAD_TOKEN_INFO_SUCCESS';
export const LOAD_TOKEN_INFO_ERROR = 'app/HomePage/LOAD_TOKEN_INFO_ERROR';

export const LOAD_TX_INFO = 'app/HomePage/LOAD_TX_INFO';
export const LOAD_TX_INFO_SUCCESS = 'app/HomePage/LOAD_TX_INFO_SUCCESS';
export const LOAD_TX_INFO_ERROR = 'app/HomePage/LOAD_TX_INFO_ERROR';
export const  STOP_POLL_TX_STATUS = 'app/HomePage/STOP_POLL_TX_STATUS'

export const UPDATE_TOKEN_ADDRESS = 'app/HomePage/UPDATE_TOKEN_ADDRESS';
export const LOAD_TARGET_ADDRESSES = 'app/HomePage/LOAD_TARGET_ADDRESSES';

export const DEFAULT_LOCALE = 'en';


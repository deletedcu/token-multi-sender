import Web3 from 'web3'
import Web3Utils from 'web3-utils';
import ERC20ABI from '../../abis/ERC20ABI.json'
import StormMultiSenderABI from '../../abis/StormMultisender.json'
import { select } from 'redux-saga/effects';
const BN = require('bignumber.js');
function add(a, b) {
  return new BN(a).plus(new BN(b));
}
function multiplier(decimals){
    return new BN(10).pow(Number(decimals))
}

import {
    makeSelectNetwork,
} from './selectors'

export function getDecimalsPromise(param) {
    return new Promise(function (resolve, reject) {
        try{ 
            const web3 = param.web3Info.web3;
            const address = param.address;
            console.log('web3, address', web3, address);
            const token = new web3.eth.Contract(ERC20ABI, address);
            let decimals 
            token.methods.decimals().call().then(function (result) {
                decimals = result;
                resolve(decimals);
            });            
        } catch(e) {
            console.error('Get Decimals', e);
            const error = 'Cannot get decimals for token contract.\n Please make sure you are on the right network and token address exists';            
            reject({message: error});
        }
    })
}

export function getBalancePromise(param) {
    return new Promise(function (resolve, reject) {
        try {
            const web3 = param.web3Info.web3;
            const address = param.address;
            const token = new web3.eth.Contract(ERC20ABI, address);
            let defAccTokenBalance 
            token.methods.balanceOf(param.web3Info.defaultAccount).call().then(function (result) {
                defAccTokenBalance = new BN(result).div(multiplier(param.decimals)).toString(10)
                resolve(defAccTokenBalance);
            });        
            
        }
        catch(e){
            const error = `${this.web3Store.defaultAccount} doesn't have token balance.\n Please make sure you are on the right network and token address exists`;
            console.error('getBalance',e);
            reject({message: error});
        }
    })  
}

export function getEthBalancePromise(param) {
    return new Promise(function (resolve, reject) {
        try {
            const web3 = param.web3Info.web3;
            let ethBalance;
            web3.eth.getBalance(param.web3Info.defaultAccount).then(function (result) {
                ethBalance = new BN(Web3Utils.fromWei(result)).toFormat(3)
                resolve(ethBalance);
            });   
          }
          catch(e){
            const error = 'Eth balance error';
            console.error('getETHBalance',e);
            reject({message: error});
          }
    })
  }
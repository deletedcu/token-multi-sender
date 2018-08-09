import Web3 from 'web3'
import Web3Utils from 'web3-utils';
import ERC20ABI from '../../abis/ERC20ABI.json'
import StormMultiSenderABI from '../../abis/StormMultisender.json'
import { select } from 'redux-saga/effects';
const BN = require('bignumber.js');
function add(a, b) {
  return new BN(a).plus(new BN(b));
}

import {
    makeSelectNetwork,
} from './selectors'

export function getDecimalsPromise(param) {
    return new Promise(function (resolve, reject) {
        try{ 
            const web3 = param.web3;
            const address = param.address;
            console.log('web3, address', web3, address);
            const token = new web3.eth.Contract(ERC20ABI, address);
            var decimals 
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
    // return new Promise(function (resolve, reject) {
    //     try {
    //         const web3 = param.web3;
    //         const token = new web3.eth.Contract(ERC20ABI, this.tokenAddress);
    //         const defAccTokenBalance = await token.methods.balanceOf(this.web3Store.defaultAccount).call();
    //         this.defAccTokenBalance = new BN(defAccTokenBalance).div(this.multiplier).toString(10)
    //         return this.defAccTokenBalance
    //     }
    //     catch(e){
    //         this.errors.push(`${this.web3Store.defaultAccount} doesn't have token balance.\n Please make sure you are on the right network and token address exists`)
    //         console.error('getBalance',e)
    //     }
    // })  
}
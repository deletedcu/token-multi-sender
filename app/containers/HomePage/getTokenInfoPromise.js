import Web3 from 'web3'
import Web3Utils from 'web3-utils';
import ERC20ABI from '../../abis/ERC20ABI.json'
import StormMultiSenderABI from '../../abis/StormMultisender.json'
import { select } from 'redux-saga/effects';
const BN = require('bignumber.js');
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
            const error = `${param.web3Info.defaultAccount} doesn't have token balance.\n Please make sure you are on the right network and token address exists`;
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

async function getAllowance(param){
    const web3 = param.web3Info.web3;
    const address = param.address;
    const token = new web3.eth.Contract(ERC20ABI, address);
    
    let result = await token.methods.allowance(param.web3Info.defaultAccount, param.proxyMultiSenderAddress).call();
    console.log('allowance_res1', result);
    let allowance = new BN(result).div(multiplier(param.decimals)).toString(10);
    console.log('allowance_res2', allowance);
    return allowance;
}
export function getAllowancePromise(param) {
    return new Promise(function (resolve, reject) {
        try {
            resolve(getAllowance(param))     
          }
          catch(e){
            const error= `Token address doesn't have allowance method.\n Please make sure you are on the right network and token address exists.\n
               Your account: ${param.web3Info.defaultAccount}`;
            console.error('GetAllowance',e);
            reject({message: error});
          }
    })
}

export function getCurrentFeePromise(param){
    return new Promise(function (resolve, reject) {
        try {
            const web3 = param.web3Info.web3;
            const multisender = new web3.eth.Contract(StormMultiSenderABI, param.proxyMultiSenderAddress);
            let currentFee;
            multisender.methods.currentFee(param.web3Info.defaultAccount).call().then(function (result) {
                currentFee = Web3Utils.fromWei(result)
                resolve(currentFee);
            });        
        }
        catch(e){
            console.error('getCurrentFee',e);
            const error = 'getCurrentFee Error';
            reject({message: error});
        }
    })
}

export function getTokenSymbolPromise(param) {
    return new Promise(function (resolve, reject) {
        try {
            const web3 = param.web3Info.web3;
            const address = param.address;
            const token = new web3.eth.Contract(ERC20ABI, address);
            let tokenSymbol;
            token.methods.symbol().call().then(function (result) {
                tokenSymbol = result;
                resolve(tokenSymbol);
            });        
        }
        catch(e){
          console.error(e);
          const error = 'Token with this Address doesnt exist.\n Please make sure you are on the right network and token address exists';
          reject({message: error});
        }
    })
  }

export function getArrayLimitPromise(param){
    return new Promise(function (resolve, reject) {
        try {
            const web3 = param.web3Info.web3;
            const multisender = new web3.eth.Contract(StormMultiSenderABI, param.proxyMultiSenderAddress);
            let arrayLimit;
            multisender.methods.arrayLimit().call().then(function (result) {
                arrayLimit = result;
                resolve(arrayLimit);
            });              
          }
          catch(e){
            console.error('GetArrayLimit', e);
            const error = 'GetArrayLimit';
            reject({message: error});
          }
    })
}

export function parseAddressesPromise(init_param){
    let param = Object.assign(init_param);
    param.addresses_to_send = []
    param.dublicates = []
    param.totalBalance = 0;
    param.invalid_addresses = [];
    param.balances_to_send = [];
    console.log('Input JSON data:', param.jsonAddresses)
    return new Promise((resolve, reject) => {
      
      param.jsonAddresses.forEach((account) => {
        const address = Object.keys(account)[0].replace(/\s/g, "");;
        console.log('address parse:', address);
        if(!Web3Utils.isAddress(address)){
          param.invalid_addresses.push(address);
        } else {
          let balance = Object.values(account)[0];
          param.totalBalance = new BN(balance).plus(param.totalBalance).toString(10)
          balance = multiplier(param.decimals).times(balance);
          const indexAddr = param.addresses_to_send.indexOf(address);
          if(indexAddr === -1){
            param.addresses_to_send.push(address);  
            param.balances_to_send.push(balance.toString(10))
          } else {
            if(param.dublicates.indexOf(address) === -1){
              param.dublicates.push(address);
            }
            param.balances_to_send[indexAddr] = (new BN(param.balances_to_send[indexAddr]).plus(balance)).toString(10)
          }
        }
      })
      
      param.jsonAddresses = param.addresses_to_send.map((addr, index) => {
        let obj = {}
        obj[addr] = (new BN(param.balances_to_send[index]).div(multiplier(param.decimals))).toString(10)
        return obj;
      })
      
      if(param.tokenAddress === "0x000000000000000000000000000000000000bEEF") {
        param.allowance = param.totalBalance
      }
      //// Total tx Numbers
      param.totalNumberTx = Math.ceil(param.jsonAddresses.length/param.arrayLimit);
      ////Total cost in Eth
      console.log('makeGas', param.selectedGasPrice);
                             //Web3Utils.toWei(this.selectedGasPrice.toString(), 'gwei')
      const standardGasPrice = Web3Utils.toWei(param.selectedGasPrice.toString(), 'gwei');
      param.standardGasPrice = standardGasPrice;
      const currentFeeInWei = Web3Utils.toWei(param.currentFee);
      const tx = new BN(standardGasPrice).times(new BN('5000000'))
      const txFeeMiners = tx.times(new BN(param.totalNumberTx))
      const contractFee = new BN(currentFeeInWei).times(param.totalNumberTx);      
      param.totalCostInEth = Web3Utils.fromWei(txFeeMiners.plus(contractFee).toString(10))
      resolve(param)
    })
  }

//// Other Non Promise Utilities called by external or internal.
  
function add(a, b) { ///internal called
    return new BN(a).plus(new BN(b));
}

function multiplier(decimals){ ///internal called
    return new BN(10).pow(Number(decimals))
}

// function totalBalanceWithDecimals(param) { ///external called by txSend module
//     return new BN(this.totalBalance).times(this.multiplier).toString(10)
// }
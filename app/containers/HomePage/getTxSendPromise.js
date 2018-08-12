import Web3Utils from 'web3-utils'
import ERC20ABI from "../../abis/ERC20ABI.json"
import MultiSenderAbi from "../../abis/StormMultisender.json"
const BN = require('bignumber.js');
import { stopPollingTxStatus } from './actions';
import { fromJS } from 'immutable';
/*  Test data, ArrayLimit = 2
[{"0x6464183dc7eeb27cc28ea78a33369f2e576f49c7":"0.12"},
{"0xaab80c40d93618cb8a27662454d606f9a9dc63f0":"0.13"},
{"0x9ea5bec188a33c290db3fe680e9fdb83a9fbf272":"0.14"}]
*/
export function multiSendPromise(param) {
    return new Promise(function (resolve, reject) {
        let txInfo = {
            hash: '',
            status: ''
        }
        let slice = param.tokenInfo.totalNumberTx; 
        const addPerTx = param.tokenInfo.arrayLimit;
        const token_address = param.tokenInfo.tokenAddress;    
        let {addresses_to_send, balances_to_send, proxyMultiSenderAddress, currentFee, totalBalance} =  param.tokenInfo;
        
        let ethValue = token_address === "0x000000000000000000000000000000000000bEEF" ? new BN(currentFee).plus(new BN(totalBalance)) : new BN(currentFee)
        const start = (slice - 1) * addPerTx;
        const end = slice * addPerTx;
        addresses_to_send = addresses_to_send.slice(start, end);
        balances_to_send = balances_to_send.slice(start, end);
        console.log('slice', slice, addresses_to_send[0], balances_to_send[0], addPerTx)
        const web3 = param.web3Info.web3;
        const multisender = new web3.eth.Contract(MultiSenderAbi, proxyMultiSenderAddress);
       
        try {  
          let encodedData = multisender.methods.multisendToken(token_address, addresses_to_send, balances_to_send).encodeABI({from: param.web3Info.defaultAccount});           
            console.log('encodedData', encodedData);

          let gas          
          web3.eth.estimateGas({
              from: param.web3Info.defaultAccount,
              data: encodedData,
              value: Web3Utils.toHex(Web3Utils.toWei(ethValue.toString())),
              to: proxyMultiSenderAddress
          }).then(function (result) {
            gas = result;
            
            console.log('gas', gas, param.tokenInfo.standardGasPrice);
            let tx = multisender.methods.multisendToken(token_address, addresses_to_send, balances_to_send)
            .send({
              from: param.web3Info.defaultAccount,
              gasPrice: param.tokenInfo.standardGasPrice,
              gas: Web3Utils.toHex(gas + 150000),
              value: Web3Utils.toHex(Web3Utils.toWei(ethValue.toString())),
            })    
            .on('transactionHash', (hash) => {
              console.log('multisend_txHash',hash)
              txInfo.hash = hash; 
              txInfo.status = 'pending';
              resolve(txInfo);
              console.log('TxResult', hash)
            })
            .on('error', (error) => {
              reject(error);
              console.log(error)
            })
          });
        } catch(e){
          reject(error);
          console.error(e)
        }
    })
  }
export function getTxStatus(param_input) { ///param = txInfo + web3
    const hash = param_input.txInfo.get('hash');
    return new Promise(function (resolve, reject) {
      const web3 = param_input.web3Info.web3;      
      web3.eth.getTransactionReceipt(hash, (error, res) => {
          console.log('web3 get tx callback');
        if(res && res.blockNumber){         
          if(res.status){
            const new_param = param_input.txInfo.set('status','mined');
            resolve(new_param);
            console.log('Mined', new_param)
          } else {
            const new_param = param_input.txInfo.set('status','error');
            resolve(new_param);
            console.log('Error')
          }          
        }
        else if( error) reject(error);
        else resolve(param_input.txInfo); ///original txInfo
      })
    })
  }

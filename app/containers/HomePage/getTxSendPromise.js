import Web3Utils from 'web3-utils'
import ERC20ABI from "../abis/ERC20ABI"
import MultiSenderAbi from "../abis/StormMultisender"
import Web3 from "web3";
import { observer } from "mobx-react";
const BN = require('bignumber.js');

/* ArrayLimit = 2
[{"0x6464183dc7eeb27cc28ea78a33369f2e576f49c7":"0.12"},
{"0xaab80c40d93618cb8a27662454d606f9a9dc63f0":"0.13"},

{"0x9ea5bec188a33c290db3fe680e9fdb83a9fbf272":"0.14"}]
*/
function multiSend(param) {
    const {slice, addPerTx} = param; 
    const token_address = this.tokenStore.tokenAddress
    let {addresses_to_send, balances_to_send, proxyMultiSenderAddress, currentFee, totalBalance} =  this.tokenStore;
    
    let ethValue = token_address === "0x000000000000000000000000000000000000bEEF" ? new BN(currentFee).plus(new BN(totalBalance)) : new BN(currentFee)
    const start = (slice - 1) * addPerTx;
    const end = slice * addPerTx;
    addresses_to_send = addresses_to_send.slice(start, end);
    balances_to_send = balances_to_send.slice(start, end);
    console.log('slice', slice, addresses_to_send[0], balances_to_send[0], addPerTx)
    const web3 = this.web3Store.web3;
    const multisender = new web3.eth.Contract(MultiSenderAbi, proxyMultiSenderAddress);

    try {
      let encodedData = await multisender.methods.multisendToken(token_address, addresses_to_send, balances_to_send).encodeABI({from: this.web3Store.defaultAccount})
      let gas = await web3.eth.estimateGas({
          from: this.web3Store.defaultAccount,
          data: encodedData,
          value: Web3Utils.toHex(Web3Utils.toWei(ethValue.toString())),
          to: proxyMultiSenderAddress
      })
      console.log('gas', gas)
      let tx = multisender.methods.multisendToken(token_address, addresses_to_send, balances_to_send)
      .send({
        from: this.web3Store.defaultAccount,
        gasPrice: this.gasPriceStore.standardInHex,
        gas: Web3Utils.toHex(gas + 150000),
        value: Web3Utils.toHex(Web3Utils.toWei(ethValue.toString())),
      })

      .on('transactionHash', (hash) => {
        console.log('multisend_txHash',hash)
        this.txHashToIndex[hash] = this.txs.length
        this.txs.push({status: 'pending', name: `Sending Batch #${this.txs.length + 1} ${this.tokenStore.tokenSymbol}\n
          From ${addresses_to_send[0]} to: ${addresses_to_send[addresses_to_send.length-1]}
        `, hash})
        this.getTxStatus(hash)
      })
      .on('error', (error) => {
        console.log(error)
      })
      slice--;
      if (slice > 0) {
        this._multisend({slice, addPerTx});
      } else {
          
      }
    } catch(e){
      console.error(e)
    }
  }  
 /**
   *  Finalize the web3 info for usage.
   */
  export default function getGasPricePromise() {
    return new Promise(function (resolve, reject) {
        let gasPricesArray = [
            {label: 'fast', value: '21'},
            {label: 'standard', value: '21'},
            {label: 'slow', value: '21'},
            {label: 'instant', value: '21'},
          ];
        let finalData = {
            gasPricesArray: gasPricesArray,
            selectedGasPrice: null,
            gasPrices: null,
        }
        fetch('https://gasprice.poa.network/').then((response) => {
            return response.json()
          }).then((data) => {
            finalData.gasPricesArray.map((v) => {
              v.value = data[v.label]
              v.label = `${v.label}: ${data[v.label]} gwei`
              return v;
            })
            finalData.selectedGasPrice = data.fast;
            finalData.gasPrices = data;
            console.log('gasPromise',finalData);
            resolve(finalData);
          }).catch((e) => {
            reject({message: e})
            console.error(e)
          })
    })  
  }
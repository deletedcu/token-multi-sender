/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import ReposList from 'components/ReposList';

import TargetAddressesTable from '../../components/TargetAddressesTable';
import TokenSelect from '../../components/TokenSelect';
import GasPriceSelect from '../../components/GasPriceSelect';
import TokenInfoPanel from '../../components/TokenInfoPanel';
import TxInfoPanel from '../../components/TxInfoPanel';
import Button from '@material-ui/core/Button';
import { Map } from 'immutable';
import './style.scss';
import Paper from '@material-ui/core/Paper';
import targetAddressList from '../../../target_addresses.json';

const styles = {
  title:{
    display: 'flex',
    flex:1,
    justifyContent:'center',
    color:'#407c25'
  },
  subTitle_normal: {
    color:'blue'
  }, 
  subTitle_error: {
    color: 'red'
  },
  notice:{
    color: '#b44923',
    fontStyle: 'italic'
  },
  error :{
    color: 'red'
  },
  settingPanel: {
      display: 'flex',
      flex:1,
      justifyContent:"space-around",
      alignItems:"center", 
      margin: "20px",
      padding:"8px"
  },
  sendButton: {
    backgroundColor:'#83c6f4',
    color: 'white'
  }
}
export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    const { onNetworkLoad } = this.props;
    this.loadTargetAddressAmountPair(targetAddressList);
    onNetworkLoad();
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }

  }
  loadTargetAddressAmountPair = (data) => {
    const { onLoadTargetAddresses } = this.props;
    let new_data = data.map(r => ({
      [r.wallet] : r.revenue      
    }))
    console.log(new_data);
    onLoadTargetAddresses(new_data);
  };

  handleChangeToken = select_state => {
    const { onUpdateSelectTokenAddress, onLoadTokenInfo } = this.props;    
    onUpdateSelectTokenAddress(select_state);
    onLoadTokenInfo();
  };
  handleChangeGasPrice = select_state => {    
    const {gasPriceInfo, onUpdateSelectedGasPrice, onLoadGasPrice} = this.props; 
    console.log('current gas', gasPriceInfo.selectedGasPrice);   
    let selectedGasPriceInfo = Object.assign(gasPriceInfo, {selectedGasPrice:select_state});
    onUpdateSelectedGasPrice(selectedGasPriceInfo);
    //onLoadGasPrice();
    console.log('changed price:', selectedGasPriceInfo, gasPriceInfo.selectedGasPrice);
  };

  handleClickSend = () => {
    this.props.onLoadTxInfo();
    console.log('send button');
  };

  render() {
    const { 
      loading, error, repos,
      web3InfoLoading, web3InfoLoadingError, web3Info, 
      gasPriceInfoLoading, gasPriceInfoLoadingError, gasPriceInfo,
      tokenInfoLoading, tokenInfoLoadingError, tokenInfo,
      txInfoLoading, txInfoLoadingError, txInfo,
    } = this.props;

    const reposListProps = {
      loading,
      error,
      repos,
    };
    const targetAddressProps = {targetAddressList}
    console.log('render',web3InfoLoading,gasPriceInfoLoading  )
    return (
      
      (!web3InfoLoading && !gasPriceInfoLoading) ? (
        <article>
          <Helmet>
            <title>TOKEN MULTI-SENDER</title>
            <meta name="description" content="Token MultiSender" />
          </Helmet>
          
          <div className="home-page">
            <section className="centered">
              <div style={styles.title}><h2>TOKEN MULTI-SENDER</h2><h2 style={web3Info ? styles.subTitle_normal:styles.subTitle_error}>{` ( ${web3Info ? web3Info.netIdName: ' Error'})`} </h2></div>
              <div style={styles.title}><h3>CURRENT ACCOUNT</h3><h3 style={web3Info ? styles.subTitle_normal:styles.subTitle_error}>{` ( ${web3Info ? web3Info.defaultAccount: ' Error'})`} </h3></div>
              <h3><p style ={styles.notice}> Make Sure Metamask Network Type and It was Unlocked.</p></h3>
              {(web3InfoLoadingError) && (<p style ={styles.error}>{web3InfoLoadingError.message}</p>) }              
            </section>
            <Paper>
              <div style={styles.settingPanel}>            
                {web3Info && <TokenSelect handleChangeToken = {this.handleChangeToken} userTokens = {web3Info.userTokens} />}            
                {gasPriceInfo && <GasPriceSelect 
                                  handleChangeGasPrice = {this.handleChangeGasPrice} 
                                  gasPricesArray = {gasPriceInfo.gasPricesArray} 
                                  />}
                <Button onClick = {this.handleClickSend} variant="raised" style={styles.sendButton}>
                  Send
                </Button>
              </div>
            </Paper>
            {!tokenInfoLoading && <TokenInfoPanel tokenInfo = {tokenInfo} tokenInfoLoadingError = {tokenInfoLoadingError} />}
            <TargetAddressesTable {...targetAddressProps}/>
            <div style={styles.txInfoPanel} >
              {txInfo && <TxInfoPanel txInfo = {txInfo} txInfoLoadingError = {txInfoLoadingError} />}
            </div>
          </div>
        </article>
      ) :
      (
        <div className="home-page">
          <section className="centered">
            <h2>{'Loading...'}</h2>
          </section>
        </div>
      )
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  repos: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,

  onNetworkLoad: PropTypes.func,  
  web3Info: PropTypes.object,
  web3InfoLoading : PropTypes.bool,
  web3InfoLoadingError: PropTypes.object,

  gasPriceInfo: PropTypes.object,
  gasPriceInfoLoading : PropTypes.bool,
  gasPriceInfoLoadingError: PropTypes.object,
  onUpdateSelectedGasPrice: PropTypes.func,
  onLoadGasPrice: PropTypes.func,

  tokenInfoLoading: PropTypes.bool,
  tokenInfoLoadingError: PropTypes.object,
  tokenInfo: PropTypes.object,
  onUpdateSelectTokenAddress: PropTypes.func,
  onLoadTokenInfo: PropTypes.func,
  onLoadTargetAddresses: PropTypes.func,

  onLoadTxInfo: PropTypes.func,
  txInfoLoading: PropTypes.bool,
  txInfoLoadingError: PropTypes.object,
  txInfo: PropTypes.instanceOf(Map),
};

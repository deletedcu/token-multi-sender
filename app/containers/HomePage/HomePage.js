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
import Button from '@material-ui/core/Button';

import './style.scss';

import targetAddressList from '../../../target_addresses.json';

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

  handleClickSend = data => {

  };

  render() {
    const { 
      loading, error, repos,
      web3InfoLoading, web3InfoLoadingError, web3Info, 
      gasPriceInfoLoading, gasPriceInfoLoadingError, gasPriceInfo,
      tokenInfoLoading, tokenInfoLoadingError, tokenInfo,
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
            <title>Token MultiSender</title>
            <meta name="description" content="Token MultiSender" />
          </Helmet>
          
          <div className="home-page">
            <section className="centered">
              <h2>{`Token MultiSender ( ${web3Info ? web3Info.netIdName: 'Error'})`} </h2>
              <h2>{`Current Account  ${web3Info ? web3Info.defaultAccount: 'Error'}`} </h2>
              <h3><p> Notice: <i>Before Usage, </i> Confirm Metamask Network Type and It was Unlocked.</p></h3>
              {(web3InfoLoadingError) && (<p>{web3InfoLoadingError.message}</p>) }              
            </section>
            <div style={{ 
              display: 'flex',
              flex:1, 
              border:"1px solid blue", 
              justifyContent:"space-around",
              alignItems:"center", 
              margin: "20px",
              padding:"8px"}}
            >
              {web3Info && <TokenSelect handleChangeToken = {this.handleChangeToken} userTokens = {web3Info.userTokens} />}            
              {gasPriceInfo && <GasPriceSelect 
                                handleChangeGasPrice = {this.handleChangeGasPrice} 
                                gasPricesArray = {gasPriceInfo.gasPricesArray} 
                                />}
              <Button variant="raised" style={{backgroundColor:'green'}}>
                Validate
              </Button>
            </div>
            {!tokenInfoLoading && <TokenInfoPanel tokenInfo = {tokenInfo} tokenInfoLoadingError = {tokenInfoLoadingError} />}
            <TargetAddressesTable {...targetAddressProps}/>
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
};

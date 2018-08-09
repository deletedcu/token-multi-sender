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
import './style.scss';

import targetAddressList from '../../../target_addresses.json';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }
    this.props.onNetworkLoad();
  }
  
  handleChangeToken = select_state => {
    console.log('select:', select_state);
    //this.setState({ [event.target.name]: event.target.value });
  };
  handleChangeGasPrice = select_state => {
    console.log('gas price:', select_state);
    //this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { 
      loading, error, repos,
      web3InfoLoading, web3InfoLoadingError, web3Info, 
      gasPriceInfoLoading, gasPriceInfoLoadingError, gasPriceInfo,
    } = this.props;

    const reposListProps = {
      loading,
      error,
      repos,
    };
    const targetAddressProps = {targetAddressList}
    return (
      (!web3InfoLoading || !gasPriceInfoLoading) ? (
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
              padding:"8px"}}
            >
              {web3Info && <TokenSelect handleChangeToken = {this.handleChangeToken} userTokens = {web3Info.userTokens} />}            
              {gasPriceInfo && <GasPriceSelect handleChangeGasPrice = {this.handleChangeGasPrice} gasPricesArray = {gasPriceInfo.gasPricesArray} />}
            </div>
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

};

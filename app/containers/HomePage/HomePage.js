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

import './style.scss';

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

  render() {
    const { 
      loading, error, repos,
      web3InfoLoading, web3InfoLoadingError, web3Info, 
    } = this.props;
    const reposListProps = {
      loading,
      error,
      repos,
    };
    
    return (
      (! web3InfoLoading) && (
        <article>
          <Helmet>
            <title>Token MultiSender</title>
            <meta name="description" content="Token MultiSender" />
          </Helmet>
          
          <div className="home-page">
            <section className="centered">
              <h2>{`Token MultiSender ( ${web3Info ? web3Info.netIdName: 'Error'})`} </h2>
              <h2>{`Current Account  ${web3Info ? web3Info.defaultAccount: 'Error'}`} </h2>
              <p><h3> Notice: <i>Before Usage, </i> Confirm Metamask Network Type and It was Unlocked.</h3></p>
              {(web3InfoLoadingError) && (<p>{web3InfoLoadingError.message}</p>) }
            </section>
            <TargetAddressesTable />
            {/* <section>
              <h2>Try me!</h2>
              <form onSubmit={this.props.onSubmitForm}>
                <label htmlFor="username">
                Show Github repositories by
                  <span className="at-prefix">@</span>
                  <input
                    id="username"
                    type="text"
                    placeholder="flexdinesh"
                    value={this.props.username}
                    onChange={this.props.onChangeUsername}
                  />
                </label>
              </form>
              <ReposList {...reposListProps} />
            </section> */}
          </div>
        </article>
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
};

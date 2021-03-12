/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import ResultScreen from './src/Pages/ResultScreen';
import IntroScreen from './src/Pages/IntroScreen';

class SkinAI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      transferData: null,
      scale: false
    };
  }

  changePage = (page) => {
    this.setState({currentPage: page});
  };

  exitPage = () => {
    // console.log('Back Page');
    // const {exitPage} = this.props;
    // exitPage && exitPage();
    this.props.navigation.goBack();
  };

  setTransferData = (data, scale) => {
    this.setState({
      transferData: data,
      scale: scale
    });
  };

  render() {
    const {
      email = 'ktpm489@gmail.com',
      apikey = 'NWY0N2FkMjg4ZjFiYmIwYWViZDBkNDdhXzU2Nzg5MTBfSG5mMlJRcDhMbkNuWWhBQw==',
      linkserver = 'https://shrouded-brushlands-68077.herokuapp.com',
      language = 'en',
    } = this.props;
    return this.state.currentPage === 0 ? (
      <IntroScreen
        exitPage={this.exitPage}
        changePage={this.changePage}
        email={email}
        apikey={apikey}
        linkserver={linkserver}
        language={language}
        setTransferData={this.setTransferData}
      />
    ) : (
      <ResultScreen
        changePage={this.changePage}
        language={language}
        setTransferData={this.setTransferData}
        transferData={this.state.transferData}
        scale={this.state.scale}
      />
    );
  }
}

export default SkinAI;

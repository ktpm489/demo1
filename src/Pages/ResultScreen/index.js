import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import Result from '../../Components/Result';
import LoadImage from '../../Components/LoadImage';
import Header from '../../Container/CoreHeader/index';
import {width} from '../../Common/styles';

class ResultScreen extends React.Component {
  constructor(props){
    super(props)
  }

  backAction = () => {
    const {changePage, setTransferData} = this.props;
    setTransferData && setTransferData(null);
    changePage && changePage(0);
  };

  render() {
    return (
      <View>
        <Header title={'AI Skin Analysis'} leftAction={this.backAction} />
        <ScrollView
          style={{
            position: 'relative',
            padding: width(1),
            height: '90%',
            paddingBottom: 0,
            backgroundColor: 'transparent',
          }}>
          <View style={{position: 'relative', paddingBottom: 40}}>

            <LoadImage
              dataTransfer={this.props.transferData.facedata}
              language={this.props.language}
              scale={this.props.scale}
            />

            <Result
              dataTransfer={this.props.transferData.facedata.generalResult}
              language={this.props.language}
            />

            <Result
              dataTransfer={this.props.transferData.facedata.specialResult}
              language={this.props.language}
            />

            <Result
              dataTransfer={this.props.transferData.facedata.generalConclusion}
              language={this.props.language}
            />

            <Result
              dataTransfer={this.props.transferData.facedata.specialConclusion}
              language={this.props.language}
              special={true}
            />

          </View>
        </ScrollView>
      </View>
    );
  }
}

export default ResultScreen;

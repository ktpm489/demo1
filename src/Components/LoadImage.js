import React, {useState} from 'react';
import {View, Image, StyleSheet, Dimensions, Switch, Text} from 'react-native';
import {width, height} from '../Common/styles';
const MYWIDTH = Dimensions.get('window').width;
// const MYHEIGHT = Dimensions.get('window').height;
const heighPercent = 0.5;
const widthMargin = 0 / 100;
// const widthImage = 480;
// const heightImage = 640;
// const ratio = (width(100) - width(2)) / widthImage;
// const ratio = MYWIDTH / widthImage;
// console.log('ratio', ratio, MYWIDTH);
// const ratioHeight = MYWIDTH / heightImage;

const widthDevice = Math.round(Dimensions.get('window').width)

class DisplayAnImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSpotEnabled: false,
      isMoleEnabled: false,
      isBlackEnabled: false,
      isAnceEnabled: false,
      isPimpleEnabled: false,
      drawSpotArrData: [],
      drawMoleArrData: [],
      drawBlackHeadArrData: [],
      drawAcneArrData: [],
      drawPimpleArrData: [],
    };
  }

  componentDidMount() {
    this.processGeneralConclusion();
    this.processSpecialResult();
    this.processRatio();
  }

  processGeneralConclusion = () => {
    const {dataTransfer} = this.props;
    let itemSkinMole = dataTransfer.generalConclusion.data.find((item) => {
      return item.key === 'SkinMole';
    });
    this.setState({drawMoleArrData: itemSkinMole.drawArr});
  };

  processSpecialResult = () => {
    let drawSpotArrDataInput = [];
    let drawBlackHeadArrDataInput = [];
    let drawAcneArrDataInput = [];
    let drawPimpleArrDataInput = [];
    const {dataTransfer} = this.props;
    for (let i = 0; i < dataTransfer.specialResult.data.length; i++) {
      let itemData = dataTransfer.specialResult.data[i];
      for (let j = 0; j < itemData.data.length; j++) {
        let eachData = itemData.data[j];
        if (eachData.key === 'SkinBlackHeads') {
          drawBlackHeadArrDataInput = eachData.drawArr;
        } else if (eachData.key === 'SkinSpot') {
          drawSpotArrDataInput = eachData.drawArr;
        } else if (eachData.key === 'SkinPimple') {
          drawPimpleArrDataInput = eachData.drawArr;
        } else if (eachData.key === 'SkinAcne') {
          drawAcneArrDataInput = eachData.drawArr;
        }
      }
    }
    // console.log('drawBlackHeadArrDataInput', drawBlackHeadArrDataInput);
    // console.log('drawSpotArrDataInput', drawSpotArrDataInput);
    // console.log('drawPimpleArrDataInput', drawPimpleArrDataInput);
    // console.log('drawAcneArrDataInput', drawAcneArrDataInput);
    this.setState({
      drawSpotArrData: drawSpotArrDataInput,
      drawBlackHeadArrData: drawBlackHeadArrDataInput,
      drawAcneArrData: drawAcneArrDataInput,
      drawPimpleArrData: drawPimpleArrDataInput,
    });
  };

  processRatio = () => {
    const {dataTransfer} = this.props;
    const widthImage = dataTransfer.image_info.width;
    const heightImage = dataTransfer.image_info.height;
    const ratio = (width(100) - width(2)) / widthImage;
    // console.log('ratio', ratio, MYWIDTH);
    const ratioHeight = MYWIDTH / heightImage;
    this.setState({
      ratio,
      ratioHeight,
    });
  };

  renderData = (data, color = 'red') => {
    const {ratioHeight, ratio} = this.state;
    return data.map(function (item, i) {
      return (
        <View
          style={[
            styles.rectangle,
            {
              height: ratioHeight * item.height,
              left: ratio * item.left,
              top: ratioHeight * item.top,
              width: ratio * item.width,
              borderColor: color,
            },
          ]}
          key={String(i)}
        />
      );
    });
  };

  // spot
  toggleSpotSwitch = () => {
    this.setState({isSpotEnabled: !this.state.isSpotEnabled});
  };
  // mole
  toggleMoleSwitch = () => {
    this.setState({isMoleEnabled: !this.state.isMoleEnabled});
  };
  // blackhead
  toggleBlackSwitch = () => {
    this.setState({isBlackEnabled: !this.state.isBlackEnabled});
  };
  // ance
  toggleAnceSwitch = () => {
    this.setState({
      isAnceEnabled: !this.state.isAnceEnabled,
    });
  };
  // pimple
  togglePimpleSwitch = () => {
    this.setState({
      isPimpleEnabled: !this.state.isPimpleEnabled,
    });
  };

  // SkinBlackHeads
  // SkinMole (normal)
  // SkinSpot
  // SkinPimple
  // SkinAcne

  render() {
    const {
      isSpotEnabled,
      isMoleEnabled,
      isBlackEnabled,
      isAnceEnabled,
      isPimpleEnabled,
      drawMoleArrData,
      drawSpotArrData,
      drawBlackHeadArrData,
      drawAcneArrData,
      drawPimpleArrData,
    } = this.state;
    const {dataTransfer, language} = this.props;
    console.log(dataTransfer, language);
    let isEN = language === 'en';
    return (
      <View style={styles.container}>
        <View style={[styles.imageContainer, this.props.scale ? {transform: [{ scaleX: -1 }]} : {}]}>
          <Image
            style={styles.logo}
            source={{
              uri: dataTransfer.image_info.url
                ? dataTransfer.image_info.url
                : 'http://res.cloudinary.com/hobbg5cc2/image/upload/v1598702124/uploads/images/1598702122594.jpg',
            }}
          />
          {isSpotEnabled ? this.renderData(drawSpotArrData, 'orange') : null}
          {isMoleEnabled ? this.renderData(drawMoleArrData, 'red') : null}
          {isBlackEnabled
            ? this.renderData(drawBlackHeadArrData, 'pink')
            : null}
          {isAnceEnabled ? this.renderData(drawAcneArrData, 'yellow') : null}
          {isPimpleEnabled ? this.renderData(drawPimpleArrData, 'green') : null}
        </View>
        <View style={styles.viewContainer}>
          <View
            style={[
              styles.itemContainer,
              drawSpotArrData.length === 0 && styles.disabledOpt,
            ]}>
            <Text style={styles.textContainer}>
              {isEN ? 'Spot' : 'Đốm thâm nám'}
            </Text>
            <Switch
              trackColor={{false: '#767577', true: 'orange'}}
              onValueChange={this.toggleSpotSwitch}
              value={isSpotEnabled}
              disabled={drawSpotArrData.length === 0}
            />
          </View>
          <View
            style={[
              styles.itemContainer,
              drawAcneArrData.length === 0 && styles.disabledOpt,
            ]}>
            <Text style={styles.textContainer}> {isEN ? 'Acne' : 'Mụn'}</Text>
            <Switch
              trackColor={{false: '#767577', true: 'yellow'}}
              onValueChange={this.toggleAnceSwitch}
              value={isAnceEnabled}
              disabled={drawAcneArrData.length === 0}
            />
          </View>
        </View>
        <View style={styles.viewContainer}>
          <View
            style={[
              styles.itemContainer,
              drawPimpleArrData.length === 0 && styles.disabledOpt,
            ]}>
            <Text style={styles.textContainer}>
              {isEN ? 'Pimple' : 'Mụn Nhọt'}
            </Text>
            <Switch
              trackColor={{false: '#767577', true: 'green'}}
              onValueChange={this.togglePimpleSwitch}
              value={isPimpleEnabled}
              disabled={drawPimpleArrData.length === 0}
            />
          </View>
          <View
            style={[
              styles.itemContainer,
              drawBlackHeadArrData.length === 0 && styles.disabledOpt,
            ]}>
            <Text style={styles.textContainer}>
              {isEN ? 'Blackhead' : 'Mụn Đầu Đen'}
            </Text>
            <Switch
              trackColor={{false: '#767577', true: 'pink'}}
              onValueChange={this.toggleBlackSwitch}
              value={isBlackEnabled}
              disabled={drawBlackHeadArrData.length === 0}
            />
          </View>
        </View>
        <View style={styles.viewContainer}>
          <View
            style={[
              styles.itemContainer,
              drawMoleArrData.length === 0 && styles.disabledOpt,
            ]}>
            <Text style={styles.textContainer}>
              {isEN ? 'Mole' : 'Nốt ruồi'}
            </Text>
            <Switch
              trackColor={{false: '#767577', true: 'red'}}
              onValueChange={this.toggleMoleSwitch}
              disabled={drawMoleArrData.length === 0}
              value={isMoleEnabled}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textContainer: {
    width: width(25),
    fontSize: widthDevice * 0.04
  },
  disabledOpt: {
    opacity: 0.3,
  },
  enableOpt: {
    opacity: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingTop: height(2),
  },
  container: {
    // marginHorizontal: MYWIDTH * widthMargin,
    // padding : 0,
    flex: 1,
    position: 'relative',
    justifyContent: 'flex-start',
    // height: 400,
  },
  logo: {
    width: '100%',
    height: '100%',
    // backgroundColor: 'red',
    // resizeMode: 'stretch',
    resizeMode: 'stretch',
  },
  imageContainer: {
    width: '100%',
    height: width(100),
  },
  rectangle: {
    borderWidth: 1,
    position: 'absolute',
  },
});

export default DisplayAnImage;

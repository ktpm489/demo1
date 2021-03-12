'use strict';
import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Slider,
  Platform,
  Image,
  Dimensions
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import images from '../../Assets/Images';

const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

export default class ExampleApp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      type: RNCamera.Constants.Type.front,
      oval: 0,
      cameraWidth: 0,
      cameraHeight: 0
    };
  }

  change = (value) => {
    this.setState({value: parseFloat(value)});
  };

  goBack = () => {
    const {goBackScreen} = this.props;
    goBackScreen && goBackScreen();
  };

  changeType = () => {
    const {type} = this.state;
    if(type !== RNCamera.Constants.Type.back){
      this.setState({type: RNCamera.Constants.Type.back});
    }else{
      this.setState({type: RNCamera.Constants.Type.front});
    }
  };

  takePicture = async () => {
    if (this.camera) {
      const {setChangeImage} = this.props;
      const {type} = this.state;
      const options = {
        quality: 1,
        base64: true,
        width: width,
        height: width * 1.2,
        mirrorImage:
          Platform.OS === 'android'
            ? false
            : type === RNCamera.Constants.Type.front,
      };
      const data = await this.camera.takePictureAsync(options);
      const scale = this.state.type == RNCamera.Constants.Type.front ? true : false;
      setChangeImage && setChangeImage(data, scale);
      this.goBack();
    }
  };

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.containerRow}>
          <TouchableOpacity style={styles.btn} onPress={this.goBack}>
            <Image source={images.icBack} style={styles.icon} />
          </TouchableOpacity>
          <Slider
            style={styles.slider}
            minimumTrackTintColor={'#ff85a6'}
            thumbTintColor={'#ff85a6'}
            step={0.03}
            maximumValue={0.3}
            onValueChange={this.change}
            value={this.state.value}
          />
          <TouchableOpacity style={styles.btn} onPress={this.changeType}>
            <Image source={images.icSync} style={styles.icon} />
          </TouchableOpacity>
        </View>

        <View style={styles.viewCamera}>
          <RNCamera
            ref={(ref) => {
              this.camera = ref;
            }}
            zoom={this.state.value}
            style={styles.camera}
            type={this.state.type}
            captureAudio={false}
            flashMode={RNCamera.Constants.FlashMode.off}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            androidRecordAudioPermissionOptions={{
              title: 'Permission to use audio recording',
              message: 'We need your permission to use your audio',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
          />
          <View style={styles.containerOval}>
            <View style={styles.oval}></View>
          </View>
        </View>

        <TouchableOpacity style={styles.btnTake} onPress={this.takePicture}>
          <Image source={images.icCamera} style={styles.icCamera} />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#f1d9e0',
    justifyContent: 'space-between'
  },
  containerRow:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon:{
    width: width * 0.05,
    height: width * 0.05
  },
  icCamera:{
    width: width * 0.1,
    height: width * 0.1
  },
  btn:{
    margin: width * 0.05
  },
  slider:{
    width: width * 0.4
  },
  btnTake:{
    alignSelf: 'center',
    margin: width * 0.1
  },
  viewCamera:{
    width: width,
    height: width * 1.2
  },
  camera: {
    width: '100%',
    height: '100%'
  },
  containerOval:{
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  oval:{
    width: width * 0.6,
    height: width * 0.6,
    borderWidth: width * 0.005,
    borderRadius: width,
    borderColor: '#FF9DB8',
    transform: [{scaleY: 1.5}]
  },

  // container: {
  //   flex: 1,
  //   flexDirection: 'column',
  //   backgroundColor: '#f1d9e0',
  // },
  // subContain: {
  //   width: '100%',
  //   height: heightNavBar,
  //   backgroundColor: '#f1d9e0',
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   zIndex: 1000,
  //   paddingTop: height(2),
  // },
  // preview: {
  //   flex: 1,
  //   justifyContent: 'flex-end',
  //   alignItems: 'center',
  // },
  // capture: {
  //   flex: 0,
  //   // backgroundColor: 'red',
  //   borderRadius: 5,
  //   zIndex: 1001,
  //   paddingVertical: height(3),
  //   paddingHorizontal: width(10),
  //   alignSelf: 'center',
  //   // margin: height(3),
  // },
  // imageOvalContainer: {
  //   width: '100%',
  //   height: '100%',
  //   position: 'absolute',
  //   zIndex: 999,
  // },
  // imageOvalX: {
  //   position: 'relative',
  //   height: height(46),
  //   width: width(95),
  //   top: height(15) + heightNavBar,
  //   left: width(2.5),
  //   borderWidth: width(0.5),
  //   borderRadius: height(25),
  //   borderColor: '#FF9DB8',
  //   transform: [{scaleY: 1.6}],
  // },
  // imageOval: {
  //   position: 'relative',
  //   height: height(52),
  //   width: width(92),
  //   top: height(11) + heightNavBar,
  //   left: width(4),
  //   borderWidth: width(0.5),
  //   borderRadius: height(25),
  //   borderColor: '#FF9DB8',
  //   transform: [{scaleY: 1.4}],
  // },
  // imageOvalAndroid: {
  //   position: 'relative',
  //   height: height(52),
  //   width: width(92),
  //   top: height(10) + heightNavBar,
  //   left: width(4),
  //   borderWidth: width(0.5),
  //   borderRadius: height(25),
  //   borderColor: '#FF9DB8',
  //   transform: [{scaleY: 1.35}],
  // },
  // centerItem: {
  //   alignItems: 'center',
  //   width: width(14),
  //   // backgroundColor: 'yellow',
  //   paddingHorizontal: width(3),
  //   paddingVertical: height(2),
  // },
  // imgCamera: {
  //   height: width(5),
  //   width: width(5),
  //   resizeMode: 'contain',
  // },
  // imgTakeCamera: {
  //   height: width(10),
  //   width: width(10),
  //   resizeMode: 'contain',
  // },
  // cameraContainer: {
  //   flex: 0,
  //   zIndex: 1001,
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   height: height(13),
  // },
});

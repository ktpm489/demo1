import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
  ImageBackground
} from 'react-native';
import Header from '../../Container/CoreHeader/index';
import Button from '../../Components/Button';
import images from '../../Assets/Images';
import BaseServices from '../../Common/services';
import BaseAPI from '../../Services/BaseAPI';
import CameraScreen from '../CameraScreen';

const width = Math.round(Dimensions.get('window').width)
const height = Math.round(Dimensions.get('window').height)

class ResultScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      txtImageUrl: '',
      fileResponse: '',
      isChange: false,
      currentPage: 0,
      isDisable: true,
      isLoading: false,
      scale: false
    };
  }

  onSelectPhoto = async () => {
    // const resImage = await BaseServices.selectImagePicker(false);
    const resImage = await BaseServices.selectImagePicker(false);
    // console.log('resImage', resImage);
    if (resImage) {
      this.setState({
        txtImageUrl: resImage.link,
        fileResponse: resImage.response,
        isChange: true,
        isDisable: false,
        scale: false
      });
    }
  };

  onChangeCameraPage = () => {
    this.setState({
      txtImageUrl: '',
      fileResponse: '',
      currentPage: 1,
    });
  };

  setChangeImage = (res, scale) => {
    this.setState({
      txtImageUrl: res.uri,
      fileResponse: res,
      isDisable: false,
      scale: scale
    });
  };

  goBackScreen = () => {
    this.setState({
      currentPage: 0,
    });
  };

  backPage = () => {
    const {exitPage} = this.props;
    exitPage && exitPage();
  };

  onUpload = async () => {
    // Alert.alert('Hello I am Simple Alert');
    try {
      this.setState({isLoading: true});
      // let email = 'ktpm489@gmail.com';
      // let apikey =
      //   'NWY0N2FkMjg4ZjFiYmIwYWViZDBkNDdhXzU2Nzg5MTBfSG5mMlJRcDhMbkNuWWhBQw==';
      // let linkserver = 'https://shrouded-brushlands-68077.herokuapp.com';
      // let linkserver = 'http://192.168.1.7:3000';
      const {email, apikey, linkserver} = this.props;
      const {txtImageUrl} = this.state;
      if (txtImageUrl) {
        let res = await BaseAPI.postUploadPhoto(
          txtImageUrl,
          linkserver,
          email,
          apikey,
        );
        // let dataJSON = JSON.stringify(res);
        // console.log('data1', dataJSON, res.data);
        console.log(res)
        if (res.status == 200) {
          const {changePage, setTransferData} = this.props;
          setTransferData && setTransferData(res.data, this.state.scale);
          changePage && changePage(1);
        } else {
          Alert.alert('Please try again', res.ErrorMsg);
        }
      }

      // const {changePage} = this.props;
      // changePage && changePage(1);
    } catch (e) {
      // console.log('e', e);
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  render(){
    const {txtImageUrl, currentPage} = this.state;
    return currentPage === 0 ?
      <View style={{flex:1}}>
        <Header title={'AI Skin Analysis'} leftAction={this.backPage} />
        <ScrollView>
          <View style={styles.container}>

            <View style={styles.containerRow}>

              <TouchableOpacity style={styles.item}
                onPress={this.onChangeCameraPage}
              >
                <Image source={images.icCamera} style={styles.icon} />
                <Text style={styles.txt}>{`Take photo`}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.item}
                onPress={this.onSelectPhoto}
              >
                <Image source={images.icFolder} style={styles.icon} />
                <Text style={styles.txt}>{`Upload your image`}</Text>
              </TouchableOpacity>

            </View>

            <Text style={styles.txtPink}>{`Example of qualified image`}</Text>

            <ImageBackground style={[styles.containerImage, this.state.scale ? {transform: [{ scaleX: -1 }]} : {}]}
              source={txtImageUrl !== '' ? {uri: txtImageUrl} : images.skin}
              resizeMode='stretch'
            >
              {/* <View style={styles.oval}/> */}
            </ImageBackground>

            <Button
              label={'Upload'}
              style={styles.btn}
              isDisable={this.state.isDisable}
              isLoading={this.state.isLoading}
              onPress={this.onUpload}
            />
          </View>
        </ScrollView>
      </View>
      :
      <CameraScreen
        setChangeImage={this.setChangeImage}
        goBackScreen={this.goBackScreen}
      />
  }

  // render() {
  //   const {txtImageUrl, currentPage} = this.state;
  //   return currentPage === 0 ? (
  //     <View>
  //       <Header title={'AI Skin Analysis'} leftAction={this.backPage} />
  //       <ScrollView style={styles.container}>
  //         <View style={styles.subContainer}>
  //           <View style={styles.subContainer1}>
  //             <TouchableOpacity
  //               style={styles.centerItem}
  //               onPress={this.onChangeCameraPage}>
  //               <View style={styles.imageContainer}>
  //                 <Image source={images.icCamera} style={styles.imgCamera} />
  //               </View>
  //               <Text style={styles.txtDes}> Take photo</Text>
  //             </TouchableOpacity>
  //             <TouchableOpacity
  //               style={styles.centerItem}
  //               onPress={this.onSelectPhoto}>
  //               <View style={styles.imageContainer}>
  //                 <Image source={images.icFolder} style={styles.imgCamera} />
  //               </View>
  //               <Text style={styles.txtDes}> Upload your image</Text>
  //             </TouchableOpacity>
  //           </View>
  //           <View>
  //             <Text style={styles.txtExample}> Example of qualified image</Text>
  //             <View style={styles.imageUploadContainer}>
  //               <View style={styles.imageOvalContainer}>
  //                 <View
  //                   style={
  //                     isIphoneX || isNotchAndroid
  //                       ? styles.imageOvalX
  //                       : styles.imageOval
  //                   }
  //                 />
  //               </View>
  //               <Image
  //                 source={txtImageUrl !== '' ? {uri: txtImageUrl} : images.skin}
  //                 style={[styles.imageUpload, this.state.scale ? {transform: [{ scaleX: -1 }]} : {}]}
  //               />
  //             </View>
  //           </View>
  //           <View style={styles.buttonContainer}>
  //             <Button
  //               label={'Upload'}
  //               style={styles.buttonUpload}
  //               isDisable={this.state.isDisable}
  //               isLoading={this.state.isLoading}
  //               onPress={this.onUpload}
  //             />
  //           </View>
  //         </View>
  //       </ScrollView>
  //     </View>
  //   ) : (
  //     <CameraScreen
  //       setChangeImage={this.setChangeImage}
  //       goBackScreen={this.goBackScreen}
  //     />
  //   );
  // }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingBottom: width * 0.05
  },
  containerRow:{
    flexDirection: 'row',
    paddingVertical: width * 0.05
  },
  item:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon:{
    width: width * 0.07,
    height: width * 0.07
  },
  txt:{
    fontSize: width * 0.04,
    color: 'gray',
    marginTop: width * 0.01
  },
  txtPink:{
    fontSize: width * 0.04,
    color: '#ff85a6',
    margin: width * 0.05
  },
  containerImage:{
    width: width,
    height: width * 1.2,
    // justifyContent: 'center',
    paddingTop: (width * 0.6) * 0.27,
    alignItems: 'center'
  },
  oval:{
    width: width * 0.6,
    height: width * 0.6,
    borderWidth: width * 0.005,
    borderRadius: width,
    borderColor: '#FF9DB8',
    transform: [{scaleY: 1.5}]
  },
  btn:{
    backgroundColor: '#ff85a6',
    alignSelf: 'center',
    marginTop: width * 0.05
  }
  // container: {
  //   position: 'relative',
  //   height: '90%',
  //   paddingBottom: 10,
  //   width: '100%',
  //   backgroundColor: 'transparent',
  // },
  // subContainer: {position: 'relative', paddingBottom: 40},
  // subContainer1: {
  //   display: 'flex',
  //   justifyContent: 'space-around',
  //   alignItems: 'center',
  //   flexDirection: 'row',
  //   backgroundColor: '#FAFAFA',
  // },
  // imgCamera: {
  //   height: width(5),
  //   width: width(5),
  //   resizeMode: 'contain',
  // },
  // imageContainer: {
  //   padding: width(4),
  //   borderRadius: width(10),
  //   borderColor: 'transparent',
  //   backgroundColor: 'white',
  //   borderWidth: width(0.5),
  // },
  // centerItem: {
  //   alignItems: 'center',
  //   paddingVertical: height(1),
  // },
  // txtTitle: {
  //   fontWeight: 'bold',
  //   fontSize: width(4.5),
  //   color: 'black',
  //   marginTop: height(1),
  // },
  // txtDes: {
  //   fontSize: width(3),
  //   color: 'gray',
  //   marginTop: height(1),
  // },
  // txtExample: {
  //   marginTop: height(1),
  //   marginLeft: width(3),
  //   fontSize: width(4.5),
  //   color: '#ff85a6',
  // },
  // imageUploadContainer: {
  //   width: '100%',
  //   height: height(60),
  //   marginTop: height(2),
  // },
  // imageOvalContainer: {
  //   width: '100%',
  //   height: '100%',
  //   position: 'absolute',
  //   // backgroundColor: 'red',
  //   zIndex: 999,
  // },
  // imageOval: {
  //   position: 'relative',
  //   height: height(46),
  //   width: width(85),
  //   top: height(6.7),
  //   left: width(7.5),
  //   borderWidth: width(0.5),
  //   borderRadius: height(23),
  //   borderColor: '#FF9DB8',
  //   transform: [{scaleY: 1.28}],
  // },
  // imageOvalX: {
  //   position: 'relative',
  //   height: height(40),
  //   width: width(85),
  //   top: height(10),
  //   left: width(7.5),
  //   borderWidth: width(0.5),
  //   borderRadius: height(20),
  //   borderColor: '#FF9DB8',
  //   transform: [{scaleY: 1.49}],
  // },
  // imageUpload: {width: '100%', height: '100%', resizeMode: 'stretch'},
  // buttonContainer: {
  //   width: '100%',
  //   marginTop: height(2),
  //   alignItems: 'center',
  // },
  // buttonUpload: {
  //   backgroundColor: '#ff85a6',
  // },
});
export default ResultScreen;

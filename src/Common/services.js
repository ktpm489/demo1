import ImagePicker from 'react-native-image-picker';
import {openSettings} from 'react-native-permissions';

export default class BaseServices {
  static async selectImagePicker(isOpenCamera) {
    return new Promise(async (resolve, reject) => {
      const options = {
        // title: 'Choose photo to upload',
        // cancelButtonTitle: 'Cancel',
        // takePhotoButtonTitle: '',
        // chooseFromLibraryButtonTitle: 'Choose Library',
        noData: true,
        quality: 1.0,
        maxWidth: 1500,
        maxHeight: 1500,
        // storageOptions: {
        //   waitUntilSaved: true,
        //   skipBackup: true,
        // },
      };
      try {
        ImagePicker.launchImageLibrary(
          options,
          (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
              resolve();
            } else if (response.error) {
              if (response.error === 'Photo library permissions not granted') {
                openSettings();
              }
              resolve();
            } else if (response.uri) {
              resolve({
                link: response.uri,
                response,
              });
            }
          },
        );
      } catch (e) {
        console.log('e', e);
        resolve();
      }
    });
  }
}

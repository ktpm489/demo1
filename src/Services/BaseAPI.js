import QueryString from 'query-string';
import {REQUEST_TYPE} from '../Common/constants';
import settings from '../Controller/settings';
import ImageResizer from 'react-native-image-resizer';
import RNFetchBlob from 'rn-fetch-blob';

export default class BaseAPI {
  static async getData(type, queryBody) {
    return this.postGateWay(type, REQUEST_TYPE.GET, undefined, queryBody);
  }

  static async postData(type, body) {
    return this.postGateWay(type, REQUEST_TYPE.POST, body);
  }

  static async putData(type, body) {
    return this.postGateWay(type, REQUEST_TYPE.PUT, body);
  }

  static async postUploadPhoto(uri, linkserver = '', email = '', apikey = '') {
    const promiseReturn = async () => {
      return ImageResizer.createResizedImage(uri, 640, 640, 'JPEG', 100)
        .then((response) => {
          return RNFetchBlob.fs
            .readFile(response.path, 'base64')
            .then(async (base64) => {
              // console.log('base64'+ base64)
              const body = {
                image_base64: base64,
                email: email,
              };
              return this.postGateWay(
                linkserver + '/api/userskin',
                REQUEST_TYPE.POST,
                body,
                null,
                apikey,
              );
            })
            .catch(() => {
              return '';
            });
        })
        .catch((e) => {
          console.log('e' + e);
          return '';
        });
    };
    const responseImage = await promiseReturn();
    // console.log('responseImage' + responseImage);
    return responseImage;
  }

  static async checkApiProblem() {
    return this.postGateWay('check-provider', REQUEST_TYPE.GET);
  }

  static async getUserByAddress(address) {
    return this.postGateWay(`user/${address}`, REQUEST_TYPE.GET);
  }

  static async postGateWay(
    url,
    method = REQUEST_TYPE.GET,
    body,
    queryBody,
    apikey = '',
  ) {
    const callApi = new Promise(async (resolve, reject) => {
      try {
        const params = {
          method,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            apikey: apikey,
          },
        };
        if (body) {
          params.body = JSON.stringify(body);
        }
        let queryStr = '';
        if (queryBody) {
          queryStr = '?' + QueryString.stringify(queryBody);
        }
        console.log('url + queryStr', url + queryStr);
        const response = await fetch(url + queryStr, params);
        const responJson = await response.json();
        console.log('response', responJson);
        // if (response.status === 200) {
          // resolve(responJson);
        // }
        
        if(responJson.data){
          resolve(Object.assign(responJson, {status: 200}));
        }else{
          resolve(Object.assign(responJson, {status: 201}));
        }
      } catch (error) {
        console.log('error', error);
        reject(error);
      }
    });
    // Close promise if over time
    const callRemove = new Promise(function (resolve, reject) {
      setTimeout(() => {
        return reject('OverTime');
      }, 200000);
    });

    return Promise.race([callApi, callRemove])
      .then((result) => {
        return result;
      })
      .catch((e) => {
        if (e === 'OverTime') {
          // EventRegister.emit('internetChange', I18n.t('Initial.connectErr'))
        }
        return null;
      });
  }
}

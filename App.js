/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  View
} from 'react-native';
import StackView from './src/Navigation/Stack'
import SkinAI from './SkinAI';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import Store from './src/Redux/Store';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import DropDownAlert from 'react-native-dropdownalert';

function App(){
  const [action, setAction] = useState(0);
  const [alert, setAlert] = useState(null);
  const type = "error", title = "Internet Connection Problem", message = "Please check your network connection", payload = {}, interval = 0;

  useEffect(()=>{
    NetInfo.addEventListener(netChange);
  },[]);

  useEffect(()=>{
    const interval = setInterval(()=>{
      checkLowInternet();
    }, 10000);
    
    return ()=>clearInterval(interval);

  }, [action]);

  useEffect(()=>{
    alert && setAlert(alert);
  }, [alert]);

  const netChange = (state)=>{
    if(state.isConnected){
      alert && alert.state.isOpen && alert.closeAction();
    }else{
      alert && !alert.state.isOpen && alert.alertWithType(type, title, message, payload, interval);
    }
  }

  const checkLowInternet = async ()=>{
    try{
      const res = await axios({
        baseURL: 'https://www.google.com/',
        method: 'GET',
        timeout: 10000
      });

      alert && alert.state.isOpen && alert.closeAction();

      setAction(Number(action) + 1);
    }catch(e){
      alert && !alert.state.isOpen && alert.alertWithType(type, title, message, payload, interval);

      setAction(Number(action) + 1);
    }
  }

  return (
    // <InternetConnectionAlert>
      <View style={{flex: 1}}>
        <DropDownAlert 
          ref={(ref)=>{
            if(alert == null){
              setAlert(ref)
            }
          }}
          tapToCloseEnabled={false}
          panResponderEnabled={false}
          closeInterval={0}
        />
        <Provider store={Store}>
          <NavigationContainer>
            <StackView/>
          </NavigationContainer>
        </Provider>
      </View>
    // </InternetConnectionAlert>
  );
}

export default App;

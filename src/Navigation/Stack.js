import React from 'react'
import LoginView from '../Pages/Login'
import HomeView from '../Pages/Home'

import SkinView from '../../SkinAI'

import ImageShowView from '../Pages/ImageShow'

import route from '../Constants/Route'

import {createStackNavigator} from '@react-navigation/stack'
const Stack = createStackNavigator()

function StackView(){

    return(
      <Stack.Navigator headerMode='none'>
        <Stack.Screen name={route.Login} component={LoginView}/>
        <Stack.Screen name={route.Home} component={HomeView}/>
        <Stack.Screen name={route.ImageShow} component={ImageShowView}/>
        <Stack.Screen name={route.Skin} component={SkinView}/>
      </Stack.Navigator>
    )
}

export default StackView
import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native'
import style from './style'
import text from '../../Language/en'
import Header from '../Header'
import Route from '../../Constants/Route'

import {useNavigation} from '@react-navigation/native'

function HomeScreen(){
    const navigation = useNavigation()

    const nextPage = (route)=>{
        navigation.navigate(route)
    }
    return(
        <View style={style.container}>
            <Header title={text.Home}
                showBtnRight
            />

            <View style={style.view}>
                <TouchableOpacity
                    onPress={()=>nextPage(Route.Skin)}
                    style={style.bg_item}>
                    <View style={style.view_title}>
                        <Text style={style.title}>{`Skin AI`}</Text>
                    </View>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default HomeScreen
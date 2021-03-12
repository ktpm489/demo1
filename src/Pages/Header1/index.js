import React from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import text from '../../Language/en'
import style from './style'
import ic_back from '../../Assets/Images/back1.png'
import ic_shopping from '../../Assets/Images/shopping.png'
import ic_folder from '../../Assets/Images/folder.png'
import { useStore, useSelector } from 'react-redux'
import * as Action from '../../Redux/Action'

function Header1(props){
    const store = useStore()
    const navigation = useNavigation()
    const {
        title,
        pickImage
    } = props
    return(
        <View style={style.container}>
            <View style={{flex: 1, justifyContent: 'center'}}>
                {
                    title != text.Home ? 
                    <TouchableOpacity style={style.viewIcon}
                        onPress={()=>{
                            store.dispatch(Action.setImage(null))
                            store.dispatch(Action.clearSku())
                            navigation.goBack()
                        }}>
                        <Image style={style.icon}
                            source={ic_back}
                            resizeMode='contain'
                        />
                    </TouchableOpacity> : null
                }
            </View>

            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={style.title}>{title ? title : ''}</Text>
            </View>

            <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
            {
                    title != text.Home ? 
                    <TouchableOpacity style={style.viewIcon}
                        onPress={()=>{pickImage()}}
                    >
                        <Image style={style.icon}
                            source={ic_folder}
                            resizeMode='contain'
                        />
                    </TouchableOpacity> : null
            }

            </View>
        </View>
    )
}

export default Header1
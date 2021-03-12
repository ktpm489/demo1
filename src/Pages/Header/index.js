import React from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Alert
} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import text from '../../Language/en'
import style from './style'
import ic_delete from '../../Assets/Images/delete.png'
import ic_back from '../../Assets/Images/back1.png'
import ic_info from '../../Assets/Images/info.png'
import ic_logout from '../../Assets/Images/logout.png'
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-community/google-signin'
import { LoginManager, AccessToken } from 'react-native-fbsdk'

function Header(props){
    const navigation = useNavigation()
    const {
        title,
        showBtnLeft,
        showBtnRight,
        remove
    } = props

    const showAlert = ()=>{
        Alert.alert(
            "Warning",
            "Do you want to logout?",
            [
                {
                    text: "Cancel",
                    onPress: ()=>{},
                    style: 'cancel'
                },
                {
                    text: "Logout",
                    onPress: logout
                }
            ],
            {cancelable: false}
        )
    }

    const logout = async ()=>{

        const provider = auth().currentUser.providerData[0].providerId
        console.log(auth().currentUser)

        if(provider.includes("facebook")) await LoginManager.logOut()
        if(provider.includes("google")) await GoogleSignin.signOut()
        await auth().signOut()
        navigation.goBack()
    }

    const ic = ()=>{
        if(title == text.Home) return ic_logout
        if(remove) return ic_delete
        return ic_info
    }

    const click = ()=>{
        if(title == text.Home) showAlert()
        if(remove) remove()
    }

    return(
        <View style={style.container}>
            <View style={{flex: 1, justifyContent: 'center'}}>
                {
                    showBtnLeft? 
                    <TouchableOpacity style={style.viewIcon}
                        onPress={()=>navigation.goBack()}>
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
                    showBtnRight ? 
                    <TouchableOpacity style={style.viewIcon}
                        onPress={()=>click()}
                    >
                        <Image style={style.icon}
                            source={ic()}
                            resizeMode='contain'
                        />
                    </TouchableOpacity> : null
            }

            </View>
        </View>
    )
}

export default Header
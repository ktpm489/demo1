import React, {useState, useEffect} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    Alert,
    ScrollView
} from 'react-native'
import { useStore, useSelector } from 'react-redux'
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-community/google-signin'
import {useNavigation} from '@react-navigation/native'
import { LoginManager, AccessToken } from 'react-native-fbsdk'

import style from './style'
import ic_fb from '../../Assets/Images/facebook.png'
import ic_google from '../../Assets/Images/google.png'
import logo from '../../Assets/Images/logo.png'
import * as Action from '../../Redux/Action'
import Loading from '../Loading'
import Route from '../../Constants/Route'
import Header from '../Header'

GoogleSignin.configure({
    webClientId: '630644421992-puh1sgbm0lsiu20aatbpdtip5cas3h87.apps.googleusercontent.com',
})

function Login(){
    const navigate = useNavigation()
    const store = useStore()
    const state = store.getState()
    const selector = useSelector(state => state.user.register)

    const [show, setShow] = useState(false)

    const [phone, setPhone] = useState('')
    const [code, setCode] = useState('')
    const [confirm, setConfirm] = useState(null)
    const [click, setClick] = useState(false)
    const [time, setTime] = useState(0)

    useEffect(()=>{
        if(time == 0) return

        const interval = setInterval(()=>{
            setTime(time - 1)
        }, 1000)

        return ()=>clearInterval(interval)
    }, [time])

    useEffect(()=>{
        setPhone(phone)
    }, [phone])

    useEffect(()=>{
        setConfirm(confirm)
    }, [confirm])

    useEffect(()=>{
        setClick(click)
    }, [click])

    useEffect(()=>{
        // auth().signOut()
        if(auth().currentUser){
            console.log(auth().currentUser)
            navigate.navigate(Route.Home)
        }

        // navigate.navigate(Route.Home)
    },[])

    useEffect(()=>{
        if(state.user.register){
            setShow(false)
            // navigate.navigate(Route.Home)
        }
    },[selector])

    useEffect(()=>{
        setShow(show)
    }, [show])

    const loginGG = async ()=>{
        await GoogleSignin.hasPlayServices()
        const gg = await GoogleSignin.signIn()
        const googleCredential = auth.GoogleAuthProvider.credential(gg.idToken)

        auth().signInWithCredential(googleCredential)
        .then(()=>{
            // setShow(true)

            store.dispatch(Action.register({
                email: gg.user.email
            }))
    
            navigate.navigate(Route.Home)
        })
        .catch(e=>{
            console.log(e.message)
            Alert.alert("Warning", 'An account already exists with the same email address but with different login information. Please login with another account!')
        })

        // setShow(true)
    }

    const loginPhone = async ()=>{
        if(phone != ''){
            if(checkPhone()){
                try{
                    setShow(true)
                    // const confirmation = await auth().signInWithPhoneNumber(`+84 ${phone}`)
                    await auth().verifyPhoneNumber(`+84 ${phone}`)
                    .then(res=>{
                        console.log(res)

                        setConfirm(res)
                        setClick(true)
                        setTime(30)
                        setShow(false)
                    })
                    .catch(e=>{
                        console.log(e)
                        Alert.alert("Error", e.message)
                        setShow(false)
                    })
                    
                }catch(e){
                    console.log("error === ", e)
                    Alert.alert("Error", `Could not send SMS to ${phone}`)
                    setShow(false)
                }
            }else{
                Alert.alert("Warning", 'Invalid phone number!')
            }
            
        }else{
            Alert.alert("Warning", 'Please, enter the phone number!')
        }
    }

    const checkPhone = ()=>{
        const reg = /^0([3|5|7|8|9])(\d{8})$/

        return reg.test(phone)
    }

    const verifyCode = async ()=>{
        if(code != ''){
            try{
                // setShow(true)
                // await confirm.confirm(code)
                // store.dispatch(Action.register({
                //     email: phone
                // }))

                setShow(true)
                const credential = auth.PhoneAuthProvider.credential(confirm.verificationId, code)
                auth().signInWithCredential(credential)
                .then(()=>{
                    // setShow(true)
        
                    store.dispatch(Action.register({
                        phone: phone
                    }))
                    setPhone('')
                    changePhone()
                    navigate.navigate(Route.Home)

                    setShow(false)
                })
                .catch(e=>{
                    console.log("error", e.code)
                    if(e.code == "auth/invalid-verification-code"){
                        Alert.alert("Warning", "Invalid OTP code")
                    }else{
                        Alert.alert("Warning", e.message)
                    }
                    setShow(false)
                })
            }catch(e){
                console.log(e)
                setShow(false)
                Alert.alert("Warning", e.message)
            }
        }else{
            Alert.alert("Warning", 'Please, enter the code!')
        }
    }

    const resend = ()=>{
        if(time > 0){
            Alert.alert("Warning", `Please wait after ${time} seconds to be able to resend the code!`)
        }else{
            loginPhone()
        }
    }

    const changePhone = ()=>{
        setClick(false)
        setTime(0)
        setCode('')
    }

    const loginFB = async ()=>{
        try{
            const result = await LoginManager.logInWithPermissions(['public_profile', 'email'])

            const data = await AccessToken.getCurrentAccessToken()

            const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken)
            auth().signInWithCredential(facebookCredential)
            .then(()=>{
                // setShow(true)

                const user = auth().currentUser

                console.log(user.providerData[0].email)

                store.dispatch(Action.register({
                    email: user.providerData[0].email
                }))

                navigate.navigate(Route.Home)
            })
            .catch(e=>{
                console.log(e.message)
                Alert.alert("Warning", 'An account already exists with the same email address but with different login information. Please login with another account!')
            })
        }catch(e){
            console.log(e)
            Alert.alert("Warning", 'Please try again!')
        }
    }

    return (
        <ScrollView>
            <View style={style.view}>
                <Header title='Login'/>
                {
                    !click ? 
                    (
                        <View style={style.container}>
                            <Loading show={show}/>
                            <Image style={style.logo}
                                source={logo}
                                resizeMode='center'
                            />
                
                            <Text style={style.title}>Login with phone number</Text>
                            <TextInput style={style.input}
                                placeholder={'Phone number'}
                                placeholderTextColor={'grey'}
                                numberOfLines={1}
                                keyboardType='numeric'
                                value={phone}
                                onChangeText={val=>setPhone(val)}
                            />
                
                            <TouchableOpacity style={style.btn}
                                onPress={()=>loginPhone()}
                            >
                                <Text style={style.text}>Login</Text>
                            </TouchableOpacity>
                
                            <Text style={style.or}>{`Or`}</Text>
                
                            <View style={style.container1}>
                                <TouchableOpacity style={style.border}
                                    onPress={()=>loginFB()}
                                >
                                    <Image style={style.image}
                                        source={ic_fb}
                                        resizeMode='contain'
                                    />
                                </TouchableOpacity>
                
                                <TouchableOpacity style={style.border}
                                    onPress={()=>loginGG()}
                                >
                                    <Image style={style.image}
                                        source={ic_google}
                                        resizeMode='contain'
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                    :
                    (
                        <View style={style.container}>
                            <Loading show={show}/>
                            <Image style={style.logo}
                                source={logo}
                                resizeMode='center'
                            />
                
                            <Text style={[style.title, {marginHorizontal: '10%'}]}>{`Verification code has been sent SMS to: ${phone}\nPlease enter verification code.`}</Text>
                            <TextInput style={style.input}
                                placeholder={'Code'}
                                placeholderTextColor={'grey'}
                                numberOfLines={1}
                                keyboardType='numeric'
                                value={code}
                                onChangeText={val=>setCode(val)}
                            />
                
                            <TouchableOpacity style={style.btn}
                                onPress={()=>verifyCode()}>
                                <Text style={style.text}>Verification</Text>
                            </TouchableOpacity>
                
                            <View style={style.container1}>
                                <TouchableOpacity style={{flex: 1}}
                                    onPress={()=>resend()}
                                >
                                    <Text style={style.textBtn}>{time == 0 ? `Resend code` : `Resend code(${time}s)`}</Text>
                                </TouchableOpacity>
                
                                <TouchableOpacity style={{flex: 1, alignItems: 'flex-end'}}
                                    onPress={()=>changePhone()}
                                >
                                    <Text style={style.textBtn}>{`Change phone`}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }
            </View>
        </ScrollView>
    )
}

export default Login
import React, {useState, useEffect} from 'react'
import {
    View,
    Text,
    ImageBackground,
    Alert
} from 'react-native'
import {useStore, useSelector} from 'react-redux'
import * as Action from '../../Redux/Action'
import {useNavigation} from '@react-navigation/native'
import PhotoView from 'react-native-photo-view'

import Header from '../Header'
import style from './style'
import text from '../../Language/en'
import Loading from '../Loading'

function ImageShow(){
    const navigation = useNavigation()
    const store = useStore()
    const state = store.getState()
    const selector = useSelector(state=>state.makeup.imageShowList)
    const imageList = useSelector(state=>state.makeup.imageList)
    const [image, setImage] = useState(null)
    const [show, setShow] = useState(false)

    useEffect(()=>{
        setImage(state.makeup.imageShowList)
    }, [selector])

    useEffect(()=>{
        if(image != null && Number(imageList.length) != Number(image.size)){
            navigation.goBack()
            setShow(false)
        }
    }, [imageList])

    useEffect(()=>{
        setShow(show)
    }, [show])

    const remove = ()=>{
        Alert.alert(
            "Warning",
            "Do you want to delete the image?",
            [
                {
                    text: "Cancel",
                    onPress: ()=>{},
                    style: 'cancel'
                },
                {
                    text: "Remove",
                    onPress: removeImage
                }
            ],
            {cancelable: false}
        )
    }

    const removeImage = ()=>{
        setShow(true)
        store.dispatch(Action.removeImage({
            id: image._id
        }))
    }

    return(
        <View style={style.bg}>
            <Loading show={show}/>
            
            <Header
                showBtnLeft
                showBtnRight
                remove={remove}
            />
            {
                image ? 
                <PhotoView
                    source={{uri: `data:image/${image.image_type};base64,${image.image}`}}
                    minimumZoomScale={1}
                    maximumZoomScale={3}
                    androidScaleType='centerCrop'
                    onLoad={() => console.log("Image loaded!")}
                    style={style.image} /> : null
            }
            
        </View>
    )
}

export default ImageShow
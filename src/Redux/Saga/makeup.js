import { call, takeLatest, put, takeEvery } from 'redux-saga/effects'
import {
    MAKEUP,
    STATUS_ERROR
} from '../Constants/ActionType'
import{
    get,
    post
} from '../../APIConfig'
import auth from '@react-native-firebase/auth'

const LIST_IMAGE_API = 'list-image'
const MAKEUP_API = 'user-upload'
const REMOVE_API = 'remove'

const EMAIL = 'email'
const IMAGE = 'image'
const IMAGE_TYPE = 'image_type'
const MAKEUP_ID = 'makeupID'
const ID = 'id'

export function* watchMakeup(){
    yield takeLatest(MAKEUP.MAKEUP, makeup)
}

function* makeup(props){
    const {payload} = props
    const provider = auth().currentUser.providerData[0]
    const data = new FormData()
    data.append(EMAIL, provider.email ? provider.email : provider.phoneNumber)
    data.append(IMAGE, payload.image)
    data.append(IMAGE_TYPE, payload.image_type)
    data.append(MAKEUP_ID, payload.makeupID)

    const res = yield post(MAKEUP_API, data)

    if(res.status == null || res.status == STATUS_ERROR){
        yield put({
            type: MAKEUP.ERROR,
            state: {
                type: MAKEUP.MAKEUP,
                data: res.message
            }
        })
    }else{
        yield put({
            type: MAKEUP.REQUEST,
            state:{
                type: MAKEUP.MAKEUP,
                data: {
                    base64: res.data.media_info_list[0].media_data,
                    typeImage: `image/${res.data.media_info_list[0].media_profiles.media_data_type}`
                }
            }
        })
    }
}

export function* watchGetListImage(){
    yield takeLatest(MAKEUP.GET_IMAGE, getListImage)
}

function* getListImage(props){

    const provider = auth().currentUser.providerData[0]
    const params = {
        [EMAIL] : provider.email ? provider.email : provider.phoneNumber
    }

    const res = yield get(LIST_IMAGE_API, params)

    if(res.status == null || res.status == STATUS_ERROR){
        yield put({
            type: MAKEUP.ERROR,
            state: {
                type: MAKEUP.GET_IMAGE,
                data: res.message
            }
        })
    }else{
        yield put({
            type: MAKEUP.REQUEST,
            state:{
                type: MAKEUP.GET_IMAGE,
                data: res.data
            }
        })
    }
}

export function* watchRemoveImage(){
    yield takeLatest(MAKEUP.REMOVE_IMAGE, removeImage)
}

function* removeImage(props){
    const provider = auth().currentUser.providerData[0]
    const {payload} = props
    const data = new FormData()
    data.append(EMAIL, provider.email ? provider.email : provider.phoneNumber)
    data.append(ID, payload.id)

    const res = yield post(REMOVE_API, data)

    const params = {
        [EMAIL] : provider.email ? provider.email : provider.phoneNumber
    }

    const resList = yield get(LIST_IMAGE_API, params)

    if(resList.status == null || resList.status == STATUS_ERROR){
        yield put({
            type: MAKEUP.ERROR,
            state: {
                type: MAKEUP.GET_IMAGE,
                data: resList.message
            }
        })
    }else{
        yield put({
            type: MAKEUP.REQUEST,
            state:{
                type: MAKEUP.GET_IMAGE,
                data: resList.data
            }
        })
    }
}
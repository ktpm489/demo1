import { call, takeLatest, put, takeEvery } from 'redux-saga/effects'
import {
    USER,
    STATUS_ERROR
} from '../Constants/ActionType'
import{
    get,
    post
} from '../../APIConfig/ulady'

const REGISTER_API = 'register'

const EMAIL = 'email'
const USERNAME = 'username'
const PHONE = 'phone'

// {
// 	"email": "ntnghia.it01@gmail.com",
// 	"username": "ntnghia.it01@gmail.com"
// }

export function* watchRegister(){
    yield takeLatest(USER.REGISTER, register)
}

function* register(props){
    try{
        const {payload} = props

        const body = {
            [EMAIL]: payload.email ? payload.email : '',
            [USERNAME]: payload.email ? payload.email : payload.phone,
            [PHONE]: payload.phone ? payload.phone : ''
        }

        if(payload.phone == null) delete body[PHONE]

        const res = yield post(REGISTER_API, body)

        yield put({
            type: USER.REQUEST,
            state:{
                type: USER.REGISTER
            }
        })
    }catch(e){
        console.log(e)
    }
}
import { call, takeLatest, put, takeEvery } from 'redux-saga/effects'
import {
    BRAND,
    STATUS_ERROR
} from '../Constants/ActionType'
import{
    get,
    post
} from '../../APIConfig'

const BRAND_LIST_API = 'brand-list'
const LIMIT = 'limit'

// const SKU_LIST_API = 'product-list'
const SKU_LIST_API = 'sku-list'
const BRAND_ID = 'brand_id'

export function* watchBrand(){
    yield takeLatest(BRAND.GET_BRAND, brand)
}

function* brand(props){
    const {payload} = props

    let params = {}

    if(payload.limit){
        params = {
            [LIMIT]: payload.limit
        }
    }

    const res = yield get(BRAND_LIST_API, params)

    if(res.status == null || res.status == STATUS_ERROR){
        yield put({
            type: BRAND.ERROR,
            state: {
                type: payload.limit ? BRAND.GET_BRAND : BRAND.GET_ALL_BRAND,
                data: res.message
            }
        })
    }else{
        yield put({
            type: BRAND.REQUEST,
            state:{
                type: payload.limit ? BRAND.GET_BRAND : BRAND.GET_ALL_BRAND,
                data: res.data
            }
        })
    }
}

export function* watchSKU(){
    yield takeLatest(BRAND.GET_SKU, sku)
}

function* sku(props){
    const {payload} = props

    let params = {}

    if(payload.brand_id){
        params = {
            [BRAND_ID]: payload.brand_id
        }
    }

    const res = yield get(SKU_LIST_API, params)

    if(res.status == null || res.status == STATUS_ERROR){
        yield put({
            type: BRAND.ERROR,
            state: {
                type: BRAND.GET_SKU,
                data: res.message
            }
        })
    }else{
        yield put({
            type: BRAND.REQUEST,
            state:{
                type: BRAND.GET_SKU,
                data: res.data
            }
        })
    }
}
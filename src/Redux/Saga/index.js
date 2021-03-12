import { all } from 'redux-saga/effects'

import {
    watchMakeup,
    watchGetListImage,
    watchRemoveImage
} from './makeup'

import {
    watchBrand,
    watchSKU
} from './brand'

import {
    watchRegister
} from './user'

function* root(){
    yield all([
        watchMakeup(),
        watchGetListImage(),
        watchRemoveImage(),


        watchBrand(),
        watchSKU(),


        watchRegister()
    ])
}

export default root
import { combineReducers } from 'redux'
import makeup from './makeup'
import brand from './brand'
import user from './user'

const res = combineReducers({
    makeup: makeup,
    brand: brand,
    user: user
})

export default res
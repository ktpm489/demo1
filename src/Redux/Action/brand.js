import {
    BRAND
} from '../Constants/ActionType'

export const GetBrand = (data) => ({
    type: BRAND.GET_BRAND,
    payload:{
        ...data
    }
})

export const GetSKU = (data) =>({
    type: BRAND.GET_SKU,
    payload:{
        ...data
    }
})

export const SetBrand = (data) =>({
    type: BRAND.SET_BRAND,
    payload:{
        ...data
    }
})

export const ClearSku = (data) =>({
    type: BRAND.CLEAR_SKU,
    payload:{
        ...data
    }
})
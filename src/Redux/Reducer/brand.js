import {
    BRAND
} from '../Constants/ActionType'

const initState = {
    brandList: [],
    allBrand: [],
    skuList: [],
    brand: null,
    errorBrandList: '',
    errorSkuList: '',
    errorAllBrand: ''
}

const brand = (state = initState, action) =>{
    switch(action.type){
        case BRAND.REQUEST:
            switch(action.state.type){
                case BRAND.GET_BRAND:
                    return{
                        ...state,
                        brandList: action.state.data,
                        errorBrandList: ''
                    }
                case BRAND.GET_SKU:
                    return{
                        ...state,
                        skuList: action.state.data,
                        errorSkuList: ''
                    }
                case BRAND.GET_ALL_BRAND:
                    return{
                        ...state,
                        allBrand: action.state.data,
                        errorAllBrand: ''
                    }
                default:{
                    return{...state}
                }
            }
        case BRAND.SET_BRAND:
            return{
                ...state,
                brand: action.payload
            }
        case BRAND.CLEAR_SKU:
            return{
                ...state,
                skuList: []
            }
        case BRAND.ERROR:
            switch(action.state.type){
                case BRAND.GET_BRAND:
                    return{
                        ...state,
                        errorBrandList: action.state.data
                    }
                case BRAND.GET_SKU:
                    return{
                        ...state,
                        errorSkuList: action.state.data
                    }
                case BRAND.GET_ALL_BRAND:
                    return{
                        ...state,
                        errorAllBrand: action.state.data
                    }
                default:{
                    return{...state}
                }
            }
        default:
            return{...state}
    }
}

export default brand
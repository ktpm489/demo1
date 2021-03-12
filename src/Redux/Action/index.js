import { GET_IMAGE } from "../Constants/ActionType/makeup"
import {
    Makeup,
    GetImage,
    SetImage,
    SetImageShow,
    RemoveImage
} from './makeup'

import {
    GetBrand,
    GetSKU,
    SetBrand,
    ClearSku
} from './brand'

import {
    Register
} from './user'

export const makeup = Makeup
export const getImage = GetImage
export const removeImage = RemoveImage
export const setImage = SetImage
export const setImageShow = SetImageShow

export const getBrand = GetBrand
export const getSku = GetSKU
export const setBrand = SetBrand
export const clearSku = ClearSku

export const register = Register
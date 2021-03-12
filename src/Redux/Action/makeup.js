import {
    MAKEUP
} from '../Constants/ActionType'

export const Makeup = (data) => ({
    type: MAKEUP.MAKEUP,
    payload:{
        ...data
    }
})

export const GetImage = (data) =>({
    type: MAKEUP.GET_IMAGE,
    payload:{
        ...data
    }
})

export const RemoveImage = (data) =>({
    type: MAKEUP.REMOVE_IMAGE,
    payload:{
        ...data
    }
})

export const SetImage = (data) =>({
    type: MAKEUP.SET_IMAGE_MAKEUP,
    payload:{
        ...data
    }
})

export const SetImageShow = (data) =>({
    type: MAKEUP.SET_IMAGE_SHOW,
    payload: data
})
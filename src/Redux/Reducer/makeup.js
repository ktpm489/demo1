import {
    MAKEUP
} from '../Constants/ActionType'

const initState = {
    imageList: null,
    imageShow: '',
    errorMakeup: '',
    errorImageList: '',
    imageShowList: ''
}

const makeup = (state = initState, action) =>{
    // console.log(action)
    // console.log(state)
    switch(action.type){
        case MAKEUP.REQUEST:
            switch(action.state.type){
                case MAKEUP.MAKEUP:
                    return{
                        ...state,
                        imageShow: action.state.data,
                        errorMakeup: ''
                    }
                case MAKEUP.GET_IMAGE:
                    return{
                        ...state,
                        imageList: action.state.data,
                        errorImageList: ''
                    }
                default:
                    return{
                        ...state
                    }
            }
        case MAKEUP.SET_IMAGE_MAKEUP:
            // console.log("reducer === ", action)
            return{
                ...state,
                errorMakeup: '',
                imageShow: action.payload
            }
        case MAKEUP.SET_IMAGE_SHOW:
            // console.log("reducer === ", action)
            return{
                ...state,
                imageShowList: action.payload
            }
        case MAKEUP.ERROR:
            switch(action.state.type){
                case MAKEUP.MAKEUP:
                    return{
                        ...state,
                        errorMakeup: action.state.data
                    }
                case MAKEUP.GET_IMAGE:
                    return{
                        ...state,
                        errorImageList: action.state.data
                    }
                default:
                    return{
                        ...state
                    }
            }
        default:
            return{
                ...state
            }
    }
}

export default makeup
import {
    USER
} from '../Constants/ActionType'

const initState = {
    register: false
}

const user = (state = initState, action) =>{
    switch(action.type){
        case USER.REQUEST:
            switch(action.state.type){
                case USER.REGISTER:
                    return{
                        ...state,
                        register: true
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

export default user
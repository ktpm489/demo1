import {
    USER
} from '../Constants/ActionType'

export const Register = (data) => ({
    type: USER.REGISTER,
    payload:{
        ...data
    }
})
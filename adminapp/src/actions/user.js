import axios from "../helpers/axios"
import { authConstants, userConstants } from "./constants"
import { getInitialData } from "./initialData"

export const changeStatus = (id)=>{
    return async dispatch => {
        try{
            const res=await axios.post('/admin/setstatus',{id:id})
            dispatch({type:userConstants.USER_CHANGE_STATE_SUCCESS});
            dispatch(getInitialData())
        }catch(err){
            console.log(err)
        }
    }
}




export const signup = (user) => {

    return async (dispatch) => {
        dispatch({ type: userConstants.USER_REGISTER_REQUEST })
        const res = await axios.post('/admin/signup', {
            ...user
        })

        if (res.status === 201) {
            const { message } = res.data
            dispatch({
                type: userConstants.USER_REGISTER_SUCCESS,
                payLoad: {
                    message
                }
            })

        }
        else {
            if (res.status === 400) {
                dispatch({
                    type: userConstants.USER_REGISTER_FAILURE,
                    payLoad: { error: res.data.error }
                })
            }
        }
        dispatch({
            type: userConstants.USER_REGISTER_REQUEST,
            payLoad: {
                ...user
            }
        })
    }
}

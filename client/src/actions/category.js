import axios from '../helpers/axios'
import { categoryConstants } from "./constants"

export const getAllCategory = () => {
    return async dispatch => {
        dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST })
        const res = await axios.get('/category/getcategory')
        console.log(res)
        if (res.status === 200) {
            console.log(res.data)
            const { categoryList } = res.data
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories: categoryList }
            })
        } else {
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
                payload: { error: res.data.error }
            })
        }
    }
}
export const addCategory = (form) => {
    return async dispatch => {
        dispatch({type:categoryConstants.ADD_NEW_CATEGORIES_REQUEST})
        const res = await axios.post('/category/create',form)
        if(res.status===201){
            dispatch({
                type:categoryConstants.ADD_NEW_CATEGORIES_SUCCESS,
                payload:{category: res.data.category}
            })
        }
        else{
            dispatch({
                type:categoryConstants.ADD_NEW_CATEGORIES_FAILURE,
                payload:res.data.error
            })
        }
    }
}
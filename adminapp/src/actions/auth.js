import { getProducts } from "."
import axios from "../helpers/axios"
import { authConstants } from "./constants"

export const login = (user) => {

    
    return async (dispatch) => {
       try{
        dispatch({ type: authConstants.LOGIN_REQUEST })
        const res = await axios.post('/admin/signin', {
            ...user
        })

        if (res.status === 200) {
            const { token} = res.data
            localStorage.setItem('refreshtoken', token)
            
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token
                
                }
            })
            dispatch(getToken(token))
            dispatch(getProducts());

        }
        else {
           
            
                dispatch({
                    type: authConstants.LOGIN_FAILURE,
                    payload: { error: res.data.message }
                })
            
        }
        dispatch({
            type: authConstants.LOGIN_REQUEST,
            payload: {
                ...user
            }
        })
       }
       catch (err){
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: { error: "co gi do sai" }
            })

            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: { error: null }
            })
           
       }
    }
}


export const signup = (user) => {

   
    return async (dispatch) => {
        dispatch({ type: authConstants.LOGIN_REQUEST })
        const res = await axios.post('/admin/signup', {
            ...user
        })

        if (res.status === 200) {
            const { message } = res.data
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    message
                }
            })

        }
        else {
            if (res.status === 400) {
                dispatch({
                    type: authConstants.LOGIN_FAILURE,
                    payload: { error: res.data.error }
                })
            }
        }
        dispatch({
            type: authConstants.LOGIN_REQUEST,
            payload: {
                ...user
            }
        })
    }
}


export const isUserLoggedIn = () => {
    return async dispatch => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            });
        } else {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: { error: null }
            });
        }
    }
}
export const signout = () => {
    return async dispatch => {

        dispatch({ type: authConstants.LOGOUT_REQUEST })
        const res = await axios.post('/admin/signout')

        if (res.status === 200) {
            localStorage.clear()
            dispatch({
                type: authConstants.LOGOUT_SUCCESS
            })
        }
        else {
            dispatch({
                type: authConstants.LOGOUT_FAILURE,
                payload: { error: res.data.error }
            })

        }

    }
}
export const getToken = (refreshtoken) => {
    return async (dispatch) => {
      try {
       
        dispatch({ type: authConstants.GETTOKEN_REQUEST });
        const res = await axios.post("/admin/refresh_token",{refreshtoken:refreshtoken});
     
         localStorage.setItem("token", res.data.access_token);
        
        dispatch({
          type: authConstants.GETTOKEN_SUCCESS ,
          payload: { token: res.data.access_token }, 
        });
        dispatch(getUser(res.data.access_token))
      } catch (error) {
        /* const { data } = error.response; */
       
      }
    };
  };
  
  export const getUser = (token,history) => {
    return async (dispatch) => {
      try {
        dispatch({ type: authConstants.GETUSER_REQUEST });
        const res = await axios.get("/admin/infor");
        localStorage.setItem("user", JSON.stringify(res.data));
        dispatch({
          type: authConstants.GETUSER_SUCCESS,
          payload: { user: res.data },
        });
        dispatch(getProducts())
      } catch (error) {
        /* const { data } = error.response; */
  
      }
    };
  };
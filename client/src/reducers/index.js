
import { combineReducers } from 'redux'
import categoryReducer from './category'
import productReducer from './product'
import authReducer from './auth'
import cartReducer from'./cart'
import userReducer from './user'

const initState={
    token:null,
    user:{
        firstName:'',
        lastName:'',
        email:'',
        picture:''
    },
    authenticate:false,
    authenticating:false
}

export const rootReducer = combineReducers({

    category:categoryReducer,   
    product:productReducer,
    auth:authReducer,
    cart:cartReducer,
    user:userReducer
})


export default rootReducer;
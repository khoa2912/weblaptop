import authReducer from './auth'
import { combineReducers } from 'redux'
import userReducer from './user'
import productReducer from './product'
import orderReducer from './order'
import categoryReducer from './category'
import pageReducer from './page'

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
    auth:authReducer,
    user:userReducer,
    product:productReducer,
    order:orderReducer,
    category:categoryReducer,
    page:pageReducer
})


export default rootReducer;
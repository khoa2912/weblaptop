// import axios from '../helpers/axios'
// import { orderConstants } from "./constants"

// export const getAllOrder = () => {
//     return async dispatch => {
//         dispatch({ type: orderConstants.GET_ALL_ORDERS_REQUEST })
//         const res = await axios.get('/order/getorder')
//         console.log(res)
//         if (res.status === 200) {
//             console.log(res.data)
//             const { orderList } = res.data
//             dispatch({
//                 type: orderConstants.GET_ALL_ORDERS_SUCCESS,
//                 payload: { orders: orderList }
//             })
//         } else {
//             dispatch({
//                 type: orderConstants.GET_ALL_ORDERS_FAILURE,
//                 payload: { error: res.data.error }
//             })
//         }
//     }
// }
// export const addOrder = (form) => {
//     return async dispatch => {
//         dispatch({type:orderConstants.ADD_NEW_ORDERS_REQUEST})
//         const res = await axios.post('/order/update',form)
//         if(res.status===201){
//             dispatch({
//                 type:orderConstants.ADD_NEW_ORDERS_SUCCESS,
//                 payload:{order: res.data.order}
//             })
//         }
//         else{
//             dispatch({
//                 type:orderConstants.ADD_NEW_ORDERS_FAILURE,
//                 payload:res.data.error
//             })
//         }
//     }
// }
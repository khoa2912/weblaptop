// import { orderConstants } from "../actions/constants"

// const initState = {
//     orders: [],
//     loading: false,
//     error: null
// }

// const buildNewOrders = (parentId, orders, order) => {
//     let myOrders = [];


//     if(parentId===undefined){
//         return [
//             ...orders,
//             {
//                 _id:orders._id,
//                 name:orders.name,
//                 slug:orders.slug,
//                 image:orders.categoryImage,
//                 children:[]
//             }
//         ]
//     }
//     for (let ord of orders) {
//         if (ord._id===parentId) {
//             myOrders.push({
//                 ...ord,
//                 children: ord.children && ord.children.length > 0 ? buildNewOrders(parentId, [...ord.children, {
//                     _id: order._id,
//                     address: order.addressId,
//                     totalAmount: order.totalAmount,
//                     parentId: order.parentId,
//                     paymentStatus: order.paymentStatus,
//                     paymentType: order.paymentType,
//                     user: order.user,
//                     type: order.type,
//                     children: order.children
//                 }], order) : []
//             })
//         }
//         else {
//             myOrders.push({
//                 ...ord,
//                 children: ord.children  ? buildNewOrders(parentId, ord.children, order) : []
//             })
//         }
//     }
//     return myOrders
// }

// export default (state = initState, action) => {
//     switch (action.type) {
//         case orderConstants.GET_ALL_ORDERS_SUCCESS:
//             state = {
//                 ...state,
//                 orders: action.payload.orders
//             }
//             break;
//         case orderConstants.ADD_NEW_ORDERS_REQUEST:
//             state = {
//                 ...state,
//                 loading: false
//             }
//             break;
//         case orderConstants.ADD_NEW_ORDERS_SUCCESS:
//             const order = action.payload.order
//             const updateOrders = buildNewOrders(order.parentId, state.orders, order)
//             state = {
//                 ...state,
//                 orders: updateOrders,
//                 loading: false
//             }
//             break
//         case orderConstants.ADD_NEW_ORDERS_FAILURE:
//             state = {
//                 ...initState,
//             }
//             break
//     }
//     return state
// }
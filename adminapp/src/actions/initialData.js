import axios from '../helpers/axios'
import { authConstants, categoryConstants, orderConstants, productConstants } from "./constants"
export const getInitialData = () => {
    return async (dispatch) => {
      const res = await axios.post(`/init/initialData`);
      if (res.status === 200) {
        const { categories, products, orders,users } = res.data;
        
        dispatch({
          type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
          payload: { categories },
        });
        dispatch({
          type: productConstants.GET_ALL_PRODUCT_SUCCESS,
          payload: { products },
        });
         dispatch({  
          type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
          payload: { orders },
        }); 
        dispatch({  
          type: authConstants.GET_USERS_SUCCESS,
          payload: { users },
        }); 
      }
      
    };
  };
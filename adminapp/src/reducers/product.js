import { productConstants } from "../actions/constants";

const initialState = {
    products: [],
    loading: false,
    error: null,
    addProduct: null,
    productDetails:[],
    description: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case productConstants.GET_ALL_PRODUCT_SUCCESS:
            state = {
                ...state,
                products: action.payload.products,
            };

            break
        case productConstants.ADD_PRODUCT_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break
        case productConstants.ADD_PRODUCT_SUCCESS:
            state = {
                ...state,
                loading: false,
                addProduct: "success",
            };
            break
        case productConstants.ADD_PRODUCT_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            };
            break;
            case productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST:
                state = {
                    ...state,
                    loading: true,
                };
                break;
            case productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS:
                state = {
                    ...state,
                    loading: false,
                    productDetails: action.payload.productDetails,
                    description:action.payload.productDetails.descriptionTable[0],
                    
                };
                
                break;
            case productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE:
                state = {
                    ...state,
                    loading: false,
                    error: action.payload.error,
                };
                break;
    }
    
    return state;
};

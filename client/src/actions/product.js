import axios from "../helpers/axios";
import { productConstants } from "./constants";

const initParams = {
  page: 1,
  pageSize: 8,
  from: 0,
  to: 0,
};
const ORDER_OPTIONS = [
  {
    value: "newest",
    name: "Newest",
    sortBy: "createdAt",
    sortOrder: "desc",
  },
  {
    value: "priceLowToHigh",
    name: "Price - Low to high",
    sortBy: "salePrice",
    sortOrder: "asc",
  },
  {
    value: "priceHighToLow",
    name: "Price - High to low",
    sortBy: "salePrice",
    sortOrder: "desc",
  },
];
export const getByQuery = (params, size = initParams.pageSize) => {
  Object.keys(params).forEach(
    (key) =>
      (params[key] === undefined || params[key].length === 0) &&
      delete params[key]
  );
  const { page, pageSize, from, to, orderBy, ...dynamicParams } = {
    ...initParams,
    ...params,
    pageSize: size,
  };
  let price = "..";
  if (from && to) {
    price = `${from}..${to}`;
  } else if (from && !to) {
    price = `${from}..`;
  } else if (!from && to) {
    price = `..${to}`;
  }
  const sort = orderBy
    ? {
        sortOrder: ORDER_OPTIONS.find((x) => x.value === orderBy).sortOrder,
        sortBy: ORDER_OPTIONS.find((x) => x.value === orderBy).sortBy,
      }
    : {
        sortOrder: ORDER_OPTIONS[0].sortOrder,
        sortBy: ORDER_OPTIONS[0].sortBy,
      };
  return async (dispatch) => {
    try {
      dispatch({ type: productConstants.GET_PRODUCT_BY_QUERY_REQUEST });
      const res = await axios.get(`products/search/${page}/${pageSize}`, {
        params: { ...dynamicParams, salePrice: price, ...sort },
      });
      const result = {
        ...res.data.data,
        products: res.data.data.products.map((product) => ({
          ...product,
          price: product.salePrice,
        })),
      };
      dispatch({
        type: productConstants.GET_PRODUCT_BY_QUERY_SUCCESS,
        payload: result,
      });
    } catch (error) {
      dispatch({
        type: productConstants.GET_PRODUCT_BY_QUERY_FAILURE,
        payload: { error: error.response.data.error },
      });
    }
  };
};

export const getAllProducts = () => {
  return async (dispatch) => {
    dispatch({ type: productConstants.GET_ALL_PRODUCT_BY_QUERY_REQUEST });
    const res = await axios.get("/product/getAllProducts");
    console.log(res);
    if (res.status === 200) {
      console.log(res.data);
      const { allProducts } = res.data;
      dispatch({
        type: productConstants.GET_ALL_PRODUCT_BY_QUERY_SUCCESS,
        payload: { allProducts: allProducts },
      });
    } else {
      dispatch({
        type: productConstants.GET_ALL_PRODUCT_BY_QUERY_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const getProductsBySlug = (slug) => {
  return async (dispatch) => {
    const res = await axios.get(`/product/products/${slug}`);
    if (res.status === 200) {
      dispatch({
        type: productConstants.GET_PRODUCTS_BY_SLUG,
        payload: res.data,
      });
    }
    console.log(res);
  };
};
export const getProductPage = (payload) => {
  return async (dispatch) => {
    try {
      const { cid, type } = payload.params;
      const res = await axios.get(`/page/${cid}/${type}`);
      dispatch({ type: productConstants.GET_PRODUCT_PAGE_REQUEST });
      if (res.status === 200) {
        const { page } = res.data;
        dispatch({
          type: productConstants.GET_PRODUCT_PAGE_SUCCESS,
          payload: { page },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: productConstants.GET_PRODUCT_PAGE_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const getProductDetailsById = (payload) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST });
    let res;
    try {
      const { productId } = payload.params;
      res = await axios.get(`/product/${productId}`);
      console.log(res);
      dispatch({
        type: productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
        payload: { productDetails: res.data.product },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const addComment = (payload) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.ADD_COMMENT_PRODUCT_REQUEST });
    let res;
    try {
      res = await axios.post(`/comment/createComment`, { payload });
      console.log(res);
      // dispatch({
      //   type: productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
      //   payload: { productDetails: res.data.product },
      // });
    } catch (error) {
      console.log(error);
      // dispatch({
      //   type: productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
      //   payload: { error: res.data.error },
      // });
    }
  };
};
export const getComments = (payload) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.GET_COMMENT_PRODUCT_REQUEST });
    let res;
    try {
      res = await axios.post(`/comment/comments`, { productID: payload });
      console.log("getcommentm", res);
      dispatch({
        type: productConstants.GET_COMMENT_PRODUCT_SUCCESS,
        payload: { comment: res.data.allComment },
      });
      return res.data.allComment;
    } catch (error) {
      console.log(error);
      // dispatch({
      //   type: productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
      //   payload: { error: res.data.error },
      // });
    }
  };
};
export const searchProduct = (payload) => {
  const { orderBy } = payload;
  const sort = orderBy
    ? {
        sortOrder: ORDER_OPTIONS.find((x) => x.value === orderBy).sortOrder,
        sortBy: ORDER_OPTIONS.find((x) => x.value === orderBy).sortBy,
      }
    : {
        sortOrder: ORDER_OPTIONS[0].sortOrder,
        sortBy: ORDER_OPTIONS[0].sortBy,
      };
  console.log(sort);
  payload = { ...payload, ...sort };
  console.log(payload);
  return async (dispatch) => {
    dispatch({ type: productConstants.GET_PRODUCT_SEARCH_REQUEST });
    let res;
    console.log(payload);
    try {
      res = await axios.post("/product/searchProduct", {
        data: { payload },
      });
      console.log(res.data);
      dispatch({
        type: productConstants.GET_PRODUCT_SEARCH_SUCCESS,
        payload: { productSearch: res.data.productsSearch },
      });
      return res.data.productsSearch;
    } catch (error) {
      console.log(error);
      dispatch({
        type: productConstants.GET_PRODUCT_SEARCH_FAILURE,
        payload: { error: error },
      });
    }
  };
};

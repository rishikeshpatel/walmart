import {
  GETPRODUCTS,
  GETPRODUCTSUCCESS,
  GETPRODUCTFAILUER,
  SETSELECTEDPRODUCTINDEX,
} from "./actionType";
import axios from "axios";

export const getProducts = (pageNo, pageSize) => {
  return (dispatch) => {
    dispatch(getProductStarted(pageNo, pageSize));
    axios
      .get(
        `https://mobile-tha-server-8ba57.firebaseapp.com/walmartproducts/${pageNo}/${pageSize}`,
        {
          title: "GetProducts",
        }
      )
      .then((res) => {
        dispatch(getProductSuccess(res));
      })
      .catch((err) => {
        dispatch(getProductFailure(err.message));
      });
  };
};
const getProductSuccess = (product) => ({
  type: GETPRODUCTSUCCESS,
  payload: product,
});

const getProductStarted = (pageNo, pageSize) => ({
  type: GETPRODUCTS,
  payload:{pageNo, pageSize}
});

const getProductFailure = (error) => ({
  type: GETPRODUCTFAILUER,
  payload: error,
});

export const setSelectedProductIndex = (index) => ({
  type: SETSELECTEDPRODUCTINDEX,
  payload: index,
});

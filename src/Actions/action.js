import {
  GETPRODUCTS,
  GETPRODUCTSUCCESS,
  GETPRODUCTFAILUER,
  SETSELECTEDPRODUCTINDEX,
} from "./actionType";
import axios from "axios";

export const getProducts = (pageNo, pageSize, searchString) => {
  let reqURL = `https://mobile-tha-server-8ba57.firebaseapp.com/walmartproducts/${pageNo}/${pageSize}?`;
  if(searchString){
    reqURL = reqURL+`${searchString}`;
  }
  console.log("URL ",reqURL);
  return (dispatch) => {
    dispatch(getProductStarted(pageNo, pageSize, searchString));
    axios
      .get(
        reqURL,
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

const getProductStarted = (pageNo, pageSize, searchString) => ({
  type: GETPRODUCTS,
  payload:{pageNo, pageSize, searchString}
});

const getProductFailure = (error) => ({
  type: GETPRODUCTFAILUER,
  payload: error,
});

export const setSelectedProductIndex = (index) => ({
  type: SETSELECTEDPRODUCTINDEX,
  payload: index,
});

import {
  GETPRODUCTS,
  GETPRODUCTSUCCESS,
  GETPRODUCTFAILUER,
  SETSELECTEDPRODUCTINDEX,
  LOGINSTARTED,
  LOGINSUCCESS,
  LOGINFAILUER,
  LOGOUTSTARTED
} from "./actionType";
import axios from "axios";

export const getProducts = (pageNo, pageSize, searchString) => {
  let reqURL = `https://mobile-tha-server-8ba57.firebaseapp.com/walmartproducts/${pageNo}/${pageSize}?`;
  if (searchString) {
    reqURL = reqURL + `${searchString}`;
  }
  console.log("URL ", reqURL);
  return (dispatch) => {
    dispatch(getProductStarted(pageNo, pageSize, searchString));
    axios
      .get(reqURL, {
        title: "GetProducts",
      })
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
  payload: { pageNo, pageSize, searchString },
});

const getProductFailure = (error) => ({
  type: GETPRODUCTFAILUER,
  payload: error,
});

export const setSelectedProductIndex = (index) => ({
  type: SETSELECTEDPRODUCTINDEX,
  payload: index,
});

export const isLoggedIn = (isInitialCheck) => {
  let meURL = `/api/me`;
  return (dispatch) => {
    isInitialCheck && dispatch(loginStarted());
    axios
      .get(meURL)
      .then((res) => {
        dispatch(loginSuccess(res));
      })
      .catch((err) => {
        !isInitialCheck ? dispatch(loginFailuer(err.message)) : dispatch(loginFailuer(""));
      });
  };
};
export const onLogin = (userName, password) => {
  let reqURL = `/api/login`;
  let meURL = `/api/me`;
  return (dispatch) => {
    // dispatch(loginStarted(userName, password));
    axios
      .post(reqURL, {
        password: password,
        username: userName,
      })
      .then((res) => {
        dispatch(isLoggedIn(false))
      })
      .catch((err) => {
        dispatch(loginFailuer(err.message));
      });
  };
};
export const onLogout = () => {
  let reqURL = `/api/logout`;
  return (dispatch) => {
    dispatch(logoutStarted());
    axios
      .get(reqURL)
      .then((res) => {
        dispatch(isLoggedIn(true))
      })
      .catch((err) => {
        dispatch(loginFailuer(err.message));
      });
  };
};
const loginStarted = (userName, password) => ({
  type: LOGINSTARTED,
  payload: { userName, password },
});
const loginSuccess = (res) => ({
  type: LOGINSUCCESS,
  payload: res,
});
const loginFailuer = (res) => ({
  type: LOGINFAILUER,
  payload: res,
});

const logoutStarted = () => ({
  type: LOGOUTSTARTED,
  payload: {},
});

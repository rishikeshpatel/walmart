import {
  GETPRODUCTS,
  GETPRODUCTSUCCESS,
  GETPRODUCTFAILUER,
  SETSELECTEDPRODUCTINDEX,
  LOGINSTARTED,
  LOGINSUCCESS,
  LOGINFAILUER,
  LOGOUTSTARTED,
  GETPRESENTATIONSTARTED,
  GETPRESENTATIONSUCCESS,
  GETPRESENTATIONFAILUER,
  GETPRESENTATIONDETAILSSUCCESS,
  GETPRESENTATIONDETAILSFAILUER
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
        dispatch(getPresentation());
      })
      .catch((err) => {
        !isInitialCheck
          ? dispatch(loginFailuer(err.message))
          : dispatch(loginFailuer(""));
      });
  };
};
export const onLogin = (userName, password) => {
  let reqURL = `/api/login`;
  return (dispatch) => {
    axios
      .post(reqURL, {
        password: password,
        username: userName,
      })
      .then((res) => {
        dispatch(isLoggedIn(false));
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
        dispatch(isLoggedIn(true));
      })
      .catch((err) => {
        dispatch(loginFailuer(err.message));
      });
  };
};

export const getPresentation = () => {
  let reqURL = `/api/presentations?startIndex=0&stopIndex=9&type=own`;
  return (dispatch) => {
    dispatch(getPresentationStarted());
    axios
      .get(reqURL)
      .then((res) => {
        dispatch(getPresentationSuccess(res));
      })
      .catch((err) => {
        // console.log("Error : ",err)
        dispatch(getPresentationFailuer(err.message));
      });
  };
};
export const getPresentationDetails = (id) => {
  // let tempArr = [];
  // id.forEach((item,index) => {
  //   // tempArr.push(getDetails(item.id))
  //   getDetails(item.id).then((result) => {
  //     tempArr.push(result)
  //     console.log(tempArr)
  //   })
  // });
  // console.log(tempArr);
  // return (dispatch) => {
  //   dispatch(getPresentationDetailsSuccess(tempArr));
  // }
  let reqURL = `/api/presentations/${id}`;
  return (dispatch) => {
    // dispatch(getPresentationStarted());
    axios
      .get(reqURL)
      .then((res) => {
        dispatch(getPresentationDetailsSuccess(res));
      })
      .catch((err) => {
        // console.log("Error : ",err)
        dispatch(getPresentationDetailsFailuer(err.message));
      });
  };
};
// async function getDetails(id) {
//   try {
//     // fetch data from a url endpoint
//     const data =  axios.get("/some_url_endpoint");
//     return data;
//   } catch (error) {
//     alert(error); // catches both errors
//   }
// }
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
const getPresentationStarted = () => ({
  type: GETPRESENTATIONSTARTED,
  payload: {},
});
const getPresentationSuccess = (res) => ({
  type: GETPRESENTATIONSUCCESS,
  payload: res.data.rows,
});
const getPresentationFailuer = (error) => ({
  type: GETPRESENTATIONFAILUER,
  payload: error,
});
const getPresentationDetailsSuccess = (res) => ({
  type: GETPRESENTATIONDETAILSSUCCESS,
  payload: res,
});
const getPresentationDetailsFailuer = (error) => ({
  type: GETPRESENTATIONDETAILSFAILUER,
  payload: error,
});



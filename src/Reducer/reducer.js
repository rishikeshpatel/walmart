const initialState = {
  products: [],
  loading: false,
  error: "",
  index: 0,
  pageSize: 8,
  pageNo: 1,
  searchString: "",
  alreadyLoggedin: false,
  meData: {},
  presentationData: [],
  presentationDetails: [],
};

function productReducer(state = initialState, action) {
  switch (action.type) {
    case "GETPRODUCTS":
      return {
        ...state,
        products: [],
        loading: true,
        index: 0,
        pageNo: action.payload.pageNo,
        pageSize: action.payload.pageSize,
        searchString: action.payload.searchString,
      };
    case "GETPRODUCTSUCCESS":
      return {
        ...state,
        products: action.payload.data.products,
        loading: false,
        index: 0,
      };
    case "GETPRODUCTFAILUER":
      return { ...state, products: [], loading: false, error: action.payload };
    case "SETINDEX":
      return { ...state, index: action.payload };
    case "LOGINSTARTED":
      return { ...state, loading: true };
    case "LOGOUTSTARTED":
      return { ...state, loading: true, alreadyLoggedin: false };
    case "LOGINSUCCESS":
      return {
        ...state,
        loading: false,
        alreadyLoggedin: true,
        error: "",
        meData: action.payload,
      };
    case "LOGINFAILUER":
      return {
        ...state,
        error: action.payload,
        loading: false,
        alreadyLoggedin: false,
      };
    case "GETPRESENTATIONSTARTED":
      return {
        ...state,
        loading: true,
      };
    case "GETPRESENTATIONSUCCESS":
      // console.log("Success", action.payload);
      return {
        ...state,
        // loading: false,
        presentationData: action.payload,
      };
    case "GETPRESENTATIONFAILUER":
      // console.log("If unauthorised ; ",action.payload)
      return {
        ...state,
        loading: false,
        error: action.payload,
        alreadyLoggedin: false,
      };
    case "GETPRESENTATIONDETAILSSUCCESS":
      let tempPresentationDetails = state.presentationDetails;
      let tempPresentationlenth = state.presentationData.length
      tempPresentationDetails.push(action.payload.data.data)
      // console.log("Sceans : ",action.payload.data.data);
      return {
        ...state,
        presentationDetails: tempPresentationDetails,
        loading: tempPresentationDetails.length === tempPresentationlenth ? false : true
      };
    case "GETPRESENTATIONDETAILSFAILUER":
      console.log(action.payload);
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}

export default productReducer;

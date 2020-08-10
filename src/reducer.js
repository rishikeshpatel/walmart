const initialState = {
  products: [],
  loading: false,
  error: "",
  index: 0,
  pageSize: 8,
  pageNo: 1,
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
    default:
      return state;
  }
}

export default productReducer;

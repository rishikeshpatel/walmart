import React, { Component } from "react";
import "./App.css";
import Product from "./Components/Product";
import Productloading from "./Components/Productloading";
import { getProducts, setSelectedProductIndex } from "./Actions/action";
import { connect } from "react-redux";
import ProductDetails from "./Components/ProductDetails";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  Divider,
  Drawer,
  InputBase,
  FormControlLabel,
  Checkbox,
  Button,
  TextField,
} from "@material-ui/core";
import { Rating, Pagination } from "@material-ui/lab";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNo: props.value.pageNo,
      pageSize: props.value.pageSize,
      showProductDetailsPage: false,
      searchString: "",
      inStockFilter: false,
      ratingValue: 0,
      minPrice: null,
      maxPrice: null,
    };
  }
  componentDidMount() {
    const { getProducts } = this.props;
    getProducts(1, 8);
    this.setState({
      pageNo: this.props.value.pageNo,
      pageSize: this.props.value.pageSize,
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.value.loading !== prevProps.value.loading) {
      this.onReturntoProductList();
    }
  }
  // To see the product details page
  onProductClick = (index) => {
    const { setSelectedProduct } = this.props;
    setSelectedProduct(index);
    this.setState({
      showProductDetailsPage: true,
    });
  };

  // when returning from product details page
  onReturntoProductList = () => {
    this.setState({
      showProductDetailsPage: false,
    });
  };

  // on change of page number
  handlePaginationChange = (event, value) => {
    const { getProducts } = this.props;
    const { pageSize } = this.state;
    this.setState({
      pageNo: value,
    });
    console.log("Page size change : ", this.props.value.searchString);
    getProducts(value, pageSize, this.props.value.searchString);
  };
  // on change of page size
  handlePageSizeChange = (event) => {
    const { getProducts } = this.props;
    const { pageNo, searchString } = this.state;
    this.setState({
      pageSize: event.target.value,
    });
    getProducts(pageNo, event.target.value, searchString);
  };
  // on select of product rating
  handleRatingFilterChange = (event) => {
    this.setState({
      ratingValue: event.target.value,
    });
  };
  // on change of search input box --entering search value
  handleSearchStringChange = (event) => {
    this.setState({
      searchString: event.target.value,
    });
  };
  // on minimum price entered
  onMinPriceChange = (event) => {
    let tempMinValue = event.target.value;
    if (tempMinValue > 0) {
      this.setState({
        minPrice: tempMinValue,
      });
    }
  };
  // on maximum price entered
  onMaxPriceChange = (event) => {
    let tempMaxValue = event.target.value;
    if (tempMaxValue > 0) {
      this.setState({
        maxPrice: tempMaxValue,
      });
    }
  };
  // reset filters while searching
  resetFilters = () => {
    this.setState({
      inStockFilter: false,
    });
  };
  // on click of search icon
  onSearch = () => {
    const { searchString, pageNo, pageSize } = this.state;
    const { getProducts } = this.props;
    if (searchString) {
      this.resetFilters();
      getProducts(pageNo, pageSize, `search=` + searchString);
    }
  };
  // on press of enter button
  enterPressed = (event) => {
    var code = event.keyCode || event.which;
    const { searchString, pageNo, pageSize } = this.state;
    const { getProducts } = this.props;
    let tempSearchString = "";
    if (code === 13 && searchString) {
      tempSearchString = `search=` + searchString;
    }
    if (code === 13) {
      this.resetFilters();
      getProducts(
        pageNo,
        pageSize,
        tempSearchString ? tempSearchString : searchString
      );
    }
  };
  // on change of in stock filter check box
  handleInStockFilterChange = () => {
    const { inStockFilter } = this.state;
    this.setState({
      inStockFilter: !inStockFilter,
    });
  };
  // on click of filter button
  onFilterBtnClick = () => {
    const {
      searchString,
      pageNo,
      pageSize,
      inStockFilter,
      ratingValue,
      minPrice,
      maxPrice,
    } = this.state;
    const { getProducts } = this.props;
    let filteredProperties = "";
    if (searchString) {
      filteredProperties = `search=` + searchString;
    }
    if (inStockFilter && searchString) {
      filteredProperties = filteredProperties + `&inStock=True`;
    } else if (inStockFilter) {
      filteredProperties = filteredProperties + `inStock=True`;
    }
    if ((ratingValue && searchString) || (ratingValue && inStockFilter)) {
      filteredProperties =
        filteredProperties + `&minReviewRating=${ratingValue}`;
    } else if (ratingValue) {
      filteredProperties =
        filteredProperties + `minReviewRating=${ratingValue}`;
    }
    console.log("Min :",minPrice)
    console.log("Max : ",maxPrice)

    if (minPrice && maxPrice && (parseInt(minPrice) < parseInt(maxPrice))) {
      if (filteredProperties) {
        filteredProperties =
          filteredProperties + `&minPrice=${minPrice}&maxPrice=${maxPrice}`;
      } else {
        filteredProperties =
          filteredProperties + `minPrice=${minPrice}&maxPrice=${maxPrice}`;
      }
    }
    filteredProperties && getProducts(pageNo, pageSize, filteredProperties);
  };
  // on click of clear filter button
  clearFilters = () => {
    const { pageNo, pageSize } = this.state;
    this.setState({
      inStockFilter: false,
      searchString: "",
      ratingValue: 0,
      minPrice: "",
      maxPrice: "",
    });
    const { getProducts } = this.props;
    getProducts(pageNo, pageSize, "");
  };

  render() {
    const { value } = this.props;
    const {
      showProductDetailsPage,
      pageNo,
      pageSize,
      searchString,
      inStockFilter,
      ratingValue,
      minPrice,
      maxPrice,
    } = this.state;
    return (
      <Router>
        <div className="App">
          <AppBar position="fixed" className="app-bar">
            <Toolbar variant="dense">
              <IconButton edge="start" color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit">
                Product
              </Typography>
              <div className="search-bar">
                <InputBase
                  className="search-input-box"
                  placeholder="Search Products..."
                  inputProps={{ "aria-label": "search" }}
                  value={searchString}
                  onChange={this.handleSearchStringChange}
                  onKeyPress={this.enterPressed}
                />
                <div
                  style={{
                    backgroundColor: "#ffc220",
                    borderTopRightRadius: "17px",
                    borderBottomRightRadius: "17px",
                  }}
                >
                  <SearchIcon className="search-icon" onClick={this.onSearch} />
                </div>
              </div>
            </Toolbar>
          </AppBar>
          <div className="product-list-container">
            {!showProductDetailsPage && (
              <Drawer
                className="filter-drawer"
                variant="permanent"
                anchor="left"
              >
                <Divider />
                <Typography
                  className="filter-text"
                  variant="h6"
                  color="inherit"
                >
                  Filter
                </Typography>
                <br />
                <Divider />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={inStockFilter}
                      onChange={this.handleInStockFilterChange}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="In Stock"
                />
                <Divider />
                <br />

                <Typography variant="h6" color="inherit">
                  Minimum Ratings
                </Typography>
                <FormControl className="rating-value-selector">
                  <Select
                    labelId="rating-select-box"
                    id="demo-simple-select"
                    value={ratingValue}
                    onChange={this.handleRatingFilterChange}
                  >
                    <MenuItem value={1}>
                      <Rating name="read-only" value={1} readOnly />
                    </MenuItem>
                    <MenuItem value={2}>
                      <Rating name="read-only" value={2} readOnly />
                    </MenuItem>
                    <MenuItem value={3}>
                      <Rating name="read-only" value={3} readOnly />
                    </MenuItem>
                    <MenuItem value={4}>
                      <Rating name="read-only" value={4} readOnly />
                    </MenuItem>
                    <MenuItem value={5}>
                      <Rating name="read-only" value={5} readOnly />
                    </MenuItem>
                  </Select>
                </FormControl>
                <Divider />
                <br />

                <Typography variant="h6" color="inherit">
                  Price Range
                </Typography>
                <br />
                <div className="price-range-selector">
                  <TextField
                    id="min-price"
                    label="Min Price"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={minPrice}
                    onChange={this.onMinPriceChange}
                  />
                  <TextField
                    id="max-price"
                    label="Max Price"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={maxPrice}
                    onChange={this.onMaxPriceChange}
                  />
                </div>
                <Divider />
                <div className="filter-buttons">
                  <Button
                    className="apply-filter-btn"
                    variant="contained"
                    color="primary"
                    onClick={this.onFilterBtnClick}
                  >
                    Apply
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.clearFilters}
                  >
                    Clear
                  </Button>
                </div>
              </Drawer>
            )}

            <div class="row">
              <ul className="product-list">
                {!showProductDetailsPage &&
                  value.products.map((product, index) => {
                    return (
                      <div class="column">
                        <li key={index}>
                          <Link
                            to="/Product-Details"
                            style={{ textDecoration: "none" }}
                          >
                            <Product
                              data={product}
                              loading={value.loading}
                              onProductClick={this.onProductClick}
                              index={index}
                            />
                          </Link>
                        </li>
                      </div>
                    );
                  })}
              </ul>

              {value.loading && <Productloading />}
              {!value.loading && value.products.length === 0 && (
                <div className="no-products-found">
                  <h1> No products found</h1>
                </div>
              )}
              <Route exact path="/Product-Details" component={ProductDetails} />
            </div>
          </div>
          {!value.loading && !showProductDetailsPage && (
            <div className="product-pagination-container">
              <Pagination
                className="product-pagination"
                count={pageSize}
                page={pageNo}
                color="primary"
                variant="outlined"
                shape="rounded"
                onChange={this.handlePaginationChange}
              />
              <FormControl className="page-size-selector">
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={pageSize}
                  onChange={this.handlePageSizeChange}
                >
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                </Select>
              </FormControl>
            </div>
          )}
        </div>
      </Router>
    );
  }
}
const mapStateToProps = (state) => ({
  value: state,
});

const mapDispatchToProps = (dispatch) => ({
  getProducts: (pageNo, PageSize, searchString) =>
    dispatch(getProducts(pageNo, PageSize, searchString)),
  setSelectedProduct: (index) => dispatch(setSelectedProductIndex(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

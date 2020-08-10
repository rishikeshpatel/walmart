import React, { Component } from "react";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Product from "./Product";
import Productloading from "./Productloading";
import { getProducts, setSelectedProductIndex } from "./action";
import { connect } from "react-redux";
import ProductDetails from "./ProductDetails";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNo: props.value.pageNo,
      pageSize: props.value.pageSize,
      showProductDetailsPage: false,
    };
  }
  componentDidMount() {
    const { getProducts } = this.props;
    getProducts(1, 8);
    this.setState({
      pageNo : this.props.value.pageNo,
      pageSize: this.props.value.pageSize
    })
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.value.loading !== prevProps.value.loading) {
      this.onBackBtnClick();
    }
    console.log("Page : ",this.props.value.pageSize)
  }
  onProductClick = (index) => {
    const { setSelectedProduct } = this.props;
    setSelectedProduct(index);
    this.setState({
      showProductDetailsPage: true,
    });
  };
  onBackBtnClick = () => {
    this.setState({
      showProductDetailsPage: false,
    });
  };

  handlePaginationChange = (event, value) => {
    const { getProducts } = this.props;
    console.log("Selected value : ", value);
    this.setState({
      pageNo: value,
    });
    getProducts(value, this.state.pageSize);
  };
  handlePageSizeChange = (event) => {
    const { getProducts } = this.props;
    console.log("Selected value : ", event.target.value);
    this.setState({
      pageSize: event.target.value,
    });
    getProducts(1, event.target.value);
  };
  render() {
    const { value } = this.props;
    const { showProductDetailsPage, pageNo, pageSize } = this.state;
    return (
      <Router>
        <div className="App">
          <AppBar position="fixed">
            <Toolbar variant="dense">
              <IconButton
                edge="start"
                className={useStyles.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit">
                Product
              </Typography>
            </Toolbar>
          </AppBar>
          <div className="product-list-container">
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
  getProducts: (pageNo, PageSize) => dispatch(getProducts(pageNo, PageSize)),
  setSelectedProduct: (index) => dispatch(setSelectedProductIndex(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

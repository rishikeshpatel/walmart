import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Rating } from "@material-ui/lab";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProducts } from "../actions/action";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
class ProductDetails extends Component {
  render() {
    const { value } = this.props;
    const data = value.products[value.index];
    return (
      <>
        {!data ? (
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button variant="contained">Back</Button>
          </Link>
        ) : (
          <div className="product-main-container">
            <AppBar position="fixed" className="app-bar">
              <Toolbar variant="dense">
                <IconButton edge="start" color="inherit" aria-label="menu">
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="inherit">
                  Product Details
                </Typography>
              </Toolbar>
            </AppBar>

            <div className="product-details-container">
              <Link to="/" style={{ textDecoration: "none" }}>
                <Button variant="contained">Back</Button>
              </Link>
              <div className="product-image-container">
                <img
                  src={
                    "https://mobile-tha-server-8ba57.firebaseapp.com/" +
                    data.productImage
                  }
                  alt=""
                ></img>
              </div>
              <div className="product-details">
                <h1>{data.productName}</h1>
                <Rating
                  name="read-only"
                  value={data.reviewRating}
                  readOnly
                />{" "}
                &nbsp; &nbsp;&nbsp;{" "}
                <div className="rivew-count">{data.reviewCount} Reviews</div>
                <hr></hr>
                <div
                  className="long-description"
                  dangerouslySetInnerHTML={{ __html: data.longDescription }}
                ></div>
                <h1>PRICE : {data.price} </h1>
                <h4
                  dangerouslySetInnerHTML={{ __html: data.shortDescription }}
                ></h4>
                <Button variant="outlined" disabled={!data.inStock}>
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  value: state,
});
const mapDispatchToProps = (dispatch) => ({
  getProducts: (pageNo, PageSize, searchString) =>
    dispatch(getProducts(pageNo, PageSize, searchString)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);

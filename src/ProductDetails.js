import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Rating } from "@material-ui/lab";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProducts } from "./action";

class ProductDetails extends Component {
  onBackBtnClick = () => {
    const { value, getProducts } = this.props;
    getProducts(1, 8);
  };
  render() {
    const { value } = this.props;
    const data = value.products[value.index];
    return (
      <div className="product-main-container">
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button variant="contained" onClick={this.onBackBtnClick}>
            Back
          </Button>
        </Link>
        <div className="product-details-container">
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
            <Rating name="read-only" value={data.reviewRating} readOnly />{" "}
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
    );
  }
}

const mapStateToProps = (state) => ({
  value: state,
});
const mapDispatchToProps = (dispatch) => ({
  getProducts: (pageNo, PageSize) => dispatch(getProducts(pageNo, PageSize)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
// export default ProductDetails;

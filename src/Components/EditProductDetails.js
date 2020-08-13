import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";

class EditProductDetails extends Component {
  handleClose = () => {
    this.props.onClose();
  };
  render() {
    const { value } = this.props;
    const data = value.products[value.index];
    return (
      <div className="product-edit-modal-conatiner">
        <Dialog
          open={true}
          onClose={this.handleClose}
          className="product-edit-modal"
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Update Product Details
          </DialogTitle>
          <DialogContent>
            {/* <div className="product-image-container">
                <img
                  src={
                    "https://mobile-tha-server-8ba57.firebaseapp.com/" +
                    data.productImage
                  }
                  alt=""
                ></img>
              </div> */}
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Product Name"
              type="text"
              value={data.productName}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Review Rating"
              type="number"
              value={data.reviewRating}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Long Description"
              type="test"
              value={data.longDescription}
              multiline
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Short Description"
              type="textarea"
              multiline
              value={data.shortDescription}
              fullWidth
            />
            <FormLabel component="legend">In Stock</FormLabel>
            <RadioGroup
              className="inStock"
              aria-label="instock"
              name="instock"
              value={1}
            >
              <FormControlLabel value="No" control={<Radio />} label="No" />
              <FormControlLabel value="yes" control={<Radio />} label="yes" />
            </RadioGroup>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  value: state,
});
export default connect(mapStateToProps, null)(EditProductDetails);

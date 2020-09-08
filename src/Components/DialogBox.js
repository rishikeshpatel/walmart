import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import img1 from "../resources/img1.jpg";
const customeStyle = {
    height: "50%"
}
class DialogBox extends React.Component {
    // constructor(){

    // }
    dragElement = (elmnt) => {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      /* if present, the header is where you move the DIV from:*/
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      elmnt.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
  render() {
    const { open, handleClose } = this.props;
    return (
      <div className="ppt-container">
        <Dialog
          open={open}
          onClose={handleClose}
          fullScreen={true}
          disableEscapeKeyDown={true}
          style={customeStyle}
          className="presentation-container"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div className="parent">
            <img
              className="presentation-wall"
              src={img1}
              style={{ cursor: "zoom-in" }}
            />
           <div className="movable-div" onClick={this.dragElement}> <img className="image2" src={img1} style={{ cursor: "zoom-in" }} /></div>
            {/* <img className="image3" src={img1} style={{ cursor: "zoom-in" }} /> */}
          </div>

          {/* <DialogActions>
              <Button onClick={handleClose} color="primary">
                Disagree
              </Button>
              <Button onClick={handleClose} color="primary" autoFocus>
                Agree
              </Button>
            </DialogActions> */}
        </Dialog>
      </div>
    );
  }
}

export default DialogBox;

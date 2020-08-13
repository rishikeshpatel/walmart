import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Rating } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    textDecoration: "none",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

class Product extends Component {
  onProductClick = () => {
    const { index } = this.props;
    this.props.onProductClick(index);
  };
  render() {
    const { data } = this.props;
    return (
      <Card className={useStyles.root} onClick={this.onProductClick}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={useStyles.avatar}>
              W
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={this.props.data.productName}
          subheader={
            <div>
              <Rating name="read-only" value={data.reviewRating} readOnly />
              <div className="rivew-count">{data.reviewCount} Reviews</div>
            </div>
          }
        />
        <img
          className="image-container"
          src={
            "https://mobile-tha-server-8ba57.firebaseapp.com/" +
            data.productImage
          }
          alt=""
        ></img>
        <h1>{data.price}</h1>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            <h4
              dangerouslySetInnerHTML={{ __html: data.shortDescription }}
            ></h4>
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default Product;

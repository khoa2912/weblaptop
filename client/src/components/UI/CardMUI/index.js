import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  deprecatedPropType,
  Typography,
  withStyles,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
// import { makeStyles } from '@mui/styles';

const styles = {
  card: {
    minWidth: 275,
    display: "inline-block",
  },
};

function SimpleCard(props) {
  const { item } = props;
  console.log(item);
  const bull = <span className={item.bullet}>•</span>;

  return (
    <div
      style={{
        display: "inline-block",
        marginBottom: "20px",
      }}
    >
      <Card className={item.card} style={{ width: "100%" }}>
        <CardMedia
          component="img"
          height="170"
          image={item.image}
          alt="green iguana"
          style={{ objectFit: "fill" }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{ color: "black" }}
          >
            {item.label}
          </Typography>
          <Typography variant="body" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
          {/* <Typography className={item.label} color="black" style={{fontSize:'15px'}}>
                {item.label}
              </Typography> */}
        </CardContent>
        <CardActions>
          <Link
            to={`news/${item.label}`}
            style={{ textDecoration: "none", width: "100%" }}
          >
            <Button fullWidth style={{ fontSize: "12px" }}>
              Chi tiết
            </Button>
          </Link>
        </CardActions>
      </Card>
    </div>
  );
}

export default SimpleCard;

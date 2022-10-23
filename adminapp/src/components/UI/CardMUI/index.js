import { Button, Card, CardActions, CardContent, CardMedia,deprecatedPropType,Typography,withStyles } from "@mui/material";
import React from "react";
import { generatePublicUrl } from "../../../urlConfig";
// import { makeStyles } from '@mui/styles';

const styles = {
  card: {
    minWidth: 275,
    display: "inline-block"
  }
};

function SimpleCard(props) {
  const { item } = props;
  console.log(item)
  const bull = <span className={item.bullet}>•</span>;

  return (
    <div style={{ display: "inline-block" ,marginBottom:'20px',width:'12%'}}>
      <Card className={item.card} style={{width:'95%'}}>
        <CardMedia
            component="img"
            height="140"
            image={item.image&&generatePublicUrl(item.image.slice(9))}
            alt="green iguana"
            style={{objectFit:'contain'}}
        />
            <CardContent>
            <Typography className={item.label} color="textSecondary">
              {item.label}
            </Typography>
            </CardContent>
            <CardActions>
            <Button size="small">Chi tiết</Button>
            </CardActions>
      </Card>
    </div>
  );
}


export default SimpleCard;

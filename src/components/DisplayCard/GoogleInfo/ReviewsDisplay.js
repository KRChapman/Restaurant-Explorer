import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { getStarsToDisplay } from './getStars'
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    cursor: "default",
    padding: "10px",
    paddingBottom: "0px",

  },
  content: {

    padding: "5px",
    "&:last-child": {
      paddingBottom: "0px",
    },

  },
  media: {
    height: 140,
  },

  container: {
    marginTop: "15px",
    marginBottom: "15px",
  },

  date: {
    marginLeft: "10px",
  }
});








export default function ReviewDisplay(props) {
  const classes = useStyles();
  const { reviews } = props;

  



  const display = reviews.map((ele, i) => {
    const starsToDisplay = getStarsToDisplay(ele.rating);
    const googleStars = starsToDisplay.map((ele, i) => {
      return <img className="google-stars" src={ele} key={i} alt="" />
    })

    return (
      <div key={ele.id} className={classes.container}>
        <div className="google-stars-container">
          {googleStars}
        </div>
        <Typography variant="body2" color="textPrimary" component="p">
          {ele.text}
        </Typography>
        <a href={ele.url}>full review</a>
      </div>

    )
  })
  return (
    <React.Fragment>
      {display}
    </React.Fragment>
  );
}
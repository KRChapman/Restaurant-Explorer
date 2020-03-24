import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

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
    marginLeft: "15px",
  },
  starsTimeContainer: {
    display: "flex",
  }
});








export default function ReviewDisplay(props) {
  const classes = useStyles();
  const { reviews,url } = props;

  



  const display = reviews.map((ele, i) => {
    const starsToDisplay = getStarsToDisplay(ele.rating);
    const googleStars = starsToDisplay.map((ele, i) => {
      return <img className="google-stars" src={ele} key={i} alt="" />
    })

    return (
      <div key={ele.id} className={classes.container}>
        <div className={classes.starsTimeContainer}>
          <div className="google-stars-container">
            {googleStars}
          </div>
          <span className={classes.date}>{ele.relative_time_description}</span>
        </div>
       
        <Typography variant="body2" color="textPrimary" component="p">
          {ele.text}
        </Typography>
       
      </div>

    )
  })
  return (
    <React.Fragment>
      <div>        
        {display}
        <a href={url}>All Reviews</a>
      </div>
    
    </React.Fragment>
  );
}
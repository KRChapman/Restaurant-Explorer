
import React from 'react';
import GoogleInfo from './GoogleInfo/index';
import YelpInfo from './YelpInfo/index';
import HealthInfo from './HealthInfo/index.js';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';


import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
  root: {
   maxWidth: 225,
     flexGrow: 1,
    margin: '0.5%',

   // boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",

//transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  },
  media: {
    height: 120,
  },

  content: {
    cursor: 'auto',
  }

});
const DisplayCard = (props) => {
  const classes = useStyles();
  const { googlePlace, yelpPlace, healthPlace } = props.placeData

  
  
  // 
  return (

    <Card className={classes.root} elevation={8}>

        <CardMedia
          className={classes.media}
          image={googlePlace.photo || "na"}
            title={googlePlace.name}
        />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h6" color="primary" component="h6">
              {googlePlace.name}
          </Typography>
          <Typography variant="body1" color="textPrimary" component="p">
              <GoogleInfo googlePlace={googlePlace} />
        </Typography>
              <YelpInfo yelpPlace={yelpPlace} />
              <HealthInfo healthPlace={healthPlace} />
         
        </CardContent>
   
      <CardActions>
          
     
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
   
  )
    }

// const thing = <div className="display-card" >
//   <img className="location-image" src={googlePlace.photo || ""} alt="" />
//   <GoogleInfo googlePlace={googlePlace} />
//   <div className="yelp">
//     <YelpInfo yelpPlace={yelpPlace} />
//   </div>
//   <div className="health">
//     <HealthInfo healthPlace={healthPlace} />
//   </div>
// </div>

export default DisplayCard;
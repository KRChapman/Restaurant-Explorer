
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
import useStockPhotos from './GoogleInfo/useStockPhotos'

import GeneralInfo from './GeneralInfo/index'


const useStyles = makeStyles({
  root: {
   maxWidth: 350,
     flexGrow: 1,
    margin: '0.5%',
     
  },
  media: {
    height: 120,
  },

  content: {
    cursor: 'auto',
  //  padding: "none",
    "&:last-child" :{
      paddingBottom: "12px",
    },
  }

});
const DisplayCard = (props) => {
  const classes = useStyles();
  const { placeData, isDesktop} =props;
  const { googlePlace, yelpPlace, healthPlace, generalInfo } = props.googleYelpHealthData
 
  const photo = useStockPhotos(googlePlace.photo);

  return (

    <Card className={classes.root} elevation={8} onMouseEnter={(event) => props.changeMapIcon(googlePlace.placeId,event)}>

        <CardMedia
          className={classes.media}
          image={photo || 'na'}
            title={googlePlace.name}
        />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h6" color="primary" component="h6">
              {googlePlace.name}
          </Typography>
        <GeneralInfo generalInfo={generalInfo} />
          <Typography variant="body1" color="textPrimary" component="div">
          <GoogleInfo isDesktop={isDesktop} placeData={placeData} googlePlace={googlePlace} />
        </Typography>
        <Typography variant="body1" color="textPrimary" component="div">
          <YelpInfo isDesktop={isDesktop} yelpPlace={yelpPlace} />
        </Typography>
        <Typography variant="body1" color="textPrimary" component="div">
          <HealthInfo healthPlace={healthPlace} />
        </Typography>
       
        
        </CardContent>
   
    </Card>
   
  )
    }

export default DisplayCard;
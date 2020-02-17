
import React from 'react';
import GoogleInfo from './GoogleInfo/index';
import YelpInfo from './YelpInfo/index';
import HealthInfo from './HealthInfo/index.js';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => {

  // return {
  //   displayCard:{
  //      boxShadow:

  //   }
  // }
})
const DisplayCard = (props) => {
  const { googlePlace, yelpPlace, healthPlace } = props.placeData
  
  return (
    <div className="display-card" >
      <img className="location-image" src={googlePlace.photo || ""} alt="" />
      <GoogleInfo googlePlace={googlePlace}/>
      <div className="yelp">
        <YelpInfo yelpPlace={yelpPlace}/>
      </div>
      <div className="health">
        <HealthInfo healthPlace={healthPlace}/>
      </div>
    </div>
  )
}

export default DisplayCard;
import React from 'react';
import RatingImages from './RatingImages';
import Typography from '@material-ui/core/Typography';

const YelpInfo = (props) => {
  const { yelpPlace} = props;
  const rating = yelpPlace.rating.toString()

  return (
    <div className={"yelp-container"}>
    
      <div className="yelp-rating">Yelp: {rating || ""}</div>
      <RatingImages rating={rating} />
     
    </div>
  )
}

export default YelpInfo;
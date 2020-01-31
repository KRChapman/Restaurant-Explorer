import React from 'react';
import RatingImages from './RatingImages';

const YelpInfo = (props) => {
  const { yelpPlace} = props;
  const rating = yelpPlace.rating.toString()

  return (
    <div>
      <h5>{yelpPlace.name || ""}</h5>
      <RatingImages rating={rating} />
      <div className="rating">{rating || ""}</div>
    </div>
  )
}

export default YelpInfo;
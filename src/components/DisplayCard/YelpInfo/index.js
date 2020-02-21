import React from 'react';
import RatingImages from './RatingImages';

const YelpInfo = (props) => {
  const { yelpPlace} = props;
  const rating = yelpPlace.rating.toString()

  return (
    <div>

      <RatingImages rating={rating} />
      <div className="rating">{rating || ""}</div>
    </div>
  )
}

export default YelpInfo;
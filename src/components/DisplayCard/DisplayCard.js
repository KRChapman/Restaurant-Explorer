
import React from 'react';

const DisplayCard = (props) => {
  console.log('prps.', props.placeData);

  const { googlePlace } = props.placeData;
  const { yelpPlace } = props.placeData;
  const { healthPlace } = props.placeData;
  // STOCK PHOTO OR MAYBE USE YELP IF GOOGLE PHOTO NULL
  return (
    <div className="display-card" >
      <div className="google">
        <img src={googlePlace.photo || ""} alt="" />
        <h5>{googlePlace.name || ""}</h5>
        <div className="rating">{googlePlace.rating || ""}G</div>
      </div>
      <div className="yelp">
        <img src={props.picture || ""} alt="" />
        <h5>{yelpPlace.name || ""}</h5>
        <div className="rating">{yelpPlace.rating || ""}</div>
      </div>
      <div className="health">
        <h5>{healthPlace.name || ""}</h5>
        <div className="rating">{healthPlace.recentGrade}</div>
      </div>

     
    </div>
  )
}

export default DisplayCard;
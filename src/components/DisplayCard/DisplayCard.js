
import React from 'react';
import GoogleInfo from './../GoogleInfo/index'
const DisplayCard = (props) => {

  const { googlePlace, yelpPlace, healthPlace } = props.placeData
  
  return (
    <div className="display-card" >
      <GoogleInfo googlePlace={googlePlace}/>
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
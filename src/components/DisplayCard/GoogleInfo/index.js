import React from 'react';
import halfStar from './../../../assets/google/half.png';
import wholeStar from './../../../assets/google/full.png';
import emptyStar from './../../../assets/google/empty.png';

const GoogleInfo = (props) => {
  const { googlePlace } = props;
  const multiplier = 10;
  const originalRating = googlePlace.rating * multiplier
  const truncRating = Math.trunc(googlePlace.rating);
  const partialRating = originalRating - truncRating * multiplier;
  const totalStars = 5;
  const starsToDisplay = [];

  // Google shows half stars from .3 to .7
  for (let i = 0; i < totalStars; i++) {
    if (i < truncRating) {
      starsToDisplay.push(wholeStar);
    }
    else if (i === truncRating) {
      // when the iteration reaches the last star
      const partialStar = partialRatingStar(partialRating);
      starsToDisplay.push(partialStar);
    }
    else {
      starsToDisplay.push(emptyStar);
    }
  }

 const googleStars = starsToDisplay.map((ele,i)=>{
    return <img className="google-stars" src={ele} key={i} alt="" />
  })
  
  return (
    <div className="google-container">
   

      <div className="google-rating">Google: {googlePlace.rating || ""}</div>
      <div className="google-stars-container">
        
        {googleStars}
      </div>
    </div>
  )

  function partialRatingStar(partialRating) {
    let star;
    switch (true) {
      case (partialRating >= 8):
        star = wholeStar;
        break;
      case (partialRating >= 3):
        star = halfStar;
        break;
      case (partialRating >= 0):
        star = emptyStar;
        break;
      default:
        star = emptyStar;
        break;
    }
    return star;
  }
}

export default GoogleInfo;
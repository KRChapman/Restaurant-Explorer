import React from 'react';
import halfStar from './../../../assets/google/half.png';
import wholeStar from './../../../assets/google/full.png';
import emptyStar from './../../../assets/google/empty.png';
import { Link, Reviews} from './../SharedCardBtns/index'


const GoogleInfo = (props) => {
  const { googlePlace, placeData, isDesktop } = props;
  const starsToDisplay = getStarsToDisplay(googlePlace);
  const directionUrl = formatDirectionUrl(googlePlace, placeData);
 const googleStars = starsToDisplay.map((ele,i)=>{
    return <img className="google-stars" src={ele} key={i} alt="" />
  })
  
  return (
    <div className="google-container">
   

      <div className="google-rating">Google: {googlePlace.rating || ""}</div>
      <div className="google-stars-container">
        
        {googleStars}
      </div>
      <div className={'test'}>
        <Link isDesktop={isDesktop} url={directionUrl}>Directions</Link>
        <Reviews reviewCount={googlePlace.reviewsTotal}> </Reviews>
      </div>
    </div>
  )


}


function getStarsToDisplay(googlePlace) {
  const multiplier = 10;
  // multiply by 10 to avoid potential floating point errors since javascript numbers are just floats
  const originalRating = googlePlace.rating * multiplier;
  const truncRating = Math.trunc(googlePlace.rating);
  const partialRating = originalRating - truncRating * multiplier;
  const totalStars = 5;
  const starsToDisplay = [];
  // Google shows half stars from .3 to .7
  for (let i = 0; i < totalStars; i++) {
    if (i < truncRating) {
      starsToDisplay.push(wholeStar);
    }
    // when the iteration reaches the last star
    else if (i === truncRating) {     
      const partialStar = partialRatingStar(partialRating);
      starsToDisplay.push(partialStar);
    }
    else {
      starsToDisplay.push(emptyStar);
    }
  }
  return starsToDisplay;
}

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

function formatDirectionUrl(googlePlace, placeData){
  const regSpace = "\s";
  const placeId = googlePlace.placeId;
  const name = googlePlace.name.replace(regSpace, '+');
 // const address = googlePlace.address;
 
  const cityState = `${placeData.city}+${placeData.state}`

 // https://developers.google.com/maps/documentation/directionUrls/guide#directions-action
  const basedirectionUrl = `https://www.google.com/maps/dir/?api=1&destination_place_id=${placeId}&destination=${name}+${cityState}`
  return basedirectionUrl;
}

export default GoogleInfo;
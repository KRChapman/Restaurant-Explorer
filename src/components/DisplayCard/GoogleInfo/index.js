import React from 'react';
import halfStar from './../../../assets/google/half.png';
import wholeStar from './../../../assets/google/full.png';
import emptyStar from './../../../assets/google/empty.png';
import { Link, Reviews} from '../SharedComponents/index'
import { getStarsToDisplay, partialRatingStar} from './getStars'


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
      <div className={'google-btns'}>
        <Link isDesktop={isDesktop} url={directionUrl}>Directions</Link>
        <Reviews reviewCount={googlePlace.reviewsTotal}> </Reviews>
      </div>
    </div>
  )


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
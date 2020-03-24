import React, { useState, useReducer } from 'react';
import { Link, Reviews, ReviewContainer} from '../SharedComponents/index'
import { getStarsToDisplay} from './getStars'
import ReviewsDisplay from './ReviewsDisplay';
import { WarnPopover } from './../../../components/PopOver/index';

const GoogleInfo = (props) => {
  const [isShowReviews, setIsShowReviews] = useState({ anchorEl: null});
  const { googlePlace, placeData, isDesktop } = props;
  const starsToDisplay = getStarsToDisplay(googlePlace.rating);
  const directionUrl = formatDirectionUrl(googlePlace, placeData);
 const googleStars = starsToDisplay.map((ele,i)=>{
    return <img className="google-stars" src={ele} key={i} alt="" />
  })

  const handleReview = (e) => {
    const anchorEl = e.currentTarget;
    setIsShowReviews({ anchorEl})
  }

  const reviewsToDisplay = <ReviewContainer title={"Selected Reviews"}>
    <ReviewsDisplay reviews={googlePlace.reviews} url={googlePlace.url} />
  </ReviewContainer>;

  const popOver = isShowReviews.anchorEl == null ? null : <WarnPopover setanchorEl={(inp) => setIsShowReviews({ anchorEl: inp })} anchorEl={isShowReviews.anchorEl}>{reviewsToDisplay}</WarnPopover>

  
  return (
    <div className="google-container">
   

      <div className="google-rating">Google: {googlePlace.rating || ""}</div>
      <div className="google-stars-container">
        
        {googleStars}
      </div>
      <div className={'google-btns'}>
        <Link isDesktop={isDesktop} url={directionUrl}>Directions</Link>
        <Reviews reviewCount={googlePlace.reviewsTotal} action={handleReview}> </Reviews>
        {popOver}
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
import React from 'react';
import RatingImages from './RatingImages';
import Typography from '@material-ui/core/Typography';
import {Link,Reviews} from './../SharedCardBtns/index'

const YelpInfo = (props) => {
  const { yelpPlace, isDesktop} = props;
  const rating = yelpPlace.rating.toString();
  const handleReviewShow = async() =>{

  }
  return (
    <div className={"yelp-container"}>
    
      <div className="yelp-rating">Yelp: {rating || ""}</div>
      <div className={"rating-picture"}> 
        <RatingImages rating={rating} />
      </div>
   
      <div>
        <Link isDesktop={isDesktop} >Page</Link>
        <Reviews action={handleReviewShow}> </Reviews>
      </div>
    </div>
  )
}

export default YelpInfo;
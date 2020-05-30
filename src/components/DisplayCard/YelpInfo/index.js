import React, { useState, useReducer} from 'react';
import RatingImages from './RatingImages';
import Typography from '@material-ui/core/Typography';
import { Link, Reviews, ReviewContainer} from '../SharedComponents/index';
import { getYelpReviews} from './../../../Api/helper';
import { WarnPopover} from './../../../components/PopOver/index';
import ReviewsDisplay from './ReviewsDisplay';
const YelpInfo = (props) => {
  const [yelpReviewState, setYelpReviewState] = useReducer((state,newState)=>{
                                                  return {...state,...newState}
                                                }, { anchorEl: null, reviews: [] })
  const [prevReviews, setPevReviews] = useState([])
  
  const { yelpPlace, isDesktop} = props;
  const rating = yelpPlace.rating;
  const yelpId = yelpPlace.yelpId;
  const url = yelpPlace.url;
  const reviewCount = yelpPlace.reviewCount;
 // debugger;

  const handleReview = async(e) =>{
  
    const anchorEl = e.currentTarget;
    let reviews;
    const found = prevReviews.find(ele=> {
      return ele.yelpId === yelpId
    })
    try {

      if (found){
        reviews = found.reviews;
      }
      else{
       const data = await getYelpReviews(yelpId);
        reviews  = data.yelpData.reviews;
        setPevReviews(prevState=> {
          const prevYelpReview = {
            yelpId: yelpId,
            reviews: reviews
          }
 
          return prevState.concat(prevYelpReview)
        });
      }
      
    } catch (error) {
      console.log('errorYelpInfo', error);
    }
    
    setYelpReviewState({ anchorEl, reviews });
  }
  const reviewsToDisplay = <ReviewContainer title={"Revew Excerpts"}>
                    <ReviewsDisplay reviews={yelpReviewState.reviews} />
                   </ReviewContainer>;
                                                                                      // corrospond input with state reducer
  const popOver = yelpReviewState.anchorEl == null ? null : <WarnPopover setanchorEl={(inp) => setYelpReviewState({ anchorEl: inp })} anchorEl={yelpReviewState.anchorEl}>{reviewsToDisplay}</WarnPopover>

  return (
    <div className={"yelp-container"}>
    
      <div className="yelp-rating">Yelp: {rating || ""}</div>
      <div className={"rating-picture"}> 
        <RatingImages rating={rating} />
      </div>
   
      <div className={'yelp-btns'}>
        <Link isDesktop={isDesktop} url={url} >Page</Link>
        <Reviews reviewCount={reviewCount} action={handleReview}> </Reviews>
        {popOver}
      </div>
    </div>
  )
}
// (e) => handleReview(e, yelpId)
export default YelpInfo;
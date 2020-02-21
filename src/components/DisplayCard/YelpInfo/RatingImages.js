
import React, { useState, useEffect, useRef, useCallback } from 'react';

const RatingImages = (props) => {
  const [src, setSrc] = useState(null);

  const loadImage = rating => {
     const images = {'0': 'regular_0.png', '0.5': 'regular_1.png',
    '3': 'regular_3.png', '3.5': 'regular_3_half.png',
       '4': 'regular_4.png', '4.5': 'regular_4_half.png'}
    const pic = images[rating] || 'regular_0.png';
    import(`./../../../assets/yelp/regular/${pic}`)
      .then(image => {
        setSrc( image )
      })
  }
  
  useEffect(()=>{
    loadImage(props.rating);
  }, [props.rating])

  const content =  (
    <React.Fragment>
      {src && <img src={src.default} alt="" />}
    </React.Fragment>
      
  )
  return content;
}

export default RatingImages;

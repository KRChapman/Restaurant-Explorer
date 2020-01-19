
import React from 'react';

const DisplayCard = (props) => {

  return (
    <div className="display-card">
      <img src={props.picture} alt="" />
      <h5>{props.name}</h5>
      <div className="rating">{props.rating}</div>
    </div>
  )
}

export default DisplayCard;
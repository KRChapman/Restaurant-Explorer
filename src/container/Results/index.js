import React, { useState, useEffect, useRef, useCallback } from 'react';
import DisplayCard from './../../components/DisplayCard/DisplayCard'

const Results = (props) => {
  const { placesToDisplay} = props;

  let toDisplay = null;
  if (placesToDisplay.length > 0) {
    toDisplay = placesToDisplay.map((ele, i) => {
      return <DisplayCard key={i} placeData={ele}/>
    })
    // 
  } 

  return (
    <div>{toDisplay}</div>
  )
}

export default Results;
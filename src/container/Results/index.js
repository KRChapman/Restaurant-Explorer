import React, { useState, useEffect, useRef, useReducer } from 'react';
import DisplayCard from './../../components/DisplayCard/DisplayCard'
import QuickSearch from '../../components/QuickSearch/index';
import ControlButtons from './../../components/ControlButtons/index';

const Results = (props) => {
  const [placesViewRange, dispatchPlacesViewRange] = useReducer(navigatePlacesViewRangeReducer,{start:0, end:0});
  const [currentPlacesToDisplay, setCurrentPlacesToDisplay] = useState([]);
  const { placesToDisplay, getMorePlaces, displayInc,changeMapIcon, setAllPlaces, setPlaceDataForQuery} = props;
  const totalPlaces = placesToDisplay.length;

  useEffect(()=> {
    dispatchPlacesViewRange({ type: "INITIAL", payload: { totalPlaces, displayInc } });
  }, [ displayInc, totalPlaces])

  useEffect(() => {
   const {start, end} = placesViewRange;
   const partialDisplay = placesToDisplay.slice(start,end)
   setCurrentPlacesToDisplay(partialDisplay)
  }, [placesViewRange, placesToDisplay])
 
  let toDisplay = null;
  if (totalPlaces > 0) {
    toDisplay = currentPlacesToDisplay.map((ele, i) => {
      return <DisplayCard changeMapIcon={changeMapIcon} key={i} placeData={ele}/>
    })
  } 
  const changeViewRangeHandler = (e,type) => {
    if (type === 'INCREMENT' && placesViewRange.end === totalPlaces){
      getMorePlaces();
    }
    else{
      dispatchPlacesViewRange({ type, payload: { totalPlaces, displayInc } });
    }
  }
  return (
    <div>
      <div>
        <QuickSearch setAllPlaces={setAllPlaces} setPlaceDataForQuery={setPlaceDataForQuery} />
        <ControlButtons changeViewRange={changeViewRangeHandler}/>
      </div>

      <div className="card-container">{toDisplay}</div>
    </div>
  )
}

function navigatePlacesViewRangeReducer(currentState, action) {
  const placesViewRange = { ...currentState};
  const { totalPlaces, displayInc } = action.payload;
  const min = 0;
  const incrementEnd = placesViewRange.end + displayInc;
  const incrementStart = incrementEnd - displayInc;
  switch (action.type) {
    case "INITIAL":
      const initialStart = totalPlaces - displayInc > 0 ? totalPlaces - displayInc : 0;
      const initialEnd = totalPlaces;
      return { start: initialStart, end: initialEnd};

    case "INCREMENT":  
      // If increment reaches beyond places total length then just return places total length;
      placesViewRange.end = incrementEnd < totalPlaces ? incrementEnd : totalPlaces;
      placesViewRange.start = incrementStart;
      return placesViewRange; 

    case "DECREMENT": 
     placesViewRange.start = placesViewRange.start - displayInc > 0 ?  placesViewRange.start - displayInc : 0;
     placesViewRange.end = placesViewRange.start + displayInc;
      return placesViewRange;
    default:
      break;
  }
}

export default Results;
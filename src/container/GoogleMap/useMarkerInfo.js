import React, { useState, useEffect, useRef, useReducer,useCallback } from 'react';

import{ WarnPopover } from '../../components/PopOver/index'
import { GooglePlace} from './../../Models/place'
import DisplayCard from './../../components/DisplayCard/DisplayCard'
//'./../../components/DisplayCard/DisplayCard'

//
const useMarkerInfo = (mapMarkers, googleData, getPlaceForMap, getDataByPlaceId, mapPlaceToDisplay,placeData) => {
 // const [anchorEl, setAnchorEl] =  useState(null);
  const [markerInfo, setMarkerInfo] = useReducer((state, newState) => {
    return { ...state, ...newState }
  }, { anchorEl: null, infoDisplay: "" })
  //debugger;
  useEffect(()=> {

    mapMarkers.forEach((ele, i) => {
      
     // console.log('googleData', googleData);
      if (mapMarkers.length > 0){
    
       
       
      //  const googlePlace = new GooglePlace(found.placeId, found, placeDetails);
        ele.addListener('click', function (e) {

          const found = googleData.find(elementToFind => ele.title === elementToFind.name);
          // console.log('map', found);
          // const placeDetails = getDataByPlaceId("placesDetails",found.placeId);
          // console.log('ele', placeDetails);
          getPlaceForMap(found);
          setMarkerInfo({ anchorEl: e.tb.target });
          //pDoc.parentElement
        });
     }
 

     // googleData[]

    })
  }, [mapMarkers, googleData, getPlaceForMap, getDataByPlaceId])

  useEffect(()=> {
   // debugger;
    const isMapPlaceToDisplay = Object.keys(mapPlaceToDisplay).length > 0 && mapPlaceToDisplay.constructor === Object ? true : false;
    if (isMapPlaceToDisplay){
      
      const displaycard = <DisplayCard isDesktop={true} isShowHealth={true} placeData={placeData} changeMapIcon={() => null} googleYelpHealthData={mapPlaceToDisplay} />
      setMarkerInfo({ infoDisplay: displaycard });
    }
    
  }, [mapPlaceToDisplay, placeData] )

 /// generalInfo googlePlace healthPlace yelpPlace

  return <WarnPopover setanchorEl={(inp) => setMarkerInfo({ anchorEl: inp })} anchorEl={markerInfo.anchorEl} >{markerInfo.infoDisplay}</WarnPopover>
}

export default useMarkerInfo;
import React, { useState, useEffect, useRef, useReducer,useCallback } from 'react';

import{ WarnPopover } from '../../components/PopOver/index'
import { GooglePlace} from './../../Models/place'
import { DisplayCard} from './../../components/DisplayCard/DisplayCard'

const useMarkerInfo = (mapMarkers, googleData, getPlaceForMap, getDataByPlaceId) => {
 // const [anchorEl, setAnchorEl] =  useState(null);
  const [markerInfo, setMarkerInfo] = useReducer((state, newState) => {
    return { ...state, ...newState }
  }, { anchorEl: null, info: {} })
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
          setMarkerInfo({ anchorEl: e.tb.target, info: {name:'g'} });
          //pDoc.parentElement
        });
     }
 

     // googleData[]

    })
  }, [mapMarkers, googleData, getPlaceForMap, getDataByPlaceId])



  return <WarnPopover setanchorEl={(inp) => setMarkerInfo({ anchorEl: inp })} anchorEl={markerInfo.anchorEl} >hi</WarnPopover>
}

export default useMarkerInfo;
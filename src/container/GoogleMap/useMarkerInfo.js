import React, { useState, useEffect, useRef, useCallback } from 'react';





const useMarkerInfo = (mapMarkers) => {

  useEffect(()=> {
    console.log('mapssss', mapMarkers);
    mapMarkers.forEach((ele, i) => {


      ele.addListener('click', function (e) {
        console.log('map', e.tb);

        //pDoc.parentElement
      });

    })
  }, [mapMarkers])


}

export default useMarkerInfo;
// TURN INTO HOOK
import React, { useState, useEffect, useRef, useCallback } from 'react';
import googleMap from './../../../Api/GoogleMaps/helper';
import { useDidUpdateEffect} from './../../../hooks/index'
const Place = props => {
  const { setPlaceDataForQuery } = props
  const [place, setPlace] = useState("");
  
  // const setThePlace = (place) => {
  //   //context in event call back function
  //   setPlace(place);
  // }

  // prevents useEffect from rerender like with a normal function
  // only if useCallback dependencies change
  
  const formatPlaceDataForQuery = useCallback(() => {
    const PlaceData = {
      city: place.address_components[0].long_name,
      state: place.address_components[2].short_name,
      country: place.address_components[3].short_name,
    }

   setPlaceDataForQuery(PlaceData);
  }, [place, setPlaceDataForQuery])

  useEffect(()=> {
    // https://developers.google.com/maps/documentation/javascript/places-autocomplete
    var input = document.getElementById('searchPlace');
    googleMap.autoCompletePlace(input, setPlace);
  }, [])



  // useDidUpdateEffect(()=> {
  //   formatPlaceDataForQuery(place)
  // }, [place])
  const previousPlace = useRef(place);
  useEffect(() => {
    if (previousPlace.current !== place) {
      formatPlaceDataForQuery();
      previousPlace.current = place;
    }
  }, [place, formatPlaceDataForQuery]);



    return ( 
      <div>
        <input id={"searchPlace"} type="text" />

      </div>
     )

}
 
export default Place;

// TURN INTO HOOK
import React, { useState, useEffect, useRef, useCallback } from 'react';
import googleMap from './../../../Api/GoogleMaps/helper';
import { useDidUpdateEffect} from './../../../hooks/index'
const Place = props => {
  const { setPlaceDataForQuery } = props
  const [place, setPlace] = useState("");

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
    // use google api and set up listener for input to change when it does setPlace state
    googleMap.autoCompletePlace(input, setPlace);
  }, [])




  // on initial component load sets reference to current place
  const previousPlace = useRef(place);
  // get similer behavior to componentdidUpdate
  useEffect(() => {
    // when previousPlace is not equal to new sate for place from google maps autocomplete above
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

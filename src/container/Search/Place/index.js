// TURN INTO HOOK
import React, { useState, useEffect } from 'react';
import googleMap from './../../../Api/GoogleMaps/helper';
import { useDidUpdateEffect} from './../../../hooks/index'
const Place = props => {
  
  const [place, setPlace] = useState("");
  
  // const setThePlace = (place) => {
  //   //context in event call back function
  //   setPlace(place);
  // }

  useEffect(()=> {
    // https://developers.google.com/maps/documentation/javascript/places-autocomplete
    var input = document.getElementById('searchPlace');
    googleMap.autoCompletePlace(input, setPlace);
  }, [])

  useDidUpdateEffect(()=> {
    formatPlaceDataForQuery(place)
  }, [place])

  function formatPlaceDataForQuery(place){
    const PlaceData ={
      city: place.address_components[0].long_name,
      state: place.address_components[2].short_name,
      country: place.address_components[3].short_name,
    }
   
    props.setPlaceDataForQuery(PlaceData);
  }

    return ( 
      <div>
        <input id={"searchPlace"} type="text" />

      </div>
     )

}
 
export default Place;

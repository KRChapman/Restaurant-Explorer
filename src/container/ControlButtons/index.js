import React, {useState, useEffect, useRef,} from 'react';
import {googleMapsApi }from './../../Api/helper'
const ControlButtons = (props) => {
  const { setAllPlaces, setPlaceDataForQuery} = props;
  const seattleCoordinates = { lat: 47.6062095, lng: -122.3320708, }
  const seattleData = {
    
      city: "Seattle",
      state: "WA",
      country: "US",
  }
  const burgerInput = 'pizza';


  // long_name: "Seattle"
  // short_name: "Seattle"

  // long_name: "King County"
  // short_name: "King County"

  // long_name: "Washington"
  // short_name: "WA"


  // long_name: "United States"
  // short_name: "US"
  // setPlaceDataForQuery(PlaceData)
  return (
    <div>
      <button onClick={getAllPlaces}>Seattle burgers</button>
    </div>
  )

  function getAllPlaces(){
    setPlaceDataForQuery(seattleData);
    googleMapsApi.initiateMap(seattleCoordinates.lat, seattleCoordinates.lng);
    googleMapsApi.findPlaces(burgerInput, setAllPlaces );
  }
}

export default ControlButtons;
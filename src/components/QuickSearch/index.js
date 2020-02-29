import React from 'react';
import {googleMapsApi }from './../../Api/helper'
import { AllPlaces} from './../../Models/place'
const ControlButtons = (props) => {
  const { setAllPlaces, setPlaceDataForQuery} = props;
  const seattleCoordinates = { lat: 47.6062095, lng: -122.3320708, }
  const seattleData = {
    
      city: "Seattle",
      state: "WA",
      country: "US",
  }
  const burgerInput = 'pizza';



  const formatPlaces = (allPlaceData) =>{
   const allPlaces = allPlaceData.map(ele=> {
     return  new AllPlaces(ele);
      
    })
    setAllPlaces(allPlaces);
  }
  return (
    <div>
      <button onClick={getAllPlaces}>Seattle burgers</button>
    </div>
  )

  function getAllPlaces(){
    setPlaceDataForQuery(seattleData);
    googleMapsApi.initiateMap(seattleCoordinates.lat, seattleCoordinates.lng);
    googleMapsApi.findPlaces(burgerInput, formatPlaces );
  }
}

export default ControlButtons;
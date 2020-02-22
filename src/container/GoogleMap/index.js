import React, {useState, useEffect} from 'react';
import {googleMapsApi} from './../../Api/helper';

const GoogleMapDisplay = (props) => {
  const [mapMarkers, setmapMarkers] = useState([]);
  const {places} = props;
 
  useEffect(()=>{
    if (places.length > 0){
  
      const markers = googleMapsApi.getMarkers(places);
      
      setmapMarkers(markers);
    }
    
  }, [places])


  useEffect(() => {
    
    mapMarkers.forEach(ele => {
      ele.setMap(googleMapsApi.map);
    })
    

  }, [mapMarkers])
  return (
    <div className="map-container">
    <div id="map"></div>
    </div>
  )
}

export default GoogleMapDisplay
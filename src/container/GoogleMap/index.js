import React, {useState, useEffect} from 'react';
import {googleMapsApi} from './../../Api/helper';
import markers from './../../Api/markers'
const GoogleMapDisplay = (props) => {
  const [mapMarkers, setmapMarkers] = useState([]);
  const [selectedMarker, setselectedMarker] = useState({});
  const {googleData} = props;
  const basePaddle = "http://maps.google.com/mapfiles/kml/paddle/wht-circle.png"


  // const selectedIndex = googleData.findIndex((ele) => {
  //   return ele.marker === 'selected';
  // })

  // const prevIndex = mapMarkers.findIndex((ele) => {
  //  debugger;
  //   return ele.icon.url === basePaddle;
  // })
  // useEffect(()=>{
  //   if (selectedIndex > 0){
  //     setselectedMarker(selectedIndex);
  //   }
  // }, [selectedIndex])

  useEffect(()=>{

  
    //skip first render of empty array and no marker has been selected 
    // && selectedIndex < 0
    if (googleData.length > 0){
  
      const markers = googleMapsApi.getMarkers(googleData);
      
      setmapMarkers(markers);
    }
    // else if (selectedIndex > 0 && prevIndex > 0){
     
    //   setmapMarkers(currentState => {
    //     const newMapMarkers = [...currentState]
    //     debugger;
    //     newMapMarkers[prevIndex].icon.url = googleData[prevIndex].marker
    //     const selected = googleMapsApi.changeMarker(googleData[prevIndex]);
    //     newMapMarkers[selectedIndex] = null;
    //     newMapMarkers[selectedIndex] = selected;
    //     return newMapMarkers;
    //   });
    // }
    //  ,selectedIndex, prevIndex]
  }, [googleData])


  useEffect(() => {

   // debugger;

      mapMarkers.forEach(ele => {
        ele.setMap(googleMapsApi.map);
      })

    //  mapMarkers[selectedIndex].setMap(googleMapsApi.map);
 
    

  
  
     //   , selectedIndex, prevIndex
  }, [mapMarkers])
  return (
    <div className="map-container">
    <div id="map"></div>
    </div>
  )
}

export default GoogleMapDisplay
import React, { useState, useEffect, useRef} from 'react';
import {googleMapsApi} from './../../Api/helper';
import markers from './../../Api/markers'
// import { styled } from '@material-ui/core/styles';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  initialContainer: {
    margin: "20px auto",
  },
  // initialMap: {
  //   backgroundColor: props => props.backgroundColor,
  // },
  styledMapContainer: {
     //  margin: "10px auto",
      maxWidth: "800px",

 
    boxShadow: "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)",
  },
  styledMap: {
    width: "100%",

    height:"350px",
  },
});



const GoogleMapDisplay = (props) => {
  const classes = useStyles();
  const [mapMarkers, setmapMarkers] = useState([]);
  const {googleData} = props;
  const basePaddle = "http://maps.google.com/mapfiles/kml/paddle/wht-circle.png"




  useEffect(()=>{

    const selectedIndex = googleData.findIndex((ele) => {
      return ele.marker === 'selected';
    })
  
    //skip first render of empty array and no marker has been selected 
    // && selectedIndex < 0
    if (selectedIndex >= 0 ){
      setmapMarkers(prev=> {  
        const updateMarkers = [...prev]
        const prevIndex = updateMarkers.findIndex((ele) => {
          return ele.icon.url === basePaddle;
        })
        if (prevIndex >= 0){
           updateMarkers[prevIndex].setIcon(markers['default']);
         }      
        updateMarkers[selectedIndex].setIcon(markers['selected']);
        return updateMarkers;
      });
    }
    else if (googleData.length > 0){

      const markers = googleMapsApi.getMarkers(googleData);
      
      setmapMarkers(markers);
    }
   
  }, [googleData])


  useEffect(() => {

      mapMarkers.forEach(ele => {
        ele.setMap(googleMapsApi.map);
      })

  }, [mapMarkers])
  // const DisplayMap  = 
 // const IsDisplayMap = mapMarkers.length > 0 ? <DisplayMap /> : <div></div>;
  const isMarkersContainer = mapMarkers.length > 0 ? classes.styledMapContainer : ""; 
  const isMarkersMap = mapMarkers.length > 0 ? classes.styledMap : ""; 
  const containerStyle = `${classes.initialContainer} ${isMarkersContainer}`
  const mapStyle = `${classes.initialContainer} ${isMarkersMap}`
 return (
  
   <div className={containerStyle}>
     
     <div className={mapStyle} id="map"></div>
    </div>
  )
}



export default GoogleMapDisplay
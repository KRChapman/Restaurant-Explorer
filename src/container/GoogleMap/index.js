import React, { useState, useEffect, useRef} from 'react';
import {googleMapsApi} from './../../Api/helper';
import markers from './../../Api/markers'
import useMarkerInfo from './useMarkerInfo'
 

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  initialContainer: {
    marginTop: "20px",
      marginLeft: "auto",
   marginRight: "auto",
    paddingBottom: "5px",
    
    maxWidth: "800px",
  },
  // initialMap: {
  //   backgroundColor: props => props.backgroundColor,
  // },
  initialMap:{
   visibility: "hidden",
  },
  styledMapContainer: {
     //  margin: "10px auto",
      maxWidth: "800px",

   
    boxShadow: "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)",
  },
  styledMap: {
    width: "100%",
    visibility: "visible",
    height:"350px",
  },
});



const GoogleMapDisplay = (props) => {
  const classes = useStyles();
  const [mapMarkers, setmapMarkers] = useState([]);
  //const [mapData, setmapData] = useState({data:[],prev:""});
  const { googleData, mapPlaceToDisplay, selectPlaceForMap, chosenMapPlaceId, placeData, getDataByPlaceId} = props;
  const basePaddle = "http://maps.google.com/mapfiles/kml/paddle/wht-circle.png"
  

  const popoverInfo = useMarkerInfo(mapMarkers, googleData, selectPlaceForMap, getDataByPlaceId, mapPlaceToDisplay, placeData);



  // useEffect(()=> {
  //   setmapData(googleData)
  // }, [googleData]);

  // useEffect(()=> {
 
  //   if (chosenMapPlaceId !== ""){
  //     setmapData(currentState => {
  //       const mapData = [...currentState];
  //       //   const mapData = googleData;
  //       const prevIconIndex = mapData.findIndex((ele) => {
  //         return ele.marker === 'selected';
  //       })
  //       const newIConIndex = mapData.findIndex((ele) => {
  //         return ele.placeId === chosenMapPlaceId;
  //       })


  //       if (prevIconIndex >= 0) {
  //         mapData.data[prevIconIndex].marker = 'default';
  //         mapData.data[prevIconIndex].prev = prevIconIndex;

  //       }
  //       if (newIConIndex >= 0) {
  //         mapData.data[newIConIndex].marker = 'selected';

  //       }

  //       return mapData

  //     })
  //   }




 
  // }, [setmapData, chosenMapPlaceId])

  // mapData[prevIconIndex].marker.setMap(googleMapsApi.map);
  // mapData[newIConIndex].marker.setMap(googleMapsApi.map);
  useEffect(() => {
 
      mapMarkers.forEach(ele => {
        ele.setMap(googleMapsApi.map);
      })

  }, [mapMarkers])


  useEffect(() => {

 
     if (googleData.length > 0) {

      const markers = googleMapsApi.getMarkers(googleData);

      setmapMarkers(prevState=> {
        prevState.forEach(ele => {
        ele.setMap(null);
        })

        return markers    
      });
    }

  }, [googleData])


  useEffect(()=> {
    const selectedIndex = googleData.findIndex((ele) => {
      return ele.placeId === chosenMapPlaceId;
    })
    // debugger;
    //skip first render of empty array and no marker has been selected 
    if (selectedIndex >= 0 && mapMarkers.length > 0) {
    //  setmapMarkers(prev => {
        const markersToUpdate = mapMarkers;
        const prevIndex = markersToUpdate.findIndex((ele) => {
          return ele.icon.url === basePaddle;
        })

        if (prevIndex >= 0) {
          markersToUpdate[prevIndex].setIcon(markers['default']);
        }
        if (markersToUpdate.length > 0) {
          markersToUpdate[selectedIndex].setIcon(markers['selected']);
        }

      //   return markersToUpdate;
      // });
    }
  }, [googleData,chosenMapPlaceId, mapMarkers])
  // const DisplayMap  = 
 // const IsDisplayMap = mapMarkers.length > 0 ? <DisplayMap /> : <div></div>;
  const markersContainer = mapMarkers.length > 0 ? classes.styledMapContainer : ""; 
  const markersMap = mapMarkers.length > 0 ? classes.styledMap : ""; 
  const containerStyle = `${classes.initialContainer} ${markersContainer}`
  const mapStyle = `${classes.initialMap} ${markersMap}`
 return (
  
   <div className={containerStyle}>
     
     <div className={mapStyle} id="map">
       {popoverInfo}
     </div>
    </div>
  )
}



export default GoogleMapDisplay
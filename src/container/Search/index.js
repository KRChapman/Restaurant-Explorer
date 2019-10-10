import React, { useState, useEffect, useRef } from 'react';
import Place from './Place/index';
import googleMap from './../../Api/GoogleMaps/helper'
import Subject from './Subject/index'
const  Search = props => {
  const [inputForSearch, setInputForSearch] = useState("");
  const [place, setplace] = useState("");
  const [allPlaces, setAllPlaces] = useState([]);

  const isFirstRun = useRef(true);
  useEffect(()=>{
    if(isFirstRun.current){
      isFirstRun.current = false;
      return;
    }
    console.log('allPlaces', allPlaces );
    formatPlaceDataForQuery()
  }, [allPlaces])


  const handleChange = (event) =>{
    setInputForSearch(event.target.value );
  }

  const handleSearch = (event) => {
    event.preventDefault();
    // let lat = place.geometry.location.lat();
    // let lon = place.geometry.location.lng();
    let query = inputForSearch;
    let places = googleMap.findPlaces(query, setAllPlaces );
    //props.setAllPlaces
  }


  function formatPlaceDataForQuery() {
    let locationData = allPlaces.map(ele => {
      let addressArray = ele.formatted_address.split('');
      let index = addressArray.indexOf(',');
      let address = addressArray.slice(0, index);
      address = address.join('');
      return {
        place_id: ele.place_id,
        name: ele.name,
        address: address,
      }
    })
    props.setAllPlaces(locationData);
  }


  let content =  (
      <React.Fragment>
        <h1>{props.tester}</h1>
        <Subject handleSearch={handleSearch} handleChange={handleChange}/>
 
      <Place setPlaceDataForQuery={props.setPlaceDataForQuery}/>
      </React.Fragment>

  )
  return content;

}


 
export default Search;
import React, { useState, useEffect, useRef } from 'react';
import Place from './Place/index';
import googleMap from '../../Api/GoogleMap/helper'
import Subject from './Subject/index'
const  Search = props => {
  const [inputForSearch, setInputForSearch] = useState("");
  const [allPlaces, setPlaces] = useState([]);
  const {setAllPlaces} = props

  const isFirstRun = useRef(true);
  useEffect(()=>{
    if(isFirstRun.current){
      isFirstRun.current = false;
      return;
    }
    console.log('allPlaces', allPlaces );
    formatAllPlaceDataForQuery();
    function formatAllPlaceDataForQuery() {
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
     setAllPlaces(locationData);
    }
  }, [allPlaces, setAllPlaces])


  const handleChange = (event) =>{
    setInputForSearch(event.target.value );
  }

  const handleSearch = (event) => {
    event.preventDefault();
    let query = inputForSearch;
    googleMap.findPlaces(query, setPlaces );
  }

  const content =  (
      <React.Fragment>
        <h1>{props.tester}</h1>
        <Subject handleSearch={handleSearch} handleChange={handleChange}/>
 
      <Place setPlaceDataForQuery={props.setPlaceDataForQuery}/>
      </React.Fragment>

  )
  return content;
}

export default Search;
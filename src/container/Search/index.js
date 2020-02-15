import React, { useState, useEffect, useRef } from 'react';
import Place from './Place/index';
import {googleMapsApi} from '../../Api/helper';
import Subject from './Subject/index';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';







const Search = props => {
  // const classes = useStyles();
  const [inputForSearch, setInputForSearch] = useState("");
  const [allPlaces, setPlaces] = useState([]);
  const {setAllPlaces} = props

  //SEPERATE OUT INTO HOOK
  const isFirstRun = useRef(true);
  useEffect(()=>{
    if(isFirstRun.current){
      isFirstRun.current = false;
      return;
    }
  console.log('allPlaces', allPlaces);
    formatAllPlaceDataForQuery();
    function formatAllPlaceDataForQuery() {
      let locationData = allPlaces.map(ele => {
        let addressArray = ele.formatted_address.split('');
        let index = addressArray.indexOf(',');
        let address = addressArray.slice(0, index);
        address = address.join('');
        let photo = ele.photos != null ? ele.photos[0].getUrl() : null;
        return {
          place_id: ele.place_id,
          name: ele.name,
          address,
          rating: ele.rating,
          photo
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
    googleMapsApi.findPlaces(query, setPlaces );
  }

  // set up this like search area in docs
  // have the hook give logic to inputBase componnet
  // PASS IN id to place hooks (maybe)
  // pass in InputBase component to subject

  // PLACE
  // const id = 'id'
  // useGoogleAutocmplete('id', cb)
  // <InputBase id={"searchPlace"}/>

  // SEARCH SUBJECT
  //   <InputBase type="text" value={T} onChange={props.handleChange} />
 // <button onClick={getT}>Search</button>
  //
  
  const content =  (

   <React.Fragment>
      <Subject handleSearch={handleSearch} handleChange={handleChange} />
      <Place setPlaceDataForQuery={props.setPlaceDataForQuery} />
    </React.Fragment>
   
     
   
  )
  return content;
}

export default Search;
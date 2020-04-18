import React, { useState} from 'react';
import {googleMapsApi }from './../../Api/helper'
import { AllPlaces} from './../../Models/place'
import SearchTerms from './../SearchTerms/index'
import GeberalBtn from './../shared/GeneralBtn'
import makeStyles from '@material-ui/core/styles/makeStyles';
import withStyles from '@material-ui/core/styles/withStyles';


const useStyles = makeStyles(theme => {

  return {
    container: {
      width: "200px",
      display: "flex",
        flexDirection: 'column',
        margin: "20px auto",
    }
  }
})

const ControlButtons = (props) => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState('Pasta');
  const { setAllPlaces, setPlaceDataForQuery} = props;
  const seattleCoordinates = { lat: 47.6062095, lng: -122.3320708, }
  const seattleData = {
    
      city: "Seattle",
      state: "WA",
      country: "US",
  }
 

  const terms = { pasta: "Pasta" , seafood: "Seafood", bars: "Bars"};



  const formatPlaces = (allPlaceData) =>{
   const allPlaces = allPlaceData.map(ele=> {
     return  new AllPlaces(ele);
      
    })
    setAllPlaces(allPlaces);
  }
  const handleTermChange = (e) => {
    console.log('e', e.target.value);
    setSearchTerm(e.target.value);
  }
  return (
    <div className={classes.container}>
      <h3>OR</h3>
      <h2>Imediate Search Option</h2>
      <GeberalBtn action={getAllPlaces}>Seattle {searchTerm}</GeberalBtn>
      <SearchTerms handleTermChange={handleTermChange} terms={terms} searchTerm={searchTerm}/>
    </div>
  )

  function getAllPlaces(){
    setPlaceDataForQuery(seattleData);
    googleMapsApi.initiateMap(seattleCoordinates.lat, seattleCoordinates.lng);
 
    googleMapsApi.findPlaces(searchTerm, formatPlaces );
  }
}

export default ControlButtons;
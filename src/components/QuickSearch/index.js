import React, { useState} from 'react';
import {googleMapsApi }from './../../Api/helper'
import { AllPlaces} from './../../Models/place'
import SearchTerms from './../SearchTerms/index'
import { cyan } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import withStyles from '@material-ui/core/styles/withStyles';

const ColorButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(theme.palette.secondary.dark),
    backgroundColor: theme.palette.secondary.dark,
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",

    boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",

    '&:hover': {
      backgroundColor: cyan[600],
    },
  },
}))(Button);
const ControlButtons = (props) => {
  const [searchTerm, setSearchTerm] = useState('Pasta');
  const { setAllPlaces, setPlaceDataForQuery} = props;
  const seattleCoordinates = { lat: 47.6062095, lng: -122.3320708, }
  const seattleData = {
    
      city: "Seattle",
      state: "WA",
      country: "US",
  }
 

  const terms = { pasta: "Pasta" , seafood: "Seafood"};



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
    <div>
      <h2>Imediate Search Option</h2>
      <ColorButton onClick={getAllPlaces}>Seattle {searchTerm}</ColorButton>
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
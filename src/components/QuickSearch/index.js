import React, { useState} from 'react';
import {googleMapsApi }from './../../Api/helper'
import { AllPlaces} from './../../Models/place'
import SearchTerms from './../SearchTerms/index'
import GeberalBtn from './../shared/GeneralBtn'
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { WarnPopover} from './../../components/PopOver/index'


const useStyles = makeStyles(theme => {

  return {
    container: {
      width: "200px",
      display: "flex",
      flexDirection: 'column',
      margin: "50px auto",
    },
    root:{
      marginTop: "50px"
    }
  }
})

const QuickSearch = (props) => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState('Pasta');
  const [warnAnchorEl, setwarnAnchorEl] = useState(null);
  const { setAllPlaces, setPlaceDataForQuery} = props;
  const seattleCoordinates = { lat: 47.6062095, lng: -122.3320708, }
  const seattleData = {
    
      city: "Seattle",
      county: "King County",
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
    setSearchTerm(e.target.value);
  }
  
  return (
    <div className={classes.container}>
      <Typography color="textPrimary" variant='h5' component="h5" gutterBottom>OR</Typography>

      <Typography className={classes.root} color="textPrimary" variant='h5' component="h5" gutterBottom>Imediate Seattle Search Option</Typography>
   
      <GeberalBtn action={getAllPlaces}>Seattle {searchTerm}</GeberalBtn>
      <SearchTerms handleTermChange={handleTermChange} terms={terms} searchTerm={searchTerm}/>
      {warnAnchorEl && <WarnPopover anchorEl={warnAnchorEl} setanchorEl={setwarnAnchorEl} warningText={'Select or Type Search Term'}></WarnPopover>}
    </div>
  )

   function getAllPlaces (e){
     if (searchTerm === ""){
       setwarnAnchorEl(e.currentTarget)
     }
     else{
       setPlaceDataForQuery(seattleData);
       googleMapsApi.initiateMap(seattleCoordinates.lat, seattleCoordinates.lng);
       googleMapsApi.findPlaces(searchTerm, formatPlaces);
     }
 
  }
}

export default QuickSearch;
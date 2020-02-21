import React, { useState, useEffect, useRef } from 'react';
import usePlace from './Place/index';
import {googleMapsApi} from '../../Api/helper';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { WarnPopover } from "./../../components/PopOver/index";

const useStyles= makeStyles(theme => {

  return {
    container: {
      width: '100%',
      maxWidth: "500px",
      marginRight: '1%',
      [theme.breakpoints.down('sm')]: {
        marginRight: '.5%',
      },
  },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      marginTop: 6,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
      },
    },
    inputRoot: {
      color: 'inherit',
      display: 'block',
      cursor: 'none',
      zIndex: 0,
    },
    inputInput: {
      height: 30,
       boxSizing: 'border-box',
      padding: theme.spacing(1, 1, 1, 4),
      width: '100%',
      
      [theme.breakpoints.up('sm')]: {
        width: '100%',
        maxWidth: "490px",
      },
    },
    searchIcon: {
      width: theme.spacing(4),
      height: '100%',
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '1%',
      cursor: 'pointer',
      zIndex: 2,
    },
  }
})

const Search = props => {
  const classes = useStyles();
  const [inputForSearch, setInputForSearch] = useState("");
  const [allPlaces, setPlaces] = useState([]);
  const [anchorEl, setanchorEl] = useState(null);
  const {setAllPlaces} = props
  const searchPlaceId = "searchPlace";
  const searchSubjectId = "searchPlace";

  const placeInput = usePlace(searchPlaceId, props.setPlaceDataForQuery);

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
  const handleSearch = (id,event) => {

    if (placeInput === "" || inputForSearch === ""){
      setanchorEl(event.currentTarget);
    
    }
    else{
      googleMapsApi.findPlaces(inputForSearch, setPlaces );
    }
 
  }

  const content =  (
    <div className={classes.container} >
        <div className={classes.search}>
          <div className={classes.searchIcon} onClick={(event) => handleSearch(searchPlaceId,event)}>
            <SearchIcon />
          </div>
          <InputBase type="text" id={searchPlaceId} placeholder="Location"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}/>
        </div>
          <WarnPopover anchorEl={anchorEl} warningText={"Fill out all fields"}/>
        <div className={classes.search}>
        <div className={classes.searchIcon} onClick={(event) => handleSearch(searchSubjectId, event)}>
            <SearchIcon style={{ cursor: 'pointer'}} />
            </div>
            <InputBase type="text" onChange={handleChange}
            placeholder="Search For: Burgers, Pizza, Tacos, ect.. or a specific place"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'specific' }}
            />
          </div>
     </div>
      
  )
  return content;
}

export default Search;
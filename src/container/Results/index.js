import React, { useState, useEffect, useRef, useReducer } from 'react';
import DisplayCard from './../../components/DisplayCard/DisplayCard'
import QuickSearch from '../../components/QuickSearch/index';
import ControlButtons from './../../components/ControlButtons/index';
import makeStyles from '@material-ui/core/styles/makeStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import { flexbox } from '@material-ui/system';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
     position: "fixed", 
   //  margin: "100px auto", 
    backgroundColor: "#fff",
    width: "175px",
   // marginTop: "100px",
    top: 95,
    right: 0,
    zIndex: 1000,
    opacity: 0.6,
 
  },
  main: {

    margin: "150px auto", 
  },
  counter:{
    alignSelf: "center"
  },

}));

const Results = (props) => {
  const classes = useStyles();
  const [placesViewRange, dispatchPlacesViewRange] = useReducer(navigatePlacesViewRange,{start:0, end:0});
  const [currentPlacesToDisplay, setCurrentPlacesToDisplay] = useState([]);
  const [checked, setChecked] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const { placesToDisplay, getMorePlaces, displayInc, changeMapIcon, setAllPlaces, 
    setPlaceDataForQuery, TotalNumberOfAllPlaces, placeData} = props;
  const totalPlaces = placesToDisplay.length;
  const tabletSize = 900;

  useEffect(()=> {
    dispatchPlacesViewRange({ type: "INITIAL", payload: { totalPlaces, displayInc } });
  }, [ displayInc, totalPlaces])

  useEffect(() => {
   const {start, end} = placesViewRange;
   const partialDisplay = placesToDisplay.slice(start,end)
   setCurrentPlacesToDisplay(partialDisplay)
  }, [placesViewRange, placesToDisplay])

  useEffect(() => {
    updateWindow();
    window.addEventListener("resize", updateWindow);
  }, [])
 
  let toDisplay = null;
  if (totalPlaces > 0) {
    toDisplay = currentPlacesToDisplay.map((ele, i) => {
      return <DisplayCard isDesktop={isDesktop} placeData={placeData} changeMapIcon={changeMapIcon} key={i} googleYelpHealthData={ele}/>
    })
  } 
  const changeViewRangeHandler = (e,type) => {
    if (type === 'INCREMENT' && placesViewRange.end === totalPlaces){
      getMorePlaces();
    }
    else{
      dispatchPlacesViewRange({ type, payload: { totalPlaces, displayInc } });
    }
  }


  useEffect(() => {
    if (placesToDisplay.length > 0) {
      setChecked(true);
  
    }
  }, [placesToDisplay])

 
  const startingInc = totalPlaces > displayInc ? displayInc : totalPlaces;
  const startingDisplayCount = placesViewRange.start + startingInc;
  return (
    <React.Fragment>
      <Slide timeout={{enter: 1000, exit:500}} direction="down" in={checked} mountOnEnter unmountOnExit>
        <Paper elevation={4} className={classes.root}>
         

            <ControlButtons changeViewRange={changeViewRangeHandler} />
          <Typography varient={"caption"} className={classes.counter} >
            {startingDisplayCount} / {TotalNumberOfAllPlaces}
          </Typography>
         
        </Paper>
      </Slide>
  
      <Container className={classes.main} >
      <QuickSearch setAllPlaces={setAllPlaces} setPlaceDataForQuery={setPlaceDataForQuery} />
      </Container> 
      
      <div className="card-container">{toDisplay}</div>
  
    </React.Fragment>
  )

  function updateWindow() {
    setIsDesktop(window.innerWidth > tabletSize)
  }
  
}

function navigatePlacesViewRange(currentState, action) {
  const placesViewRange = { ...currentState};
  const { totalPlaces, displayInc } = action.payload;
  const incrementEnd = placesViewRange.end + displayInc;
  const incrementStart = incrementEnd - displayInc;

  switch (action.type) {
    case "INITIAL":
      const initialStart = totalPlaces - displayInc > 0 ? totalPlaces - displayInc : 0;
      const initialEnd = totalPlaces;
      return { start: initialStart, end: initialEnd};
    case "INCREMENT":  
      // If increment reaches beyond places total length then just return places total length;
      placesViewRange.end = incrementEnd < totalPlaces ? incrementEnd : totalPlaces;
      placesViewRange.start = incrementStart;
      return placesViewRange; 
    case "DECREMENT": 
     placesViewRange.start = placesViewRange.start - displayInc > 0 ?  placesViewRange.start - displayInc : 0;
     placesViewRange.end = placesViewRange.start + displayInc;
      return placesViewRange;
    default:
      break;
  }
}


export default Results;
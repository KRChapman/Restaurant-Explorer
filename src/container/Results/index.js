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
import Skeleton from '@material-ui/lab/Skeleton';
const useStyles = makeStyles(theme => ({
  root: {
     position: "fixed", 

    width: "175px",

   bottom: 0,
   // top: 95,
    right: 0,
    zIndex: 1000,

    [theme.breakpoints.down('sm')]: {

          width: "155px",

    },
 
  },
  // scale: {
  //   [theme.breakpoints.down('sm')]: {

  //     transform: "scale(0.7)",
 
  //   },
  // },
  main: {
  //  textAlign: "center",
  // margin: "50px auto", 
  paddingTop: "120px",
  
  },
  counter:{
    alignSelf: "center"
  },
  cardLocation: {
   // height: "575px",
   // margin: "10px auto";
  }

}));

const Results = (props) => {
  const classes = useStyles();
  const [placesViewRange, dispatchPlacesViewRange] = useReducer(navigatePlacesViewRange,{start:0, end:0});
  const [currentPlacesToDisplay, setCurrentPlacesToDisplay] = useState([]);
  const [checked, setChecked] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [isShowHealth, setIsShowHealth] = useState(false);

  const { placesToDisplay, getMorePlaces, displayInc, changeMapIcon, setAllPlaces, 
    setPlaceDataForQuery, allPlacesCount, placeData, isShowQuickSearch, isDataLoading} = props;
  
  const totalPlacesDisplay = placesToDisplay.length;
  const tabletSize = 900;
  const startingInc = totalPlacesDisplay > displayInc ? displayInc : totalPlacesDisplay;
  const startingDisplayCount = placesViewRange.start + startingInc;
  const skeletonDisplayCount =  displayInc;
//totalPlacesDisplay + displayInc >= allPlacesCount ? totalPlacesDisplay - allPlacesCount :
  useEffect(() => {
    const counties = ['King County']
 
    if (placeData.county){
      const checkMatch = (element) => element === placeData.county;
      const isShowHealth = counties.some(checkMatch);
      setIsShowHealth(isShowHealth);
    }
    
  }, [placeData])

  useEffect(()=> {
    dispatchPlacesViewRange({ type: "INITIAL", payload: { totalPlacesDisplay, displayInc } });
  }, [ displayInc, totalPlacesDisplay])

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
  if (totalPlacesDisplay > 0) {
  
    toDisplay = currentPlacesToDisplay.map((ele, i) => {
  
      

      return <DisplayCard isDesktop={isDesktop} isShowHealth={isShowHealth} placeData={placeData} changeMapIcon={changeMapIcon} key={i} googleYelpHealthData={ele}/>
    })
  } 
  const changeViewRangeHandler = (e,type) => {
    if (type === 'INCREMENT' && placesViewRange.end === totalPlacesDisplay){
      getMorePlaces();
    }
    else{
      dispatchPlacesViewRange({ type, payload: { totalPlacesDisplay, displayInc } });
    }
  }


  useEffect(() => {
    if (placesToDisplay.length > 0) {
      setChecked(true);
  
    }
  }, [placesToDisplay])

 
  
  return (
    <div className={classes.main}>

  
 
      {isShowQuickSearch && <QuickSearch setAllPlaces={setAllPlaces} setPlaceDataForQuery={setPlaceDataForQuery} />}
  
      
      <div className={classes.cardLocation}>
        {isDataLoading ? (

          <div className="card-container">{

            [...new Array(skeletonDisplayCount)].map((ele, i) => {
              return (<div key={i} >
                <Skeleton variant="rect" width={320} height={155} />
                <Skeleton variant="text" />
                <Skeleton variant="circle" width={40} height={40} />
                <Skeleton variant="rect" width={320} height={310} />
              </div>)
            })
          }
          </div>



        ) : (
            <div className="card-container">{toDisplay}</div>
          )}
   </div>

      <Slide timeout={{ enter: 1000, exit: 500 }} direction="up" in={checked} mountOnEnter unmountOnExit>


        <div className={classes.root} >

          <ControlButtons changeViewRange={changeViewRangeHandler} />
          <Typography color="textPrimary" varient={"caption"} className={classes.counter} >
            {startingDisplayCount} / {allPlacesCount}
          </Typography>


        </div>


      </Slide>
    </div>
  )

  function updateWindow() {
    setIsDesktop(window.innerWidth > tabletSize)
  }
  
}

function navigatePlacesViewRange(currentState, action) {
  const placesViewRange = { ...currentState};
  const { totalPlacesDisplay, displayInc } = action.payload;
  const incrementEnd = placesViewRange.end + displayInc;
  const incrementStart = incrementEnd - displayInc;

  switch (action.type) {
    case "INITIAL":
      const initialStart = totalPlacesDisplay - displayInc > 0 ? totalPlacesDisplay - displayInc : 0;
      const initialEnd = totalPlacesDisplay;
      return { start: initialStart, end: initialEnd};
    case "INCREMENT":  
      // If increment reaches beyond places total length then just return places total length;
      placesViewRange.end = incrementEnd < totalPlacesDisplay ? incrementEnd : totalPlacesDisplay;
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

//<Paper elevation={4} className={classes.root}>

export default Results;
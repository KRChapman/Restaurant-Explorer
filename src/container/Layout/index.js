import React, { Component } from 'react';
import { googleMapsApi, getYelpHealthData, buildYelpQuery, buildHealthQuery} from '../../Api/helper'
import { GooglePlace, Yelpplace, Healthplace, GeneralInfo} from './../../Models/place'
import Results from './../Results/index';
import AppBar from './../AppBar/index';
import GoogleMapDisplay from './../GoogleMap/index';

import { localAdd, localupdate} from '../../utils/testing';



class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      allPlaces: [],
      placesDetails: [],
      googleData: [],
      yelpData: [],
      healthData:[],
      placesToDisplay: [],
      displayPlaceResults:[],
      placeData: {},
      isDataLoading: false,
      mapTheme: 'light',
      currentTotalDisplay: 0,
      resultsDisplayCount: 0,

      chosenMapPlaceId: "",
      mapPlaceToDisplay: {},
      allMapData: {
        selectedplace: {}, 
        selectedplaceId: "",
      },

     }
    this.displayInc = 4;
  }
  componentDidMount(){
   localupdate(this.placesLocal);
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.googleData !== this.state.googleData ){
   
      this.displayNewPlaces();
    }

    if (this.state.yelpData !== prevState.yelpData && this.state.healthData !== prevState.healthData && (this.state.healthData.length > 0 || this.state.yelpData.length > 0)){
      this.combineDataForPlacesToDisplay()
    }

    if (this.state.selectedplace !== prevState.selectedplace){
      this.getDataForMap();
    }

    // if (this.state.allMapData.yelpData !== prevState.allMapData.yelpData && this.state.allMapData.healthData !== prevState.allMapData.healthData ) {

    //   this.combineDataForMap()
    // }

    if ( this.state.placesToDisplay !== prevState.placesToDisplay){
      //debugger;
      this.updateResultsDisplay();
    }

    if (this.state.placesToDisplay !== prevState.placesToDisplay && this.state.allMapData.selectedplaceId !== prevState.allMapData.selectedplaceId){
      this.changeMapToDisplay();
    }


  }

  displayNewPlaces = () => {
    this.setState(currentState => {
      return { placesToDisplay: [], yelpData: [], healthData: [], displayPlaceResults:[] }
    }, this.getPlacesToDisplay);
  }

  getPlacesToDisplay = async () =>{
    this.setIsDataLoading(true);
    let details = await this.getDetails();
    let queries = this.buildQueries(details.details, details.slectedPlaces);
    const setData = (data) => {
      this.setState(currentState => {
        const yelpData = currentState.yelpData.concat(data.yelpData)
        const healthData = currentState.healthData.concat(data.healthData)
        const placesDetails = currentState.placesDetails.concat(details.details)
        return { yelpData, healthData, placesDetails}
      });
    }
    getYelpHealthData(queries, setData);
  }
  combineDataForPlacesToDisplay  = () => {
    const { allPlaces, placesToDisplay, currentTotalDisplay, yelpData,healthData } = this.state;
    const start = placesToDisplay.length;
    const end = currentTotalDisplay;
    const slectedPlaces = allPlaces.slice(start, end);
    const slectedYelpData = yelpData.slice(start, end);
    const slectedHealthData = healthData.slice(start, end);
    const places = this.getPlacesDisplay(slectedPlaces, slectedYelpData, slectedHealthData);

    this.setState(currentState => {
      const placesToDisplay = currentState.placesToDisplay.concat(places)
      
      return { placesToDisplay}
    }, this.setIsDataLoading(false));
  }

  getPlacesDisplay = (slectedPlaces, slectedYelpData, slectedHealthData) => {
    const places = slectedPlaces.map((ele, i) => {
      const yelp = slectedYelpData[i].yelp;// USE getDataByPlaceIds
      const health = slectedHealthData[i].data; /// USE getDataByPlaceIds
      const healthPlace = new Healthplace(slectedHealthData[i].placeId, health)
      const yelpPlace = new Yelpplace(slectedYelpData[i].placeId, yelp);
      const detailsData = this.getDataByPlaceId("placesDetails", ele.placeId);
      const generalInfo = new GeneralInfo(ele.placeId, detailsData, ele, yelp);
      return { googlePlace: new GooglePlace(ele.placeId, ele, detailsData), yelpPlace, healthPlace, generalInfo }
    })
    return places;
  }

  getDataByPlaceId = (dataToLook,placeId) => {
    let foundData = null; 
    switch (dataToLook) {
      case "placesDetails":
        const placesDetails=  [...this.state["placesDetails"]];
        foundData  = placesDetails.find(ele=> {
          return ele.place_id === placeId
            })
        break;
 
      case "allPlaces":
        const allPlaces = [...this.state["allPlaces"]];
        foundData =  allPlaces.find(ele=> {
          return ele.placeId === placeId
            })
        break;
    
      default:
        break;
     
    }

    return foundData;
 
  }

  setAllPlaces = (data) => {
    const currentTotalDisplay = this.displayInc >= data.length ? data.length : this.displayInc;
    const resultsDisplayCount = currentTotalDisplay;
    // allPlaces will move around in different orders based on map selection and googleData Needs to stay in the same order
    // to corrospond with map markers
    const googleData = [...data];
    this.setState({ allPlaces: data, googleData, currentTotalDisplay, resultsDisplayCount });
  }

  setPlaceDataForQuery = (placeData) =>{
    this.setState({ placeData  });
  }

   buildQueries(phoneNumbers, slectedPlaces) {
    const { placeData, currentTotalDisplay, placesToDisplay} = this.state; 
    const startingCountDisplay = placesToDisplay.length
    const displayLimit = currentTotalDisplay - startingCountDisplay;
    const queries = { displayLimit};

    queries["health"] = buildHealthQuery(slectedPlaces, phoneNumbers);
    queries["yelp"] =  buildYelpQuery(slectedPlaces, phoneNumbers, placeData);

    return queries;
  }
  async getDetails(){
    const { allPlaces, currentTotalDisplay, placesToDisplay } = this.state;
    const startingCountDisplay = placesToDisplay.length;
    const slectedPlaces = allPlaces.slice(startingCountDisplay, currentTotalDisplay);
    // debugger;
    const getDetails = googleMapsApi.getDetails(slectedPlaces);
    const details = await getDetails;
    return { slectedPlaces, details}
  }

  
  //  = (displayNumber = null) => {
   

  //   this.getPlacesResultsOrMaps();

  // }

  updateResultsDisplay = () => {

    this.setState(currentState => {
      const start = currentState.displayPlaceResults.length
      const end = currentState.resultsDisplayCount;
      const toDisplay = currentState.placesToDisplay.slice(start, end);
      const displayPlaceResults = currentState.displayPlaceResults.concat(toDisplay);
      localAdd(displayPlaceResults)
      return { displayPlaceResults}
    });
  }
  getMorePlaces = (displayNumber = null) => {
    const displayInc = displayNumber || this.displayInc;
    // argument for this.displayInc or 1 for map marker increase
    const allPlacesTotal = this.state.allPlaces.length
    if (this.state.currentTotalDisplay < allPlacesTotal) {
      const totalInc = displayInc + this.state.displayPlaceResults.length;
      const isResultsSmaller =  totalInc <= this.state.currentTotalDisplay ? true : false
// 
      const currentTotalDisplay = totalInc >= allPlacesTotal ? allPlacesTotal : totalInc
      const resultsDisplayCount = currentTotalDisplay;
      if (isResultsSmaller){
        this.setState({ currentTotalDisplay, resultsDisplayCount }, this.updateResultsDisplay);
      }
      else{
        this.setState({ currentTotalDisplay, resultsDisplayCount }, this.getPlacesToDisplay);
      }
      
     
    }
   
  }

  getMapPlaces  = () => {
  const displayInc = 1;
  // argument for this.displayInc or 1 for map marker increase
  const allPlacesTotal = this.state.allPlaces.length
  if (this.state.currentTotalDisplay < allPlacesTotal) {
    const totalInc = displayInc + this.state.placesToDisplay.length;
    const currentTotalDisplay = totalInc >= allPlacesTotal ? allPlacesTotal : totalInc
    this.setState({ currentTotalDisplay }, this.getPlacesToDisplay);
  }
  }


  getPlaceForMap = (displaySelected) =>{

    this.setState(currentState => {
      const allMapData = currentState.allMapData;
      allMapData.selectedplace = displaySelected;
      allMapData.selectedplaceId = displaySelected.placeId;
      return { allMapData}
    }, this.changeMapIcon(displaySelected.placeId));
   // this.setState({ selectedplace: displaySelected}, );
  }
  getDataForMap = async () => {

    const { placesToDisplay, placeData, allPlaces} = this.state;
    const { selectedplaceId, selectedplace } = this.state.allMapData;

   

    const mapPlaceToDisplay = getMatchingToDisplayData(selectedplace, placesToDisplay);

    if (mapPlaceToDisplay) {
      this.setState({ mapPlaceToDisplay }, this.changeMapIcon(selectedplaceId));
    }
    else{
      const foundIndex = allPlaces.findIndex(ele => ele.placeId === selectedplaceId)
      const placeIndex = placesToDisplay.length + 1;
      const swapallPlaces = (placeToswap, target) => {
        this.setState(currentState => {
          const allPlaces = [...currentState.allPlaces]

          const temp = allPlaces[placeToswap]
          allPlaces[placeToswap] = allPlaces[target]
          allPlaces[target] = temp;

          return { allPlaces }
        }, this.getMapPlaces);
      }
      swapallPlaces(placeIndex, foundIndex);
    }



    function getMatchingToDisplayData(data, placesToDisplay) {
      const placeId = data.placeId

      const found = placesToDisplay.find(ele => ele.googlePlace.placeId === placeId)

      return found;
    }
















  
    if (true) {
      
    }
     else{
     // const displaySelectedId = displaySelected[0].googlePlace.placeId
      // const found = currentState.allPlaces.find(ele => ele.placeId === )
     // return array for searching allplaces before switch
      const displaySelected = '1'
      const getDetails = googleMapsApi.getDetails([displaySelected]);
      const details = await getDetails;
     // debugger;
 
      let queries = buildQueries(details, [displaySelected], placeData);
      const setData = (data) => {
          this.setState(currentState => {
            const allMapData = currentState.allMapData;
             allMapData.yelpData = currentState.allMapData.yelpData.concat(data.yelpData)
             allMapData.healthData = currentState.allMapData.healthData.concat(data.healthData)
             allMapData.placesDetails = currentState.allMapData.placesDetails.concat(details)
            return { allMapData }
          });
     }
      getYelpHealthData(queries, setData);

     }

    // 
    // const setData = (data) => {
    //   this.setState(currentState => {
    //     const yelpData = currentState.yelpData.concat(data.yelpData)
    //     const healthData = currentState.healthData.concat(data.healthData)
    //     const placesDetails = currentState.placesDetails.concat(details.details)
    //     return { yelpData, healthData, placesDetails }
    //   });
    // }
    // getYelpHealthData(queries, setData);

    // const places = slectedPlaces.map((ele, i) => {
    //   const yelp = slectedYelpData[i].yelp;
    //   const health = slectedHealthData[i].data;
    //   const healthPlace = new Healthplace(slectedHealthData[i].placeId, health)
    //   const yelpPlace = new Yelpplace(slectedYelpData[i].placeId, yelp);
    //   const detailsData = this.getDataByPlaceId("placesDetails", ele.placeId);
    //   const generalInfo = new GeneralInfo(ele.placeId, detailsData, ele, yelp);
    //   return { googlePlace: new GooglePlace(ele.placeId, ele, detailsData), yelpPlace, healthPlace, generalInfo }
    // })
    //this.getMorePlaces(displayNumber);
    
    function buildQueries(details, slectedPlace, placeData ){
      const queries = { displayLimit: slectedPlace.length };
      const phoneNumbers = details;
      queries["health"] = buildHealthQuery(slectedPlace, phoneNumbers);
      queries["yelp"] = buildYelpQuery(slectedPlace, phoneNumbers, placeData);
      return queries;
    }


  }

  changeMapToDisplay = () => {
    const {placesToDisplay} = this.state;
    const { selectedplaceId } = this.state.allMapData;
    const mapPlaceToDisplay = placesToDisplay.find(ele=> {
      return ele.googlePlace.placeId === selectedplaceId;
    })
    this.setState({ mapPlaceToDisplay });
  }

  combineDataForMap = () => {
    const {allPlaces} = this.state;
    const { selectedplace, healthData, yelpData} = this.state.allMapData;
//const found = currentState.allPlaces.find(ele => ele.placeId === )
// find index of placeId from mapsData then swap in allPlaces
    const chosenIndex = allPlaces.findIndex(ele=> {
      return ele.placeId === selectedplace;
    })
    const chosenHealth =  healthData.filter(ele=> {
      return ele.placeId === selectedplace
    })
    const chosenYelp = yelpData.filter(ele=> {
      return ele.placeId === selectedplace;
    })
    const chosenAllPlace = allPlaces.filter(ele => {
      return ele.placeId === selectedplace;
    })
    

   const places = this.getPlacesDisplay(chosenAllPlace, chosenYelp, chosenHealth);
// use placeId to get from selected yelp and health
// use chosen selected to call getPlacesDisplay
// with return call ssf and pass to placesToDisplay in mapData
this.setState(currentState => {

  return {}
});
// swap currentTotalDisplay + 1 with chosen
  }

  changeMapIcon = (placeId, event) =>{

    this.setState({chosenMapPlaceId: placeId} )
   
  
  }

  setIsDataLoading = (isLoading) => {
    this.setState({ isDataLoading: isLoading });
  }

  placesLocal = (data) => {
    this.setState({ displayPlaceResults: data });
  }
  toggleMapTheme = () => {
      const choices = {'light': 'dark', 'dark': 'light'}
    const newTheme = choices[this.state.mapTheme] 
  
    this.setState({ mapTheme: newTheme }, ()=> googleMapsApi.changeMapTheme(this.state.mapTheme));
  }
  render() { 
  
    
    const { placesToDisplay, displayPlaceResults, googleData, allPlaces, mapTheme, placeData, isDataLoading, chosenMapPlaceId, mapPlaceToDisplay}  = this.state;
    const isShowQuickSearch = Object.keys(placeData).length === 0 && placeData.constructor === Object ? true : false;
    return ( 
      <div>
        <AppBar toggleMapTheme={this.toggleMapTheme} mapTheme={mapTheme} setPlaceDataForQuery={this.setPlaceDataForQuery} setAllPlaces={this.setAllPlaces} />
      
      
        <Results placesToDisplay={displayPlaceResults} changeMapIcon={this.changeMapIcon} getMorePlaces={this.getMorePlaces} placeData={placeData} isShowQuickSearch={isShowQuickSearch}
          setAllPlaces={this.setAllPlaces} setPlaceDataForQuery={this.setPlaceDataForQuery} displayInc={this.displayInc} allPlacesCount={allPlaces.length} isDataLoading={isDataLoading} /> 
        <GoogleMapDisplay googleData={googleData} chosenMapPlaceId={chosenMapPlaceId} getPlaceForMap={this.getPlaceForMap} mapPlaceToDisplay={mapPlaceToDisplay}/>
      </div>
     )
  }
}

export default Layout;
import React, { Component } from 'react';
import Search from './../Search/index';
import { googleMapsApi, getYelpHealthData, buildYelpQuery, buildHealthQuery} from '../../Api/helper'
import { GooglePlace, Yelpplace, Healthplace} from './../../Models/place'
import Results from './../Results/index';
import AppBar from './../AppBar/index';
import { localAdd, localupdate} from '../../utils/testing';

const Btn = rtBtn();

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      allPlaces: [],
      placeDetails: [],
      yelpData: [],
      healthData:[],
      placesToDisplay: [],
      placeData: {},
      currentTotalDisplay: 0,
     }
    this.displayInc = 6;
  }
  componentDidMount(){
   localupdate(this.placesLocal);
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.allPlaces !== this.state.allPlaces ){
   
      this.displayNewPlaces();
    }

    if (this.state.yelpData !== prevState.yelpData && this.state.healthData !== prevState.healthData && (this.state.healthData.length > 0 || this.state.yelpData.length > 0)){
      this.combineDataForPlacesToDisplay()
    }
  }

  displayNewPlaces = () => {
    this.setState(currentState => {
      return { placesToDisplay: [], yelpData: [], healthData: [] }
    }, this.getPlacesToDisplay);
  }

  getPlacesToDisplay = async () =>{
    let details = await this.getDetails();
    let queries = this.buildQueries(details.details, details.slectedPlaces);
    const setData = (data) => {
      this.setState(currentState => {
        const yelpData = currentState.yelpData.concat(data.yelpData)
        const healthData = currentState.healthData.concat(data.healthData)
        const placeDetails = currentState.placeDetails.concat(details.details)
        return { yelpData, healthData, placeDetails}
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

    const places = slectedPlaces.map((ele, i) => {
      const  yelp  = slectedYelpData[i].yelp;
      const  health  = slectedHealthData[i].data;
      const healthPlace = new Healthplace(slectedHealthData[i].placeId, health)
      const yelpPlace = new Yelpplace(slectedYelpData[i].placeId, yelp);
      
      return { googlePlace: new GooglePlace(ele.place_id, ele), yelpPlace, healthPlace }
    })
    this.setState(currentState => {
      const placesToDisplay = currentState.placesToDisplay.concat(places)
      localAdd(placesToDisplay)
      return { placesToDisplay}
    });
  }

  setAllPlaces = (data) => {
    const currentTotalDisplay = this.displayInc >= data.length ? data.length : this.displayInc
      this.setState({ allPlaces: data, currentTotalDisplay });
  }

  setPlaceDataForQuery = (placeData) =>{
    this.setState({ placeData  });
  }

   buildQueries(phoneNumbers, slectedPlaces) {
    const { placeData, currentTotalDisplay, placesToDisplay} = this.state; 
    const startingCountDisplay = placesToDisplay.length
    const displayLimit = currentTotalDisplay - startingCountDisplay;
   
    let queries = { health: [], yelp: { data: [] }, displayLimit };

    // const { url, website} = phoneNumbers;
    
    buildHealthQuery(slectedPlaces, phoneNumbers, queries.health);
    buildYelpQuery(slectedPlaces, phoneNumbers, placeData, queries);

    return queries;
  }
  async getDetails(){
    const { allPlaces, currentTotalDisplay, placesToDisplay } = this.state;
    const startingCountDisplay = placesToDisplay.length

    const slectedPlaces = allPlaces.slice(startingCountDisplay, currentTotalDisplay);
    
    const getDetails = googleMapsApi.getDetails(slectedPlaces);
    const details = await getDetails;
    return { slectedPlaces, details}
  }

  
  getMore = () => {
    const allPlacesTotal = this.state.allPlaces.length
    if (this.state.currentTotalDisplay < allPlacesTotal){
      const totalInc = this.displayInc + this.state.placesToDisplay.length;
      const currentTotalDisplay = totalInc >= allPlacesTotal ? allPlacesTotal : totalInc
      this.setState({ currentTotalDisplay }, this.getPlacesToDisplay);
    }
    else{
      // DISPLAY MESSAGE NO MORE RESULTS OR UPDATE NUMBER SHOW max/max
    }
  }

  placesLocal = (data) => {
    this.setState({ placesToDisplay: data });
  }
  render() { 
  
    
    const { placesToDisplay}  = this.state;
    
    return ( 
      <div>
        <AppBar setPlaceDataForQuery={this.setPlaceDataForQuery} setAllPlaces={this.setAllPlaces}/>
       
        <Btn clickAction={this.getMore}/>
        <Results placesToDisplay={placesToDisplay}/> 
      </div>
     )
  }
}


function rtBtn(){

   const btn = (props) => {

    return (
      <button onClick={props.clickAction}>more</button>
    )
  } 

  return btn;
}
 
export default Layout;
import React, { Component } from 'react';
import Search from './../Search/index';
import { googleMapsApi, getYelpHealthData, buildYelpQuery, buildHealthQuery} from '../../Api/helper'
import { GooglePlace, Yelpplace, Healthplace} from './../../Models/place'
import Results from './../Results/index';

const Btn = rtBtn();
class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      allPlaces: [],
      yelpData: [],
      healthData:[],
      placesToDisplay: [],
      placeData: {},
      currentTotalDisplay: 0,
     }
    this.displayInc = 4;
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.allPlaces !== this.state.allPlaces ){
      this.setState(currentState => {
        return { placesToDisplay: [], yelpData: [], healthData:[] }
      }, this.getPlacesToDisplay);
    }

    if (this.state.yelpData !== prevState.yelpData && this.state.healthData !== prevState.healthData && (this.state.healthData.length > 0 || this.state.yelpData.length > 0)){
      this.combineDataForPlacesToDisplay()
    }
  }

  getPlacesToDisplay = async () =>{
    let queries = await this.buildQueries();
    const setData = (data) => {
      this.setState(currentState => {
        const yelpData = currentState.yelpData.concat(data.yelpData)
        const healthData = currentState.healthData.concat(data.healthData)
        return { yelpData, healthData}
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
      return { placesToDisplay: currentState.placesToDisplay.concat(places)}
    });
  }

  setAllPlaces = (data) => {
    const currentTotalDisplay = this.displayInc >= data.length ? data.length : this.displayInc
      this.setState({ allPlaces: data, currentTotalDisplay });
  }

  setPlaceDataForQuery = (placeData) =>{
    this.setState({ placeData  });
  }

  async buildQueries() {
    const { allPlaces, placeData, currentTotalDisplay, placesToDisplay} = this.state; 
    const startingCountDisplay = placesToDisplay.length
    const displayLimit = currentTotalDisplay - startingCountDisplay;
    const slectedPlaces = allPlaces.slice(startingCountDisplay, currentTotalDisplay);
    let queries = { health: [], yelp: { data: [] }, displayLimit };
    let getPhoneNumbers = googleMapsApi.getPhone(slectedPlaces);
    const phoneNumbers = await getPhoneNumbers;
    
    buildHealthQuery(slectedPlaces, phoneNumbers, queries.health);
    buildYelpQuery(slectedPlaces, phoneNumbers, placeData, queries);

    return queries;
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
  render() { 
    const { placesToDisplay}  = this.state;
 
    return ( 
      <div>
        <Search setPlaceDataForQuery={this.setPlaceDataForQuery}  setAllPlaces={this.setAllPlaces}/>
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
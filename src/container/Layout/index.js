import React, { Component } from 'react';
import Search from './../Search/index';
import { googleMapsApi, getYelpHealthData, buildYelpQuery, buildHealthQuery} from '../../Api/helper'
import { GooglePlace, Yelpplace, Healthplace} from './../../Models/place'
import DisplayCard from '../../components/DisplayCard/DisplayCard';
import Results from './../Results/index';
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
    this.displayLimit = 4;
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.allPlaces !== this.state.allPlaces ){
      // wipe placesToDisplay clean 

     this.getPlacesToDisplay();



        // add returned values from primises to api to placesTodisplay
      // should be reusable  return promise upate state for placestoDisplay

      
    }

    if (this.state.yelpData !== prevState.yelpData && this.state.healthData !== prevState.healthData){
        
      this.combineDataForPlacesToDisplay()
    }

   
  }

  getPlacesToDisplay = async () =>{
    let queries = await this.buildQueries();
    const setData = (data) => {
      this.setState(currentState => {
        const yelpData = currentState.yelpData.concat(data.yelpData)
        const healthData = currentState.yelpData.concat(data.healthData)
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

    const places = slectedPlaces.map((ele, i) => {
      const  yelp  = yelpData[i].yelp;
      const  health  = healthData[i].data;
     //debugger;
      const healthPlace = new Healthplace(healthData[i].placeId, health)
      const yelpPlace = new Yelpplace(yelpData[i].placeId, yelp);
      
      return { googlePlace: new GooglePlace(ele.place_id, ele), yelpPlace, healthPlace }
    })
    this.setState(currentState => {
    
   
      return { placesToDisplay: currentState.placesToDisplay.concat(places)}
    });
  }

  setAllPlaces = (data) => {
    const currentTotalDisplay = this.displayLimit >= data.length ? data.length : this.displayLimit
      this.setState({ allPlaces: data, currentTotalDisplay });
  }

  setPlaceDataForQuery = (placeData) =>{
    this.setState({ placeData  });
  }

  async buildQueries() {
    const { allPlaces, placeData, currentTotalDisplay, placesToDisplay} = this.state;
    const startingCountDisplay = placesToDisplay.length
    let queries = { health: [], yelp: { data: [] }, displayLimit: currentTotalDisplay };
    let getPhoneNumbers = googleMapsApi.getPhone(allPlaces, currentTotalDisplay);
    const phoneNumbers = await getPhoneNumbers;
    
    // Pass in placesToDisplay.length for starting point 
    // to placesToDisplay.length + this.displayLimit
    buildHealthQuery(allPlaces, phoneNumbers,startingCountDisplay,currentTotalDisplay, queries.health);
    buildYelpQuery(allPlaces, phoneNumbers, placeData, queries, startingCountDisplay, currentTotalDisplay);
    return queries;
  }
  
  render() { 
    const { placesToDisplay}  = this.state;
 
    return ( 
      <div>
        <Search setPlaceDataForQuery={this.setPlaceDataForQuery}  setAllPlaces={this.setAllPlaces}/>
        <Results placesToDisplay={placesToDisplay}/> 
      </div>
     )
  }
}
 
export default Layout;
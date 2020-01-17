import React, { Component } from 'react';
import Search from './../Search/index';
import { googleMapsApi, getYelpHealthData, buildYelpQuery, buildHealthQuery} from '../../Api/helper'


class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      yelpHealthData: [],
      allPlaces: [],
      yelpData: [],
      healthData:[],
      placesToDisplay: [],
      placeData: {},
      currentDisplayLimit: 0,
     }
    this.displayLimit = 4;
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.allPlaces !== this.state.allPlaces ){
      // wipe placesToDisplay clean 

     this.getPlacesToDisplay();
      // DO PLACE DATA NEXT TO PASS TO YELP
      console.log('googleMapsApi', googleMapsApi.place);



      // PUT ALL API IN ONE FILE MOVE function getYelpHealthData and buildquries to file and export
            // add photo
               // health
               // yelp
        // add returned values from primises to api to placesTodisplay
      // should be reusable  return promise upate state for placestoDisplay

      
    }

   
  }

  getPlacesToDisplay = async () =>{
  
    let queries = await this.buildQueries();
     
    const setData = (data) => {

      this.setState({ yelpData: data.yelpData,healthData: data.healthData });
    }
    
    // first do set state
    // then experiment with asyn and return that and set state here instead
    getYelpHealthData(queries, setData);
    
    console.log("queryBuilderqueryBuilder", queries);
  }



  setYelpHealthData = (data) => {
    this.setState({ yelpHealthData: data  });
  }

  setAllPlaces = (data) => {
    const currentDisplayLimit = this.displayLimit >= data.length ? data.length : this.displayLimit
      this.setState({ allPlaces: data, currentDisplayLimit });
  }

  setPlaceDataForQuery = (placeData) =>{
    this.setState({ placeData  });
  }

  async buildQueries() {
    const { allPlaces, placeData, currentDisplayLimit } = this.state;
    let queries = { health: [], yelp: { data: [] }, displayLimit: currentDisplayLimit };
    let getPhoneNumbers = googleMapsApi.getPhone(allPlaces, currentDisplayLimit);
    const phoneNumbers = await getPhoneNumbers;
    
    // Pass in placesToDisplay.length for starting point 
    // to placesToDisplay.length + this.displayLimit
    buildHealthQuery(allPlaces, phoneNumbers,currentDisplayLimit, queries.health);
    buildYelpQuery(allPlaces, phoneNumbers, placeData, queries, currentDisplayLimit);
    return queries;
  }

  render() { 
    return ( 
      <div>
        <Search setPlaceDataForQuery={this.setPlaceDataForQuery}  setAllPlaces={this.setAllPlaces}/>
      </div>
     )
  }
}
 
export default Layout;
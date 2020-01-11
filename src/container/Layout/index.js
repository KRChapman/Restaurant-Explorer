import React, { Component } from 'react';
import Search from './../Search/index';
import googleMapsApi from '../../Api/GoogleMap/helper'
import { buildHealthQuery} from './../../Api/Health/index'
import { buildYelpQuery} from './../../Api/Yelp/index'
import { apiRequest} from './../../utils/index'
import { yelpUrl} from './../../Api/Yelp/index'

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      yelpHealthData: [],
      allPlaces: [],
      yelpData: [],
      placesToDisplay: [],
      placeData: {}
      
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


    // first do set state
    // then experiment with asyn and return that and set state here instead
    this.getYelpHealthData(queries);
    console.log("queryBuilderqueryBuilder", queries);
  }

  getYelpHealthData = (queries) =>{
    const request = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: queries.yelp
    }

    Promise.resolve(
      apiRequest(yelpUrl, request)
    )
      .then((response) => {
        return response.json()
      }).then((data) => {

        this.setState({ yelpData: data });
      })
  }
  

  setYelpHealthData = (data) => {
    this.setState({ yelpHealthData: data  });
  }

  setAllPlaces = (data) => {
    this.setState({ allPlaces: data });
  }

  setPlaceDataForQuery = (placeData) =>{
    this.setState({ placeData  });
  }

  async buildQueries() {
    let queries = {health: [], yelp: {data: [], displayLimit: this.displayLimit} };
    const { allPlaces, placeData } = this.state;
    let getPhoneNumbers = googleMapsApi.getPhone(allPlaces, this.displayLimit);
    const phoneNumbers = await getPhoneNumbers;
    
    // Pass in placesToDisplay.length for starting point 
    // to placesToDisplay.length + this.displayLimit
    buildHealthQuery(allPlaces, phoneNumbers, this.displayLimit, queries.health);
    buildYelpQuery(allPlaces, phoneNumbers, placeData, queries);
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
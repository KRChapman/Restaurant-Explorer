import React, { Component } from 'react';
import Search from './../Search/index';
import googleMapsApi from './../../Api/GoogleMaps/helper'
import { buildHealthQuery} from './../../Api/Health/index'
import { buildYelpQuery} from './../../Api/Yelp/index'
class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      yelpHealthData: [],
      allPlaces: [],
      placesToDisplay: [],
      placeData: {}
      
     }
    this.displayLimit = 4
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.allPlaces !== this.state.allPlaces ){
      // wipe placesToDisplay clean 

     this.getPlacesToDisplay();
      // DO PLACE DATA NEXT TO PASS TO YELP
      console.log('googleMapsApi', googleMapsApi.place);



      // create a promise funtion that takes in an array and adds to placesToDisplay from
      // placesTodisplay length + displayLimit
      // inside if display function
          // iterate from displayPlaces.length to limit+ displayPlaces
          // For each Ieration recursivly call promise
            //  phone (make decupled in case i want to nix)
            // LOOK FOR NO PHONE NUMBER EDGE CASE!
            // add photo
               // health
               // yelp
        // add returned values from primises to api to placesTodisplay
      // should be reusable  return promise upate state for placestoDisplay

      
    }

   
  }

  getPlacesToDisplay = async () =>{
  
   let queryBuilder = [];
   const { allPlaces} = this.state
    let getPhoneNumbers = googleMapsApi.getPhone(allPlaces, this.displayLimit)

    const phoneNumbers = await getPhoneNumbers;
    
    buildHealthQuery(allPlaces, phoneNumbers, this.displayLimit, queryBuilder);
    buildYelpQuery(allPlaces, queryBuilder);

   // placesToDisplay = await 
    console.log("queryBuilderqueryBuilder", queryBuilder);
  }

  getYelpHealthData = () =>{
   // just like the fact that 4xx / 5xx responses don't reject the initial promise

    //   Promise.all([
    // fetchfunction(request), //FROM FETCH wrapper
    //   fetchfunction(`
//    /api/yelp?name=${name}&location=${address}&city=${city}
//       &state=${state}&country=${country}`) GET FROM yelp api file
    //     ])
      //  .then(([data1, data2]) => {
      // let yelpHealth = {
      //   recentInfo: data1.json(),
      //   alltimeInfo: data2.json()
      // }
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

  render() { 
    return ( 
      <div>
        <Search setPlaceDataForQuery={this.setPlaceDataForQuery} setYelpHealthData={this.setYelpHealthData} setAllPlaces={this.setAllPlaces}/>
      </div>
     )
  }
}
 
export default Layout;
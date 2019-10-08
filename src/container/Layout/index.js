import React, { Component } from 'react';
import Search from './../Search/index';
import googleMapsApi from './../../Api/GoogleMaps/helper'
import healthApi from './../../Api/Health/index'

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
    if (prevState.allPlaces !== this.state.allPlaces){
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
  //  let t = new Promise( (resolve, reject)=> {
  //    return resolve()
  //   });
   let queryBuilder = [];
   const { allPlaces} = this.state
    let getPhoneNumbers = googleMapsApi.getPhone(allPlaces, this.displayLimit)

    const phoneNumbers = await getPhoneNumbers;
    
   
    queryBuilder = healthApi(allPlaces, phoneNumbers, this.displayLimit, queryBuilder);

    // console.log("queryBuilderqueryBuilder", queryBuilder);

  
    
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
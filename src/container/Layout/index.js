import React, { Component } from 'react';
import Search from './../Search/index';
import googleMapsApi from './../../Api/GoogleMaps/helper'
class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      yelpHealthData: [],
      allPlaces: [],
      placesToDisplay: [],
      displayLimit: 4,
     }
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.allPlaces !== this.state.allPlaces){
      // wipe placesToDisplay clean 
      this.getPlacesToDisplay();
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
    
    let t = googleMapsApi.getPhone(this.state.allPlaces, this.state.displayLimit)
    console.log('ASYNCAWITphoneNumbersTTTT', t);
    const s = await t;
    console.log('ASYNCAWITphoneNumbersSSSS', s);
   
  //  const phoneNumbers = await response.json();
  
    
  }

  setYelpHealthData = (data) => {
    this.setState({ yelpHealthData: data  });
  }

  setAllPlaces = (data) => {
    this.setState({ allPlaces: data });
  }

  render() { 
    return ( 
      <div>
        <Search allPlaces={this.state.allPlaces} setYelpHealthData={this.setYelpHealthData} setAllPlaces={this.setAllPlaces}/>
      </div>
     )
  }
}
 
export default Layout;
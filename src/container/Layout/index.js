import React, { Component } from 'react';
import Search from './../Search/index';
import googleMapsApi from './../../Api/GoogleMaps/helper'
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
  
    let queries = await this.buildQueries();


    // first do set state
    // then experiment with asyn and return that and set state here instead
    this.getYelpHealthData(queries);
    console.log("queryBuilderqueryBuilder", queries);
  }

  getYelpHealthData = (queries) =>{
    
   // just like the fact that 4xx / 5xx responses don't reject the initial promise
    const yelpData = []
    const iterateOne = (queries, index, yelpData) => {
  
      if (index < this.displayLimit) {
        // const healthRequest = queries[index].health.request
        // const healthUrl = queries[index].health.url
        // const yelpRequest = queries[index].yelp.request
        // const yelpthUrl = queries[index].yelp.url

        const request = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: queries
        }
      
        Promise.resolve(
          apiRequest(yelpUrl, request)
       )
          .then((response) => {
            return response.json()
          }).then((data) => {
           
            // const yelpHealth = {
            //   yelp: data1,

            // }
            console.log('yelpHealthyelpHealthyelpHealth', data);
           // yelpData.push(data);
            this.setState({ yelpData: data });
            //index = index + 1;
            //iterateOne(queries, index, yelpHealthData)
          })
        
        
           
       
      }
      else {
        console.log('yelpData', yelpData);
        
      }
    }


    
    // const  iterateApiCalls = (queries, index, yelpHealthData) =>{
    //   if(index < this.displayLimit){
    //     const healthRequest = queries[index].health.request
    //     const healthUrl = queries[index].health.url
    //     const yelpRequest = queries[index].yelp.request
    //     const yelpthUrl = queries[index].yelp.url
 
    
    //     Promise.all([
    //       apiRequest(healthUrl,healthRequest),
    //       apiRequest(yelpthUrl,yelpRequest)
    //     ])
    //       .then(([data1, data2]) => {
    //         let yelpHealth = {
    //           health: data1.json(),
    //           yelp: data2.json()
    //         }
    //         console.log('yelpHealthyelpHealthyelpHealth', yelpHealth);
    //         yelpHealthData.push(yelpHealth);
    //         index = index + 1;
    //         iterateApiCalls(queries, index, yelpHealthData)
    //       })
    //   }
    //   else{
    //     this.setState({ placesToDisplay: yelpHealthData  });
    //   }
    // }
    iterateOne(queries.yelp, 0, yelpData);
   // iterateApiCalls(queries, 0, yelpHealthData);

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
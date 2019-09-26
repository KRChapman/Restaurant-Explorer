import React, { Component } from 'react';
import Place from './Place/index';
import {findPlaces} from './../../Api/GoogleMaps/helper'

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      inputForSearch: "",
      place: "",
      allPlaces: [],
      dataToShare: {
        cords: [],
        health: [],
        yelp: "",
      },
     }
  }
 
  componentDidUpdate(prevProps, prevState){
    if (prevState.allPlaces !== this.state.allPlaces) { //prevState.detailPlaces !== this.state.detailPlaces
      this.getNameAddress();
    }

  }

  handleChange = (event) =>{
    this.setState({ inputForSearch: event.target.value });
  }

  handleSearch = (event) => {
    event.preventDefault();
    
    let lat = this.state.place.geometry.location.lat();
    let lon = this.state.place.geometry.location.lng();

    let query = this.state.inputForSearch;

    const theSetState = (places, service) => {
      this.setState({ allPlaces: places, service });

    }

    let places = findPlaces(lat, lon, query, theSetState, this.state.map);
    console.log('fftt', places);
    // this.setState({ :  });
  }


  getNameAddress() {

    let coords = this.state.allPlaces.map(ele => {
      let addressArray = ele.formatted_address.split('');

      let index = addressArray.indexOf(',');
      let address = addressArray.slice(0, index);
      address = address.join('');

      return {
        name: ele.name,
        address: address,
        city: '',

      }

    })
    this.setState(currentState => {
      let dataToShare = { ...currentState.dataToShare };
      dataToShare.cords = coords;

      return {
        dataToShare
      }
    });
  }





  // latLong = (data) => {
  //   let latlong = data.map(l => {
  //     let latlong = {}
  //     latlong.lat = l.geometry.location.lat();
  //     latlong.lng = l.geometry.location.lng();

  //     return latlong;
  //   })
  //   this.setState({ latlong });
  // }
  // getPhoto = () => {

  //   this.setState(currentState => {
  //     let entireLength = currentState.allPlaces.length;

  //     this.latLong(currentState.allPlaces);
  //     // let half = Math.floor(entireLength/ 2);
  //     let firstHalf = currentState.allPlaces.slice(0, entireLength);
  //     let pictureData = firstHalf.map((ele) => {
  //       if (ele.photos != null) {
  //         return ele.photos[0].getUrl()
  //       }
  //       else {
  //         return "";
  //       }

  //     })

  //     return {
  //       pictureData
  //     }
  //   });
  // }

  handleUpdatePlace = (place) => {
    this.setState({ place  });
  }
  render() { 
    return (
      <React.Fragment>
        <h1>{this.props.tester}</h1>

        <form action="/" method="get" onSubmit={this.handleSearch}>
          <input type="text" onChange={this.handleChange}/>
          <button>Search</button>
        </form>
        <Place updatePlace={this.handleUpdatePlace}/>
      </React.Fragment>

      )
  }
}


 
export default Search;
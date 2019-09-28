import React, { Component } from 'react';
import Search from './../Search/index';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      yelpHealthData: [],
      allPlaces: [],
     }
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
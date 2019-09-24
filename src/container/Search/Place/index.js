// TURN INTO HOOK
import React, { Component } from 'react';
  
class Place extends Component {
  constructor(props) {
    super(props);
    this.state = {  }

  }
  componentDidMount(){
    const setThePlace = (place) => {
      //context in event call back function
      this.props.updatePlace( place );
    }

    // https://developers.google.com/maps/documentation/javascript/places-autocomplete
    var input = document.getElementById('searchPlace');
    autoCompletePlace(input, setThePlace);
  }

  render() { 

    return ( 
      <div>
        <input id={"searchPlace"} type="text" />

      </div>
     )
  }
}
 
export default Place;

function autoCompletePlace(inputElement, setStateCallBack) {
  var searchBox = new window.google.maps.places.Autocomplete(inputElement);
  var place;
  searchBox.addListener('place_changed', function () {
    place = searchBox.getPlace();
    if (place.length === 0) {
      return;
    }
    setStateCallBack(place);
  });
}

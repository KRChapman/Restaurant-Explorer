import React, { useState, useEffect } from 'react';
import Place from './Place/index';
import {findPlaces} from './../../Api/GoogleMaps/helper'

const  Search = props => {
  const [inputForSearch, setInputForSearch] = useState("");
  const [place, setplace] = useState("");
  const [dataToShare, setdataToShare] = useState({
                                        cords: [],
                                        health: [],
                                        yelp: "",
                                      });

    // this.state = { 
    //   inputForSearch: "",
    //   place: "",
    //   dataToShare: {
    //     cords: [],
    //     health: [],
    //     yelp: "",
    //   },

    // }
  useEffect(()=>{
    getNameAddress()
  }, [props.allPlaces])//prevState.detailPlaces !== this.state.detailPlaces


  const handleChange = (event) =>{
    setInputForSearch(event.target.value );
  }

  const handleSearch = (event) => {
    event.preventDefault();
    let lat = place.geometry.location.lat();
    let lon = place.geometry.location.lng();
    let query = inputForSearch;
    let places = findPlaces(lat, lon, query, props.setAllPlaces);

  }


  function getNameAddress() {
      let coords = props.allPlaces.map(ele => {
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
    setdataToShare({ ...dataToShare, coords })

  }


  const handleUpdatePlace = (place) => {
    setplace( place  );
  }


  let content =  (
      <React.Fragment>
        <h1>{props.tester}</h1>

        <form action="/" method="get" onSubmit={handleSearch}>
          <input type="text" onChange={handleChange}/>
          <button>Search</button>
        </form>
        <Place updatePlace={handleUpdatePlace}/>
      </React.Fragment>

  )
  return content;

}


 
export default Search;
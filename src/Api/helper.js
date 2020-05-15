import { apiRequest } from './../utils/index';
import markers from './markers'

const darkMap = [
  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#263c3f' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6b9a76' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#38414e' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#212a37' }]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9ca5b3' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#746855' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1f2835' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#f3d19c' }]
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#2f3948' }]
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#17263c' }]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#515c6d' }]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#17263c' }]
  }
]

const mapThemes = {'dark': darkMap, 'light': null}

class GoogleMapsApi {
  constructor() {
    this.map = null
    this.service = null
    this.place = null
    this.exactLocation = null
    this.markers = []
    this.mapTheme = 'light'
  }

    // pUT STYLES AND MAP THEM VARIABLE START IN OWN FILE AND IMPORT TO THIS AND LAYOUT mapTheme State
  initiateMap(latitude = null,longitude = null){
    const lat = latitude == null ? this.place.geometry.location.lat() :  latitude;
    const lon = longitude == null ? this.place.geometry.location.lng() : longitude;
      const exactLocation = new window.google.maps.LatLng(lat, lon);
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: exactLocation,
        zoom: 14,
        styles: mapThemes[this.mapTheme],
  
        
      });
     // this.mapTheme = mapTheme;
      this.exactLocation = exactLocation;
      this.map = map;
  }

  changeMapTheme(mapTheme){
    if (this.map){
      this.mapTheme = mapTheme;
      this.map.setOptions({ styles: mapThemes[mapTheme] })
    }
    
 
 }

  autoCompletePlace(inputElement, setPlace) {
    const searchBox = new window.google.maps.places.Autocomplete(inputElement);
    let place;
    searchBox.addListener('place_changed', () => {
      place = searchBox.getPlace();
      if (place.length === 0) {
        return;
      }
      this.place = place;

      setPlace(place);
      this.initiateMap();
    });
  }

  findPlaces(query, setPlaceData){
    const location = this.exactLocation;
    const request = {
      location, 
      radius: '20',
      query,
      fields: ['formatted_address',
      'id', 'photos', 'place_id', 'name','price_level',
        'rating', 'user_ratings_total', 'international_phone_number','utc_offset_minutes']
    };
    let service = new window.google.maps.places.PlacesService(this.map);
    this.service = service;
    service.textSearch(request, callback);

    function callback(results, status) {
      let allPlaceData = [];
      for (let i = 0; i < results.length; i++) {
        allPlaceData.push(results[i]); 
      }
      setPlaceData(allPlaceData);
    }
  }

  getDetails = (places) => {
    const requests = []; 
    for (let index = 0; index < places.length; index++) {
      let request = {
        placeId: places[index].placeId,
        fields: ['place_id', 'url','reviews','name', 'international_phone_number', 
          'formatted_phone_number', 'url', 'website', "opening_hours" ]
      };
      requests.push(request)
    }
    let phoneNumbers = []
    const service = this.service;

    return new Promise(function (resolve, reject) {
      getPhoneToReturn(requests, 0, phoneNumbers, service)
      
        function getPhoneToReturn(requests, index, phoneNumbers, service) {
          if (index < requests.length) {
            const promise1 = new Promise(function (resolve, reject) {
              service.getDetails(requests[index], callback);
              // NEED REJECT FOR ERROR (connection / wrong data ect...)
              // Iif not found then keep resolve
              function callback(place, status) {
                //console.log('status', status);
                if (status) {
                  resolve(place);
                }
                else {
                  console.log('statusgetPhoneToReturn', status);
                 reject()
                //  resolve({ name: "", formatted_phone_number: "",international_phone_number: ""})
                }
              }
            });
            promise1.then((place) => {
              phoneNumbers.push(place);
       
              getPhoneToReturn(requests, index+1, phoneNumbers, service);
            }, e => {

              phoneNumbers.push({ name: "", formatted_phone_number: "", international_phone_number: "" });

              getPhoneToReturn(requests, index + 1, phoneNumbers, service);
            })
          }
          else {
            resolve(phoneNumbers)
          }
        }
    });
  }

  getMarkers = (places) => {
   // this.markers
     return places.map(ele=> {
 
      const latitude = ele.lat
      const longitude = ele.lng;
      const myLatlng = new window.google.maps.LatLng(latitude, longitude);
     const chosenMarkericon = markers[ele.marker];
      const markerOptions = {
        position: myLatlng,
        title: ele.name,
        icon: chosenMarkericon,
      }
  
      let marker = new window.google.maps.Marker(markerOptions); 
       return marker
    })
    // this.markers;
  }

  changeMarker = (marker) => {

  
 // USE this.markers
    const latitude = marker.lat
    const longitude = marker.lng;
      const myLatlng = new window.google.maps.LatLng(latitude, longitude);
    const chosenMarkericon = markers[marker.marker];
      const markerOptions = {
        position: myLatlng,
        title: marker.name,
        icon: chosenMarkericon,
      }

      let newMarker = new window.google.maps.Marker(markerOptions);
      return newMarker


  }


}

export const yelpUrl = 'http://localhost:5000/api'
export const buildYelpQuery = (allPlaces, phoneNumbers, placeDetails) => {
  const { city, state, country } = placeDetails;
  const queries = { data: [] }; 
  for (let i = 0; i < allPlaces.length; i++) {
    
    let phoneNumbersFormated;
    if (phoneNumbers[i].international_phone_number) {
      phoneNumbersFormated = phoneNumbers[i].international_phone_number
        .split('')
        .filter(letter => letter !== '-' && letter !== ' ')
        .join('');
    }
    else {
      phoneNumbersFormated = null;
    }

    queries.data.push({ placeId: allPlaces[i].placeId, phoneNumber: phoneNumbersFormated, city, state, country, name: allPlaces[i].name, address: allPlaces[i].address })
  }
  return queries;
}

export const buildHealthQuery = (places, phoneNumbers) => {
  return getNames();

  function getNames(coordsToSearch) {
    const queries = [];
    for (let i = 0; i < places.length; i++) {
      let healthName = formatHealthName(places[i].name.toUpperCase());
      let address = formatAddress(places[i].address);
      let partialAddressQuery = '%20'
      // if (phoneNumbers[i].formatted_phone_number) {
      // buildHealthQuery  partialAddressQuery = createPartialAddress(phoneNumbers[i].formatted_phone_number);
      // }
      let healthAPiQuery = formatUrlQuery(healthName, address, partialAddressQuery);
     // let nameOnly = `https://data.kingcounty.gov/resource/gkhn-e8mn.json?$where=upper(address)%20like%20'%25${address}%25'%20AND%20(name%20${t}%20OR%20name%20=%20'${healthName}'%20OR%20${firstHealth})&$order=inspection_date%20DESC`

      let apiSearchValue = { health: { url: healthAPiQuery, placeId: places[i].placeId } }
      queries.push(apiSearchValue);
    }
    return queries;
  }

  function formatHealthName(name) {
    const regex = /%20and%20/gi;
   // const regex2 = /'/gi;
    const regex3 = /'s/gi;

    name = modifyAccent(name);
    let healthName = fixedEncodeURIComponent(name.toUpperCase());
    healthName = healthName.replace(regex, '%20%26%20');
    // Error no return data with 's escaped so replace with empty string instead
   // healthName = healthName.replace(regex2, '%34'); 
    healthName = healthName.replace(regex3, '')

    return healthName;
  }

  function fixedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(/[!()*]/g, function (c) {
      return '%' + c.charCodeAt(0).toString(16);
    });
  }

  function modifyAccent(str){
    const regex = RegExp('/[À-ÿ]/');
    const isAccent =  regex.test(str);
 
    if (isAccent){
    str =  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    }
   return str
  
  }

  // function createPartialAddress(phone) {
  //   let partialaddress = fixedEncodeURIComponent(phone);
  //   let partialAddressQuery = `OR%20phone%20=%20'${partialaddress}'%20`;

  //   return partialAddressQuery;
  // }

  function formatAddress(initialAddress) {
    let addressArray = initialAddress.split(' ');
    addressArray = addressArray.slice(0, 2);
    let partialaddress = addressArray.join(' ');
    let address = encodeURIComponent(partialaddress).toUpperCase();
    return address;
  }

  function formatUrlQuery(healthName, address, partialAddressQuery) {
    let tempName = healthName;
    let index = tempName.lastIndexOf("%20");
    let firstIndex = tempName.indexOf("%20");
    let theArray = tempName.split('').slice(index + 3, tempName.length).join('');
    let first = tempName.split('').slice(0, firstIndex).join('');
    let t = `like%20'%25${theArray}'`;
    let firstHealth = `starts_with(name, '${first}')`;
    let phoneComb = `https://data.kingcounty.gov/resource/gkhn-e8mn.json?$where=(upper(address)%20like%20'%25${address}%25'%20AND%20(name%20${t}%20OR%20name%20=%20'${healthName}'%20OR%20${firstHealth}))${partialAddressQuery}&$order=inspection_date%20DESC`;
    return phoneComb;
  }
}

export const getYelpHealthData = (queries, setState) => {
  const queryiesForApi =  JSON.stringify(queries)
  const request = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: queryiesForApi
  }

  Promise.resolve(
    apiRequest(yelpUrl, request)
  )
    .then((response) => {
      return response.json()
    }).then((data) => {
      setState(data);
    }).catch(e=>{
      console.log('req.body.yelp', e);
    })
};

export const getYelpReviews = (yelpId) => {
  const url = yelpUrl + '/yelp-review';
  yelpId = JSON.stringify({yelpId})
  const request = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: yelpId
  }
 return Promise.resolve(
    apiRequest(url, request)
  )
    .then((response) => {
      return response.json()
    }).then((data) => {
      return data;
    }).catch(e => {
      console.log('req.body.yelp', e);
    })

}

export let googleMapsApi = new GoogleMapsApi();
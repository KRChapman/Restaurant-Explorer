import { apiRequest } from './../utils/index';

class GoogleMaps {
  constructor() {
    this.map = null
    this.service = null
    this.place = null
    this.exactLocation = null
  }

   initiateMap(){
      const lat = this.place.geometry.location.lat();
      const lon = this.place.geometry.location.lng();
      const exactLocation = new window.google.maps.LatLng(lat, lon);
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: exactLocation,
        zoom: 8,
      });
      this.exactLocation = exactLocation
      this.map = map;
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

  getPhone = (places,limit) => {
    const requests = [];
    for (let index = 0; index < limit; index++) {
      let request = {
        placeId: places[index].place_id,
        fields: ['name', 'international_phone_number','formatted_phone_number']
      };
      requests.push(request)
    }
    let phoneNumbers = []
    const service = this.service;

    return new Promise(function (resolve, reject) {
      getPhoneToReturn(requests, 0, phoneNumbers, service)
      
        function getPhoneToReturn(requests, index, phoneNumbers, service) {
          if (index < limit) {
            const promise1 = new Promise(function (resolve, reject) {
              service.getDetails(requests[index], callback);
              // NEED REJECT FOR ERROR (connection / wrong data ect...)
              // Iif not found then keep resolve
              function callback(place, status) {
             
                if (status) {
                  resolve(place);
                }
                else {
                  resolve({ name: "", formatted_phone_number: ""})
                }
              }
            });
            promise1.then((place) => {
              phoneNumbers.push(place);
       
              getPhoneToReturn(requests, index+1, phoneNumbers, service);
            })
          }
          else {
            resolve(phoneNumbers)
          }
        }
    });
  }
}

export const yelpUrl = 'http://localhost:5000/api'
export const buildYelpQuery = (allPlaces, phoneNumbers, placeDetails, queries, limit) => {
  const { city, state, country } = placeDetails;

  for (let i = 0; i < limit; i++) {
    
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

    queries.yelp.data.push({ placeId: allPlaces[i].place_id, phoneNumber: phoneNumbersFormated, city, state, country, name: allPlaces[i].name, address: allPlaces[i].address })
  }
}

export const buildHealthQuery = (places, phoneNumbers, limit, queries) => {
  return getNames();

  function getNames(coordsToSearch) {
    for (let i = 0; i < limit; i++) {
      let healthName = formatHealthName(places[i].name.toUpperCase());
      let address = formatAddress(places[i].address);
      let partialAddressQuery = '%20'
      // if (phoneNumbers[i].formatted_phone_number) {
      //   partialAddressQuery = createPartialAddress(phoneNumbers[i].formatted_phone_number);
      // }

      let healthAPiQuery = formatUrlQuery(healthName, address, partialAddressQuery);
     // let nameOnly = `https://data.kingcounty.gov/resource/gkhn-e8mn.json?$where=upper(address)%20like%20'%25${address}%25'%20AND%20(name%20${t}%20OR%20name%20=%20'${healthName}'%20OR%20${firstHealth})&$order=inspection_date%20DESC`

      let request = {
        method: "GET",
        params: {
          "$limit": 2,
          "$$app_token": "5m2NIQFlbJa6mE8SmXjznEIKH"
        }
      }
      let apiSearchValue = { health: { url: healthAPiQuery, request, placeId: places[i].place_id } }
      queries.push(apiSearchValue);
    }
  }

  function formatHealthName(name) {
    const regex = /%20and%20/gi;
    const regex2 = /'/gi;
    let healthName = fixedEncodeURIComponent(name.toUpperCase());
    healthName = healthName.replace(regex, '%20%26%20');
    healthName = healthName.replace(regex2, '%34');
    return healthName;
  }

  function fixedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(/[!()*]/g, function (c) {
      return '%' + c.charCodeAt(0).toString(16);
    });
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
}

export let googleMapsApi = new GoogleMaps();
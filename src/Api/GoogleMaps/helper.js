
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
        'rating', 'user_ratings_total','international_phone_number']
        // Change fields
        //https://developers.google.com/maps/documentation/javascript/place_field_js_migration
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
    for (let index = 0; index <= limit; index++) {
      let request = {
        placeId: places[index].place_id,

        fields: ['name','international_phone_number']
      };
      requests.push(request)
    }
    let phoneNumbers = []
    const service = this.service;

    return new Promise(function (resolve, reject) {
      getPhoneToReturn(requests, 0, phoneNumbers, service)
      
        function getPhoneToReturn(requests, index, phoneNumbers, service) {
          if (index <= limit) {
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


let googleMap = new GoogleMaps();
export default googleMap;
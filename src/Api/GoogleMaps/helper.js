

// API OBJECTS ARE REUSABLE FOR EXAMPLE new window.google.maps.places.PlacesService(map);
// USING A CLASS INSTANCE MAKES REUSING API OBJECTS STRAIGHT FORWARD

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

  autoCompletePlace(inputElement) {
    const searchBox = new window.google.maps.places.Autocomplete(inputElement);
    let place;
    searchBox.addListener('place_changed', () => {
      place = searchBox.getPlace();
      if (place.length === 0) {
        return;
      }
      this.place = place;
      this.initiateMap();
    });
  }

  findPlaces(query, setPlaceData){
    const location = this.exactLocation;
    const request = {
      location, 
      radius: '20',
      query,
    };
    let service = new window.google.maps.places.PlacesService(this.map);
    this.service = service;
    service.textSearch(request, callback);

    // service = new window.google.maps.places.PlacesService(map);
    // service.textSearch(request, callback);

    function callback(results, status) {
      let allPlaceData = [];
      for (let i = 0; i < results.length; i++) {
        allPlaceData.push(results[i]); 
      }

      setPlaceData(allPlaceData, service);
    }
  }

  getPhone = (places,limit) => {
   
    const requests = [];
    for (let index = 0; index <= limit; index++) {
      let request = {
        placeId: places[index].place_id,
        fields: ['name', 'formatted_phone_number']
      };
      requests.push(request)

    }
    let phoneNumbers = []
    const service = this.service;

    //  const response = getPhoneToReturn(requests, 0, phoneNumbers, service);
    // console.log('phoneNumbersresponseresponse', response);
    // return response;
  
  
    return new Promise(function (resolve, reject) {
      getPhoneToReturn(requests, 0, phoneNumbers, service)
      

        function getPhoneToReturn(requests, index, phoneNumbers, service) {

          index = index + 1
          if (index <= limit) {

            var promise1 = new Promise(function (resolve, reject) {


              service.getDetails(requests[index], callback);

              function callback(place, status) {
                console.log('status', status);
                if (status) {
                  console.log('place', place);
                  resolve(place);
                }
                else {
                  reject();
                }
              }

            });
            promise1.then((place) => {
              phoneNumbers.push(place);

              getPhoneToReturn(requests, index, phoneNumbers, service);

            })
          }
          else {
        
        
            // return new Promise(function (resolve, reject) {
            //   return resolve(phoneNumbers)
            // });
            resolve(phoneNumbers)
           // return 
          //  theSetState(phoneNumbers);
          }
        }

    });
  }
}


 

export const getPhone = (service, places, limit = 5, theSetState) => {
  const requests = [];
  for (let index = 0; index < limit; index++) {
    let request = {
      placeId: places[index].place_id,
      fields: ['name', 'formatted_phone_number']
    };
    requests.push(request)

  }
  let phoneNumbers = []
  getPhoneToReturn(requests, 0, phoneNumbers);


  function getPhoneToReturn(requests, index, phoneNumbers) {

    var promise1 = new Promise(function (resolve, reject) {


      service.getDetails(requests[index], callback);

      function callback(place, status) {
        console.log('status', status);
        //  if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.log('place', place);
        resolve(place);
        // }
      }

    });
    index = index + 1
    if (index <= 4) {
      promise1.then((place) => {
        phoneNumbers.push(place);

        getPhoneToReturn(requests, index, phoneNumbers);

      })
    }
    else {

      theSetState(phoneNumbers);
    }
  }


}





 const getPhoneNumbers = (service, places, limit, theSetState) => {
  limit = places.length < limit ? places.length : limit;
  const requests = [];
  for (let index = 0; index < limit; index++) {
    let request = {
      placeId: places[index].place_id,
      fields: ['name', 'formatted_phone_number']
    };
    requests.push(request)

  }
  let phoneNumbers = []
  getPhoneToReturn(requests, 0, phoneNumbers);


  function getPhoneToReturn(requests, index, phoneNumbers) {

    let promise1 = new Promise(function (resolve, reject) {


      service.getDetails(requests[index], callback);

      function callback(place, status) {
        console.log('status', status);
        //  if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.log('place', place);
        resolve(place);
        // }
      }

    });
    index = index + 1
    if (index <= 4) {
      promise1.then((place) => {
        phoneNumbers.push(place);

        getPhoneToReturn(requests, index, phoneNumbers);

      })
    }
    else {

      theSetState(phoneNumbers);
    }
  }


}

let googleMap = new GoogleMaps();
export default googleMap;
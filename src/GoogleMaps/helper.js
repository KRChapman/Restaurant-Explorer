export const findPlaces = (lat, long, query, theSetState) => {
  var location = new window.google.maps.LatLng(lat, long);
  var request = {
    location,
    radius: '20',
    query,
  };
  const map = new window.google.maps.Map(document.getElementById('map'), {
    center: location,
    zoom: 8,
  });

  //   let ma = document.getElementById('map');
  let service = new window.google.maps.places.PlacesService(map);
  service.textSearch(request, callback);

  // service = new window.google.maps.places.PlacesService(map);
  // service.textSearch(request, callback);

  function callback(results, status) {
    let placeData = [];
    for (var i = 0; i < results.length; i++) {

      placeData.push(results[i]);
      //  let requestDetail = {
      //    fields: ["formatted_phone_number"],
      //    placeId: results[i].place_id,
      //  }

      //   service.getDetails(requestDetail, callbackDetail)

      //       
    }
    function callbackDetail(result, status) {

    }
    // let photo = placeData[0].photos[0].getUrl();
    // console.log('photo', photo);


    theSetState(placeData, service);



  }
  // return placeData;

}
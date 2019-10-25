
export const buildYelpQuery = (allPlaces, phoneNumbers, placeDetails, queries) =>{
  const { city, state, country } = placeDetails;

  queries.health.forEach((element,i) => {
    // let urlMatch = `https://api.yelp.com/v3/businesses/matches?name=${allPlaces[i].name}&address1=${allPlaces[i].address}&city=${city}&state=${state}&country=${country}`;
    // let request = {
    //   method: 'GET',

    //   headers: { "Authorization": "Bearer gqw4k3JJGYyUVrE5fvmaOBd9YerLDsSJxXtBykLWy3U1226XfsGL4gDIq0ARBRsoiuJGN66bEh0ozpxleHGcC3rB8uncvLSg8r0gVCaw8rYDrBXr3PaSaVF1MNnPW3Yx" }
    // }
   // debugger;
  //CREATE FORMATED PHONE NUMBER "+14157492060" from international_phone_number "+1 206-332-0220"
  let phoneNumbersFormated;
  if (phoneNumbers[i].international_phone_number){
      phoneNumbersFormated  = phoneNumbers[i].international_phone_number
                              .split('')
                              .filter(letter => letter != '-' && letter != ' ')
                              .join('');
  }
  else{
      phoneNumbersFormated = null;
  }
 

    queries.yelp.push({ phoneNumber: phoneNumbersFormated, city, state, country, name: allPlaces[i].name, address: allPlaces[i].address })

  });
  queries.yelp = JSON.stringify(queries.yelp);
}

export const yelpUrl = 'http://localhost:5000/api/yelp'




/*
let name = req.query.name.toLowerCase();
let location = req.query.location;
let city = req.query.city;
let state = req.query.state;
let country = req.query.country;

let urlMatch = `https://api.yelp.com/v3/businesses/matches?name=${name}&address1=${location}&city=${city}&state=${state}&country=${country}`;
//let urlLatLong = 'https://api.yelp.com/v3/autocomplete?text="dance&latitude=47.6062&longitude=-122.3321'
let urlSearch = `https://api.yelp.com/v3/businesses/search?term=${name}&location=${city}%20${state}%20${location}&radius=200`
let request = {
  method: 'get',
  url: urlMatch,
  headers: { "Authorization": "Bearer gqw4k3JJGYyUVrE5fvmaOBd9YerLDsSJxXtBykLWy3U1226XfsGL4gDIq0ARBRsoiuJGN66bEh0ozpxleHGcC3rB8uncvLSg8r0gVCaw8rYDrBXr3PaSaVF1MNnPW3Yx" }
}


axios(request)
  .then(function (response) {
    // console.log('res', response.data);
    res.send(response.data);
    // response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
  }).catch((err) => {
    console.log(err);
  })


let city = this.state.place.address_components[0].long_name;
let state = this.state.place.address_components[2].short_name;
let country = this.state.place.address_components[3].short_name;
const yelpHealthData = []
const displayRatings = (yelpHealthData) => {

  this.setState({
    yelpHealthData
  })
}

/////
getYelpHealthData(searchValues, yelpHealthData, 0);
function getYelpHealthData(searchValues, yelpHealthData, index) {
  // searchValues.length
  if (index < 5) {
    // https://data.kingcounty.gov/resource/gkhn-e8mn.json?$where=upper(address)%20like%20'%252215%20aE%25'%20OR%20address%20like%20'2215%20E%20UNION%20ST'%20
    // AND%20(name%20like%20'%25CHUKIS'%20OR%20name%20=%20'TACOS%20CHUKIS'%20OR%20starts_with(name, 'TACOS'))&$order=inspection_date%20DESC
    let request = searchValues[index].health.request
    let name = searchValues[index].yelp.name
    let address = searchValues[index].yelp.address

    // https://data.kingcounty.gov/resource/gkhn-e8mn.json?$where=upper(address)%20like%20'2215%20Ea%20UNION%20ST'%20OR%20address%20like%20'%252215%20E%25'%20AND
    // %20(name%20like%20'%25CHUKIS'%20OR%20name%20=%20'TACOS%20CHUKIS'%20OR%20starts_with(name, 'TACOS'))&$order=inspection_date%20DESC
    //debugger;
    Promise.all([
      axios(request),
      axios(`/api/yelp?name=${name}&location=${address}&city=${city}&state=${state}&country=${country}`)
    ])
      .then(([data1, data2]) => {
        let yelpHealth = {
          recentInfo: data1,
          alltimeInfo: data2
        }
        yelpHealthData.push(yelpHealth);
        index = index + 1;
        getYelpHealthData(searchValues, yelpHealthData, index)
      }).catch((e) => {
        console.log('eeee', e);
      })
  }
  else {
    displayRatings(yelpHealthData);

  }
}

*/
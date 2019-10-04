


export function getNamesForSearch(coordsToSearch, phoneNumbers) {

  for (let i = 0; i < coordsToSearch.length; i++) {
    let name = coordsToSearch[i].name.toUpperCase();

    function fixedEncodeURIComponent(str) {
      return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
        return '%' + c.charCodeAt(0).toString(16);
      });
    }

    var regex = /%20and%20/gi;
    // var regex2 = /%20&%20/gi;
    let regex3 = /'S%20/gi;

    let healthName = encodeURIComponent(name.toUpperCase());
    healthName = healthName.replace(regex, '%20%26%20')
    // healthName = healthName.replace(regex2, '%20%26%20');

    // On
    healthName = healthName.replace(regex3, '%20')

    let addressArray = coordsToSearch[i].address.split(' ');
    addressArray = addressArray.slice(0, 2);
    let partialaddress = addressArray.join(' ')


    let address = encodeURIComponent(partialaddress).toUpperCase();
    //  console.log('encodeURI(address', address);

    if (i < 3) {

      var partialAddressQuery = createPartialAddress(phoneNumbers[i].formatted_phone_number);
    }


    function createPartialAddress(phone) {


      let partialaddress = fixedEncodeURIComponent(phone);
      let partialAddressQuery = `OR%20phone%20=%20'${partialaddress}'%20`
      // let phones = `phone%20=%20'${partialaddress}'%20`

      // phone%20=%20%27%28206%29%20913%2d7944%27%20&$order=inspection_date%20DESC

      //  return phones
      return partialAddressQuery;
    }
    // let a = `https://data.cityofchicago.org/resource/tt4n-kn4t.json?longitude=${lon}&lattitude=${lat}`;




    let tt = `https://data.kingcounty.gov/resource/gkhn-e8mn.json?$where=address%20like%20'%25${address}%25'`;
    let dd = `https://data.kingcounty.gov/resource/gkhn-e8mn.json?$q=${address}&$order=inspection_date%20DESC`;

    let tempName = healthName;
    let index = tempName.lastIndexOf("%20");
    let firstIndex = tempName.indexOf("%20");
    let theArray = tempName.split('').slice(index + 3, tempName.length).join('');
    let first = tempName.split('').slice(0, firstIndex).join('');



    let queryParam = `https://data.kingcounty.gov/resource/gkhn-e8mn.json?$query=SELECT%20*%20WHERE%20address%20LIKE%20'%25${address}%25'`
    //%20AND%20(name%20=%20'${healthName}'%20OR%20name%20=%20'${healthName}')%20ORDER%20BY%20inspection_date%20DESC%20LIMIT%202`;
    let t = `like%20'%25${theArray}'`;
    let firstHealth = `starts_with(name, '${first}')`
    //${partialAddressQuery}
    //    https://data.kingcounty.gov/resource/gkhn-e8mn.json?$where=phone%20=%20%27%28206%29%20913%2d7944%27%20&$order=inspection_date%20DESC
    let phoneOnly = `https://data.kingcounty.gov/resource/gkhn-e8mn.json?$where=${partialAddressQuery}&$order=inspection_date%20DESC`
    let phoneComb = `https://data.kingcounty.gov/resource/gkhn-e8mn.json?$where=(upper(address)%20like%20'%25${address}%25'%20AND%20(name%20${t}%20OR%20name%20=%20'${healthName}'%20OR%20${firstHealth}))${partialAddressQuery}&$order=inspection_date%20DESC`
    //https://data.kingcounty.gov/resource/gkhn-e8mn.json?$where=(upper(address)%20like%20%27%25240%202ND%20AVE%20S%25%27%20AND%20name%20like%20%27%25TACOS%27%20
    //OR%20name%20=%20%27MANU%20TACOS%27%20OR%20starts_with(name,%20%27MANU%27))OR%20phone%20=%20%27%28206%29%20913%2d7944%27%20&$order=inspection_date%20DESC

    let updateComb = `https://data.kingcounty.gov/resource/gkhn-e8mn.json?$where=upper(address)%20like%20'%25${address}%25'%20AND%20(name%20${t}%20OR%20name%20=%20'${healthName}'%20OR%20${firstHealth})&$order=inspection_date%20DESC`
    let comb = `https://data.kingcounty.gov/resource/gkhn-e8mn.json?$where=upper(address)%20like%20'%25${address}%25'&name=${healthName}&$order=inspection_date%20DESC`
    let query = `https://data.kingcounty.gov/resource/gkhn-e8mn.json?$q=${address},%20${healthName}&$order=inspection_date%20DESC`
    //&name=

    let test = getUrl();
    let request = {
      method: "get",
      url: phoneComb,

      params: {
        "$limit": 2,
        "$$app_token": "5m2NIQFlbJa6mE8SmXjznEIKH"
      }
    }

    function getUrl() {
      //  OR name like ${testname}
      let url = `https://data.kingcounty.gov/resource/gkhn-e8mn.json?$where=(upper(address) like '%${address}%' AND name = '${healthName}')&$order=inspection_date DESC`
      url = encodeURI(url);

      return url;
    }

    // axios(request).then((response) => {
    //   //  console.clear();
    //   console.log("requestNEWNEW", response);
    //   this.setState(currentState => {
    //     let dataToShare = {...currentState.dataToShare}
    //     dataToShare.health = response.data;
    //     return {
    //       dataToShare,
    //     }
    //   });
    // })


    let apiSearchValue = { health: { request }, yelp: { name, address: coordsToSearch[i].address } }
    apiSearches.push(apiSearchValue);
  }
  return apiSearches
}
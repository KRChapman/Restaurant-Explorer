export const buildHealthQuery = (places,phoneNumbers,limit,queryBuilder) =>{

  return  getNames();
  function getNames(coordsToSearch) {

     for (let i = 0; i < limit; i++) {
       let name = places[i].name.toUpperCase();

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

       healthName = healthName.replace(regex3, '%20')
       let addressArray = places[i].address.split(' ');
       addressArray = addressArray.slice(0, 2);
       let partialaddress = addressArray.join(' ')


       let address = encodeURIComponent(partialaddress).toUpperCase();
     
       if (i < 3) {

         var partialAddressQuery = createPartialAddress(phoneNumbers[i].formatted_phone_number);
       }


       function createPartialAddress(phone) {
 

         let partialaddress = fixedEncodeURIComponent(phone);
         let partialAddressQuery = `OR%20phone%20=%20'${partialaddress}'%20`
     
         return partialAddressQuery;
       }
  
       let tempName = healthName;
       let index = tempName.lastIndexOf("%20");
       let firstIndex = tempName.indexOf("%20");
       let theArray = tempName.split('').slice(index + 3, tempName.length).join('');
       let first = tempName.split('').slice(0, firstIndex).join('');




       let t = `like%20'%25${theArray}'`;
       let firstHealth = `starts_with(name, '${first}')`
      
       let phoneComb = `https://data.kingcounty.gov/resource/gkhn-e8mn.json?$where=(upper(address)%20like%20'%25${address}%25'%20AND%20(name%20${t}%20OR%20name%20=%20'${healthName}'%20OR%20${firstHealth}))${partialAddressQuery}&$order=inspection_date%20DESC`
       



       let request = {
         method: "get",
         url: phoneComb,

         params: {
           "$limit": 2,
           "$$app_token": "5m2NIQFlbJa6mE8SmXjznEIKH"
         }
       }



     


       let apiSearchValue = { health: { request }}
       queryBuilder.push(apiSearchValue);
     }

   }
}








export class GooglePlace {
  constructor(placeId, googleData ){
    // if not photo get 
    this.placeId = placeId;
    this.name = googleData.name || "";
    this.rating = googleData.rating || "";
    this.photo = googleData.photo || "";


  }
}

export class Yelpplace {
  constructor(placeId,yelpData ) {
    let name = "";
    let rating = "";

    if (Object.entries(yelpData).length > 0 && yelpData.constructor === Object){//DO empty oBJ keep consistant
      name = yelpData.name;
      rating = yelpData.rating
    }
    this.placeId = placeId;
    this.name = name;
    this.rating = rating;
  }
}

export class Healthplace {
  constructor(placeId, healthData) {
    let name;
    let recentGrade;

    if (healthData.length > 0){
      name = healthData[0].name
      recentGrade = healthData[0].grade;
    }

    this.placeId = placeId;
    this.name = name || "";
    this.recentGrade = recentGrade || "";
    this.inspectionHistory = healthData || "";
  }
}


export class AllPlaces {

  constructor(ele){

    let addressArray = ele.formatted_address.split('');
    let index = addressArray.indexOf(',');
    let address = addressArray.slice(0, index);
    address = address.join('');
;
    let photo = ele.photos != null ? ele.photos[0].getUrl() : null;
   
      this.placeId= ele.place_id;
      this.name= ele.name;
      this.address = address
      this.rating= ele.rating;
      this.photo = photo;
      this.lat= ele.geometry.location.lat();
      this.lng= ele.geometry.location.lng();
      this.marker= 'default';

  }


}
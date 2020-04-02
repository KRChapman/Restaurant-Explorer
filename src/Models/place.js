


export class GooglePlace {
  constructor(placeId, googleData,detailsObject ){
    const {reviews,url } = detailsObject;

    // if not photo get 
    this.placeId = placeId;
    this.name = googleData.name || "";
    this.rating = googleData.rating || "";
    this.photo = googleData.photo || "";
    this.address = googleData.address || "";
    this.reviewsTotal = googleData.reviewsTotal || 0;
    this.reviews = reviews;
    this.url = url;
  }
}

export class Yelpplace {
  constructor(placeId,yelpData ) {
    let name = "";
    let rating = "";
    let yelpId = "";
    let url = "";
    let reviewCount = 0;

    if (Object.entries(yelpData).length > 0 && yelpData.constructor === Object){//DO empty oBJ keep consistant
      name = yelpData.name;
      rating = yelpData.rating;
      yelpId = yelpData.id;
      url = yelpData.url;
      reviewCount = yelpData.review_count
 
    }
    this.placeId = placeId;
    this.name = name;
    this.rating = rating;
    this.yelpId = yelpId;
    this.url = url;
    this.reviewCount = reviewCount
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

    let photo = ele.photos != null ? ele.photos[0].getUrl() : null;
   
      this.placeId= ele.place_id;
      this.name= ele.name;
      this.address = address
      this.rating= ele.rating;
      this.photo = photo;
      this.lat= ele.geometry.location.lat();
      this.lng= ele.geometry.location.lng();
      this.marker= 'default';
      this.reviewsTotal = ele.user_ratings_total || 0;


  }


}


export class GeneralInfo {

  constructor(placeId, placeDetails, allplaces, yelpData) {

    const hours = placeDetails.opening_hours || null;
    const allDays = hours != null ? hours.weekday_text : ["None Available"]
    this.placeId = placeId;
    this.hours = allDays;
    this.priceLevel = yelpData.price || "";
    this.address = allplaces.address || "None Available";
    this.website = placeDetails.website || "";
    this.phoneNumber = placeDetails.formatted_phone_number || "None Available";
   



  }


}
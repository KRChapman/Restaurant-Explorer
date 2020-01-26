export class GooglePlace {
  constructor(placeId, googleData ){
    // if not photo get 
    this.placeId = placeId;
    this.name = googleData.name || "";
    this.rating = googleData.rating || "";
    this.photo = googleData.photo;


  }
}

export class Yelpplace {
  constructor(placeId,yelpData ) {
    let name = "";
    let rating = "";
    // Check for empty obj
   // debugger;
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

//const key = "displayPlaces";

export const localAdd = (key,data) => {
   

  localStorage.setItem(key, JSON.stringify(data));

}

export const localupdate = (key,setState) =>{



  let value = localStorage.getItem(key);


  if (value){
    try {
      value = JSON.parse(value);
      setState(key, value);
    } catch (e) {
      // if empty string
      setState(value);
    }
 }


}


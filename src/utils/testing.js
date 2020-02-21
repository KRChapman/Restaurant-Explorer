
const key = "displayPlaces";

export const localAdd = (data) => {
   

  localStorage.setItem(key, JSON.stringify(data));

}

export const localupdate = (setState) =>{



  let value = localStorage.getItem(key) || "[]";


  try {
    value = JSON.parse(value);
    setState(value);
  } catch (e) {
    // if empty string
    setState(value);
  }

}


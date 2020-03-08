import  { useState, useEffect, useCallback } from 'react';
import one from './../../../assets/stock/one.jpg'
import two from './../../../assets/stock/two.jpg'
import three from './../../../assets/stock/three.jpg'

import four from './../../../assets/stock/four.jpg'
import five from './../../../assets/stock/five.jpg'
import six from './../../../assets/stock/six.jpg'
import seven from './../../../assets/stock/seven.jpg'

const useStockPhotos = (googlePhoto) => {
  const [resturants, setResturant] = useState({ chosen: "", list: [seven, six, five, four, three, two, one]});

  
  useEffect(()=> {

    if (googlePhoto != null && !!googlePhoto){
     
      setResturant(prev=> {
        
        return { chosen: googlePhoto, list: prev.list }
      });
    }
    else{

      setResturant(prev => {
        

        const resturantsCopy = [...prev.list]
        const max = resturantsCopy.length;
        const index = Math.floor(Math.random() * Math.floor(max));
        const chosen = resturantsCopy[index];
        if (resturantsCopy.length > 0){
          resturantsCopy.splice(index, 1);
          return { chosen, list: resturantsCopy }
        }
        else{
          return prev
        }
    
      })
    }
  }, [googlePhoto]);

  return resturants.chosen;


}

export default useStockPhotos;
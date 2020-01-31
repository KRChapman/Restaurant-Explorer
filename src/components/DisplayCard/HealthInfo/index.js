import React from 'react';
import excelent from './../../../assets/health/excellent.png'
import good from './../../../assets/health/good.png';
import okay from './../../../assets/health/okay.png';
import improve from './../../../assets/health/improve.png';
import allRatings from './../../../assets/health/featured-image.png'
const HealthInfo = (props) => {
  const { healthPlace} = props;
  const recentGrade = healthPlace.recentGrade.toString();
  const healthImages = {'1': excelent, '2': good, '3': okay, '4': improve}
  const healthImage = healthImages[recentGrade];
  return (
    <div>
      <h5>{healthPlace.name || ""}</h5>
      <img src={healthImage} alt=""/>
      <div className="rating">{healthPlace.recentGrade}</div>
    </div>
  )
}

export default HealthInfo;
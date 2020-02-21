import React from 'react';
import excelent from './../../../assets/health/excellent.png'
import good from './../../../assets/health/good.png';
import okay from './../../../assets/health/okay.png';
import improve from './../../../assets/health/improve.png';
import allRatings from './../../../assets/health/featured-image.png'
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';



const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 60,
    width: 70,
  },
});
const HealthInfo = (props) => {
  const classes = useStyles();
  const { healthPlace} = props;
  const recentGrade = healthPlace.recentGrade.toString();
  const healthImages = {'1': excelent, '2': good, '3': okay, '4': improve}
  const healthImage = healthImages[recentGrade];
  return (
    <div>


      <CardMedia
        className={classes.media}
        image={healthImage || "na"}
        title={healthPlace.name}
      />
      <div className="rating">{healthPlace.recentGrade}</div>
    </div>
  )
}

export default HealthInfo;
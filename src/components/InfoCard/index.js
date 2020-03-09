import React from 'react';
import healthChart from './../../assets/health/featured-image.png'
import { styled } from '@material-ui/core/styles';



const HealthChartImage = styled('img')(({
  theme
}) => ({
    width: "550px",
    [theme.breakpoints.down('sm')]: {
      width: "100%",
      height: "auto",
    },
}));


const InfoCard = (props) => {

  return (
    <HealthChartImage src={healthChart} alt="HealthChartImage"/>
  )
}

export default InfoCard;
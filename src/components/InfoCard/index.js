import React from 'react';
import healthChart from './../../assets/health/featured-image.png'
import { styled } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

const HealthChartImage = styled('img')(({
  theme
}) => ({
    width: "550px",
    [theme.breakpoints.down('sm')]: {
      width: "100%",
      height: "auto",
    },
}));

const useStyles = makeStyles(theme => ({
  container:{
    width:  "550px",
    [theme.breakpoints.down('sm')]: {
      width: "100%",
      height: "auto",
    },
  },
  root:{
    marginLeft: "20px",
    marginTop: "10px",
       [theme.breakpoints.down('sm')]: {
      width: "100%",
      height: "auto",
    },
  }
}));
const InfoCard = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Typography className={classes.root} variant={'body1'} align={'left'} paragraph gutterBottom>Currently only King County health Data is available.	Next button fetches more search results from the server.
	Click a map marker for info about specific place at a location. Bellow is a chart indicating what the ratings from the health departmetn data reperesents.</Typography>
       <HealthChartImage src={healthChart} alt="HealthChartImage"/>
    </div>
   
  )
}

export default InfoCard;
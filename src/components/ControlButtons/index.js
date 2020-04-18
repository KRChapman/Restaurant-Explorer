import React from 'react';
import { cyan } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import GeneralBtn from './../shared/GeneralBtn'
import Container from '@material-ui/core/Container';
//import classes from '*.module.css';

  //  position: "fixed", 
 
  //   backgroundColor: "#fff",
  //   width: "175px",

  //   top: 95,
  //   right: 0,
  //   zIndex: 1000,
  //   opacity: 0.6,


const useStyles = {
  root: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
  },
  main: {

    margin: "150px auto",
  }

}

const ControlButtons = (props) => {
  const { classes} = props;
  return (
    <Container className={classes.root}>
      
      <GeneralBtn action={(e) => props.changeViewRange(e, 'DECREMENT')} >Back</GeneralBtn>
      <GeneralBtn action={(e) => props.changeViewRange(e, 'INCREMENT')} >Next</GeneralBtn>
    </Container>
  )
}

export default withStyles(useStyles)(ControlButtons);
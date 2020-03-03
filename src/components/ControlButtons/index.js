import React from 'react';
import { cyan } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import GeneralBtn from './../shared/GeneralBtn'


// const GeneralBtn = withStyles(theme => ({
//   root: {
//     color: theme.palette.getContrastText(theme.palette.secondary.dark),
//     backgroundColor: theme.palette.secondary.dark,
//       fontFamily: "Roboto, Helvetica, Arial, sans-serif",

//     boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
      
//     '&:hover': {
//       backgroundColor: cyan[600],
//     },
//   },
// }))(Button);
const ControlButtons = (props) => {

  return (
    <div>
      
      <GeneralBtn action={(e) => props.changeViewRange(e, 'DECREMENT')} >Back</GeneralBtn>
      <GeneralBtn action={(e) => props.changeViewRange(e, 'INCREMENT')} >Next</GeneralBtn>
    </div>
  )
}

export default ControlButtons;
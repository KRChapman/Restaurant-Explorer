import React from 'react';
import  makeStyles  from '@material-ui/core/styles/makeStyles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    // width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    // display: 'flex'

  },
  nested: {
    paddingLeft: theme.spacing(4),
    display: 'block',
  
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
   width: '310px',
 //  width: "100%",
  },
  item:{
    paddingTop:'4px',
    paddingBottom: '4px',
    paddingLeft: '2px',
    paddingRight: '2px'
    
  },
  siteLink: {
  textDecoration: "none",
   // color: '#3f9ade',
    color: theme.palette.text.secondary,
    marginRight: "5px",
  //  color: 'black',
    //theme.text.primary,
  },
  hoursText: {
    marginBottom: '8px',
  }
}));



 const GeneralInfo  = (props) => {
   const classes = useStyles();
   const [open, setOpen] = React.useState(false);

 
   const { generalInfo} = props;
   const { phoneNumber, priceLevel, address, hours,  website, } = generalInfo;

  
   const handleClick = () => {
     setOpen(!open);
   };

 
  const price = `Price: ${priceLevel}`
   const hoursDisplay = hours.map((ele,i)=> {
     return <ListItemText key={i} className={classes.hoursText} primary={hours[i]} />
   })
  return (
  

    <div className={classes.container}>
      <List
        component="ul"
        aria-labelledby="nested-list-subheader"

        className={classes.root}
      >
        <ListItem className={classes.item}>

          <ListItemText primary={phoneNumber} />
        </ListItem>
        <ListItem className={classes.item} >
          <a className={classes.siteLink} href={website} target={"_blank"}><ListItemText primary={"Menu"} />
          </a>
          <ListItemText primary={price} />
         
        </ListItem>

      </List>

      <List
        component="ul"
        aria-labelledby="nested-list-subheader"

        className={classes.root}
      >
        <ListItem className={classes.item}>

          <ListItemText primary={address} />
        </ListItem>

        <ListItem className={classes.item} button onClick={handleClick}>

          <ListItemText primary="Hours" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
  
      </List>
      <Collapse style={{ display: 'block' }} in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>

            {hoursDisplay}
     
          </ListItem>
        </List>
      </Collapse>
    </div>
  
  )
}

export default GeneralInfo

//  function l() {
//   const classes = useStyles();
//   const [open, setOpen] = React.useState(false);

//   const handleClick = () => {
//     setOpen(!open);
//   };

//   return (
//     <List
//       component="nav"
//       aria-labelledby="nested-list-subheader"
    
//       className={classes.root}
//     >
//       <ListItem >
   
//         <ListItemText primary="Sent mail" />
//       </ListItem>
//       <ListItem >
    
//         <ListItemText primary="Drafts" />
//       </ListItem>
//       <ListItem button onClick={handleClick}>

//         <ListItemText primary="Inbox" />
//         {open ? <ExpandLess /> : <ExpandMore />}
//       </ListItem>
//       <Collapse in={open} timeout="auto" unmountOnExit>
//         <List component="div" disablePadding>
//           <ListItem button className={classes.nested}>
  
//             <ListItemText primary="Starred" />
//           </ListItem>
//         </List>
//       </Collapse>
//     </List>
//   );
// }
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
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
   width: '340px',
 //  width: "100%",
  }
}));



 const GeneralInfo  = (props) => {
   const classes = useStyles();
   const [open, setOpen] = React.useState(false);

 
   const { generalInfo} = props;
   const { phoneNumber, priceLevel, address, hours,  website, } = generalInfo;
  //  const generalInfoKeys = Object.keys(generalInfo)
  //  const list = generalInfoKeys.map((ele,i)=> {
  //    const data = generalInfo[ele]
  //    return <Typography key={i} color="textPrimary" >{data}</Typography>
  //  })
   const handleClick = () => {
     setOpen(!open);
   };

 

  return (
  

    <div className={classes.container}>
      <List
        component="ul"
        aria-labelledby="nested-list-subheader"

        className={classes.root}
      >
        <ListItem >

          <ListItemText primary={phoneNumber} />
        </ListItem>
        <ListItem >

          <ListItemText primary={priceLevel} />
        </ListItem>

      </List>

      <List
        component="ul"
        aria-labelledby="nested-list-subheader"

        className={classes.root}
      >
        <ListItem >

          <ListItemText primary={address} />
        </ListItem>

        <ListItem button onClick={handleClick}>

          <ListItemText primary="Hours" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse style={{ display: 'block' }} in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>

              <ListItemText primary={hours} />
            </ListItem>
          </List>
        </Collapse>
      </List>
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
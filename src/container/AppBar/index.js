import React from 'react';
import Search from './../Search/index';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Badge from '@material-ui/core/Badge';
import InfoIcon from '@material-ui/icons/Info';
import MapIcon from '@material-ui/icons/Public';
import Container from '@material-ui/core/Container';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import MobileMenu from './../../components/MobileMenu/index'
//     margin-left: -12px;
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    padding: "2px",
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'block',
      marginLeft: "-12px",
      marginRight: 0,
      width: "64px"
      //marginRight: theme.spacing(1),
    },
   
  },
  title: {
   // width: "470px",
    [theme.breakpoints.down('sm')]: {
     
      fontSize: "1.200rem",
    },
  },
  titleContainer: {
    [theme.breakpoints.down('sm')]: {
       marginRight: '.5%',
    },
  },
  toolbar: {
    minHeight: 95,
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  optionsBtn:{
    [theme.breakpoints.down('md')]: {
      display: 'none'
    },
   
  },
  logo:{
    [theme.breakpoints.down('md')]: {
      display: 'none'
    },
  },
  details:{
    fontSize: 12,
    display: 'inline-block',
    [theme.breakpoints.down('sm')]: {
      fontSize: 9,
    },
  },
  menuIcon:{
    color: "white",
  },
  badge: {
    '& span': {
   
       top: "-3px",
    }
   
  }
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();
  const { setPlaceDataForQuery, setAllPlaces, toggleMapTheme, mapTheme} = props;

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.root}>
        <Toolbar className={classes.toolbar}>
          <EmojiTransportationIcon className={classes.logo}/>
          <Container   className={classes.menuButton} color="inherit" aria-label="menu">
            <MobileMenu >
              <MenuIcon className={classes.menuIcon} />
            </MobileMenu >
          </Container>
     
          <div className={classes.titleContainer}>
        <Typography className={classes.title} variant="h4" >
            Restaurant Explorer
    
          </Typography>
            <Typography className={classes.details} variant="subtitle2" >
            Google Ratings, Yelp Ratings and King County Health Department Data
          </Typography>
          </div>
      
         
       
          < Search setPlaceDataForQuery={setPlaceDataForQuery} setAllPlaces={setAllPlaces}/>
          <div className={classes.optionsBtn}>
            <IconButton onClick={toggleMapTheme} title="Map" color="inherit">
              <Badge badgeContent={mapTheme} className={classes.badge} color="secondary">
                <MapIcon />
              </Badge>
            </IconButton>
            <IconButton title="information" aria-label="show 4 new mails" color="inherit">
           
                <InfoIcon />
           
            </IconButton>
            
           
          </div>
         
        </Toolbar>
      </AppBar>
    </div>
  );
}


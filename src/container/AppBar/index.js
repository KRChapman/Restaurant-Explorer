import React from 'react';
import Search from './../Search/index';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import ThreeSixtyIcon from '@material-ui/icons/ThreeSixty';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'block',
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
  }
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();
  const { setPlaceDataForQuery, setAllPlaces} = props;
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.root}>
        <Toolbar className={classes.toolbar}>
          <EmojiTransportationIcon className={classes.logo}/>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
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
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <Button color="inherit" className={'temp'}>Login</Button>
          </div>
         
        </Toolbar>
      </AppBar>
    </div>
  );
}


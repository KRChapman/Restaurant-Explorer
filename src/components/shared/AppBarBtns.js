import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import MapIcon from '@material-ui/icons/Public';
import React from 'react';
import InfoCard from './../../components/InfoCard/index';
import InfoIcon from '@material-ui/icons/Info';

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
  optionsBtn: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    },

  },
  logo: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    },
  },
  details: {
    fontSize: 12,
    display: 'inline-block',
    [theme.breakpoints.down('sm')]: {
      fontSize: 9,
    },
  },
  menuIcon: {
    color: "white",
  },
  badge: {
    '& span': {

      top: "-3px",
    }

  }
}));

export const MapTheme = (props) => {
  const classes = useStyles();
  const { toggleMapTheme, badgeContent } = props;
  return (
    <IconButton onClick={toggleMapTheme} title="Map" color="inherit">
      <Badge badgeContent={badgeContent} className={classes.badge} color="secondary">
        <MapIcon />
      </Badge>
    </IconButton>
  )
}

export const InfoCardBtn = (props) => {
  const classes = useStyles();
  const { toggleInfoCard } = props;
  return (

    <IconButton onClick={toggleInfoCard} title="information" aria-label="show 4 new mails" color="inherit">

      <InfoIcon />

    </IconButton>
  )
}

import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import MapIcon from '@material-ui/icons/Public';
import React from 'react';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles(theme => ({

  badge: {
    '& span': {

      top: "-3px",
      backgroundColor: theme.palette.secondary.switch,
    }

  }
}));

export const MapTheme = (props) => {
  const classes = useStyles();
  const { toggleMapTheme, badgeContent } = props;
  return (
    <IconButton onClick={toggleMapTheme} title="Map" color="inherit">
      <Badge badgeContent={badgeContent} className={classes.badge} >
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

import React, { useEffect, useState}from 'react';
import  makeStyles  from '@material-ui/core/styles/makeStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  
  typography: {
    padding: theme.spacing(2),
  },
}));


export function WarnPopover({ anchorEl, setanchorEl, warningText, children}) {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    setanchorEl(null);
  };

  useEffect(()=> {
    const open  = Boolean(anchorEl)
    setIsOpen(open);
  }, [setIsOpen, anchorEl])

  const id = isOpen ? 'simple-popover' : undefined;
 // debugger;
  const text = warningText == null ? null : <Typography className={classes.typography}>{warningText}</Typography>
  return (
      <Popover
        id={id}
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
     
      {children}
      {text}
      </Popover>
 
  );
}


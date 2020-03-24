import React from 'react';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';      
import Card from '@material-ui/core/Card'; 
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    cursor: "default",
    padding: "10px",
    paddingBottom: "0px",

  },
  content: {

    padding: "5px",
    "&:last-child": {
      paddingBottom: "0px",
    },

  },
  media: {
    height: 140,
  },

  container: {
    marginTop: "15px",
    marginBottom: "15px",
  },

  date: {
    marginLeft: "10px",
  }
});

export const Link = (props) => {
  const { children, url, isDesktop} = props;

  const target = isDesktop ? "_blank" : "";
  return (
    <Button href={url} target={target} variant="outlined" color="primary" size="small">
      {children}
</Button>
  )
}




export const Reviews = (props) => {
  const { action, reviewCount} = props;
  return (
    <Button onClick={action} variant="outlined" color="primary" size="small">Reviews ({reviewCount})</Button  >
  )
}



 export const ReviewContainer = (props) => {
   const classes = useStyles();
   const {children,title} = props;
  return (
    
    <Card className={classes.root}>

      <Typography align={'center'} variant="h6" color="textSecondary" component="h6">
        
        {title}
        </Typography>
      <CardContent className={classes.content}>
        {children}
      </CardContent>

    </Card>
 
  )
}



 
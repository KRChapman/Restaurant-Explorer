
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import RatingImages from './RatingImages';
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

  container:{
  marginTop: "15px",
    marginBottom: "15px",
  },

  date: {
    marginLeft: "10px",
  }
});

export default function MediaCard(props) {
  const classes = useStyles();
  const { reviews } = props;
 // debugger;
   const displayReviews = reviews.map((ele,i)=> {
     return(
       <div key={ele.id} className={classes.container}>
         <RatingImages rating={ele.rating} /><span className={classes.date}>{ele.time_created}</span>
         <Typography variant="body2" color="textPrimary" component="p">
           {ele.text}
          </Typography>
          <a href={ele.url}>full review</a>
       </div>
     
     )
  })  
  return (
    <Card className={classes.root}>
    
      <Typography align={'center'} variant="h6" color="textSecondary" component="h6">
          Revew Excerpts
        </Typography>
        <CardContent className={classes.content}>
          {displayReviews}
        </CardContent>

    </Card>
  );
}

//  <CardActionArea>

// const ReviewsDisplay = (props) => {
//   const {reviews} = props;
//  const displayReviews = reviews.map((ele,i)=> {
//    return <span><p key={ele.id}>{ele.text}</p><a href={ele.url}>A</a></span>
//   })  
//   return (
//     <div>
//       {displayReviews} 
//     </div>
//   )
// }

// export default ReviewsDisplay;


{/* <CardActions>
  <Button size="small" color="primary">
    Share
        </Button>
  <Button size="small" color="primary">
    Learn More
        </Button>
</CardActions> */}
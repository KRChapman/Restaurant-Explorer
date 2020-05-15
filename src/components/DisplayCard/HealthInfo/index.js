import React, {useState} from 'react';
import excelent from './../../../assets/health/excellent.png'
import good from './../../../assets/health/good.png';
import okay from './../../../assets/health/okay.png';
import improve from './../../../assets/health/improve.png';
import allRatings from './../../../assets/health/featured-image.png'
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';

import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { WarnPopover} from './../../PopOver/index'
import InspectionsTable from './../../InspectionsTable/index'
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 40,
    width: 50,
  },
});
const HealthInfo = (props) => {
  const classes = useStyles();
  const  [anchorEl, setanchorEl] = useState(null);
  const { healthPlace} = props;
  const recentGrade = healthPlace.recentGrade.toString();
  const healthImages = {'1': excelent, '2': good, '3': okay, '4': improve}
  const healthImage = healthImages[recentGrade];

  const handlePopTable = (e) => {
    setanchorEl(e.currentTarget);
  }
  const isImage = !!healthImage
  return (
    
      <div className='health-container'>
   
        <div>Health Department Rating</div>
        
        <div className="health-data-container">
        {isImage ? <CardMedia
          className={classes.media}
          image={healthImage || "na"}
          title={healthPlace.name}
        /> :null} 
      

          
          <CardActions>
          {isImage ? null : <div>Not Available</div>} 
       
          <Button onClick={handlePopTable} size="small" color="secondary"  variant="outlined">
                Inspections
            </Button>
              
              <WarnPopover setanchorEl={setanchorEl} anchorEl={anchorEl}><InspectionsTable tableData={healthPlace.inspectionHistory}/></WarnPopover>
          </CardActions>
          </div>
    </div>

    


 
  )
}

export default HealthInfo;
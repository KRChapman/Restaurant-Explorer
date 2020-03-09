import React from 'react';
import Button from '@material-ui/core/Button';

export const Link = (props) => {
  const {children,url} = props;
  return (
    <Button variant="outlined" color="primary" size="small" href={url}>
      {children}
</Button>
  )
}




export const Reviews = (props) => {

  return (
    <Button variant="outlined" color="primary" size="small">Reviews (234)</Button  >
  )
}

export default Reviews;

 
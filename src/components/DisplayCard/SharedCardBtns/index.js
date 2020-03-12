import React from 'react';
import Button from '@material-ui/core/Button';

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

export default Reviews;

 
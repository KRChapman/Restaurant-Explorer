import React from 'react';

const ControlButtons = (props) => {

  return (
    <div>
      
      <button onClick={(e) => props.changeViewRange(e, 'DECREMENT')}>Back</button>
      <button onClick={(e) => props.changeViewRange(e, 'INCREMENT')}>Forward</button>
    </div>
  )
}

export default ControlButtons;
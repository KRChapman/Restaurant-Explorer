import React from 'react';
import InputBase from '@material-ui/core/InputBase';

const Subject = (props) => {
// RETURN THE COMPONENT PASSED IN with props and onchange
  return (
    <form action="/" method="get" onSubmit={props.handleSearch}>
      <InputBase type="text" onChange={props.handleChange} />
      <button>Search</button>
    </form>
  )
}

export default Subject;
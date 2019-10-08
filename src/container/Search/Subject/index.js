import React from 'react';

const Subject = (props) => {

  return (
    <form action="/" method="get" onSubmit={props.handleSearch}>
      <input type="text" onChange={props.handleChange} />
      <button>Search</button>
    </form>
  )
}

export default Subject;
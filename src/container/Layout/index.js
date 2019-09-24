import React, { Component } from 'react';
import Search from './../Search/index';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <div>
        <Search/>
      </div>
     )
  }
}
 
export default Layout;
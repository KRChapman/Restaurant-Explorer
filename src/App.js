import React from 'react';
import logo from './logo.svg';
//import './App.css';
import './style/App.scss'
import Layout from './container/Layout/index';

function App() {
  return (
    <div className="App">
      <Layout />
      <div style={{ width: 50, height: 50 }} id="map"></div>
    </div>
  );
}

export default App;

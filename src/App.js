import React from 'react';
import logo from './logo.svg';
//import './App.css';
import './style/App.scss'
import Layout from './container/Layout/index';

import { createMuiTheme, ThemeProvider}  from '@material-ui/core/styles';
//import { MultiThemeProvider } from '@material-ui/core';
//import ThemeProvider from '@material-ui/core/styles/ThemeProvider ';
import { deepPurple,indigo, teal } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
   primary: indigo,
    //secondary: teal
    secondary: {
      main: "#00cae4",
   //   main: "#7F5AC7"
     dark: "#4C1CAA",
     // main: "#3087A8"


    //  main2: "#653BB5",
  //    main: "#68fbd0",
   //   main: "#8532ae",
    //  main: "#FFA441",
      //main: "#FFC841",
     // main: "#7bb6b3",
   //   try: "#80DEEA",
      // sec: "#03DAC5",
     // main: "#3f8cb5",
      // purp: "#683FB5"
    }
  },
});
function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Layout />
      </ThemeProvider>
    
      
    </div>
  );
}

export default App;

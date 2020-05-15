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
      main:"#653BB5",
     // main: "#00cae4",
   //   main: "#7F5AC7"
     dark: "#4C1CAA",
     // main: "#3087A8"
      label: "#acaeb0",
      // #ffffff
      background: "#e9e8ee",
      switch: "#00cae4"
      ,
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
    },
    // type: 'dark'
    text: {
      //white: "#3f8cb5"
     // primary: "#acaeb0",
      secondary: "#653BB5"
      //"#653BB5"
    }
  },
});


const theme2 = createMuiTheme({
  palette: {
    primary: {
      main: '#2e2e3d',

      secondary: "#7F5AC7",
    },
    //secondary: teal
    secondary: {
      main: "#acaeb0",
      //   main: "#7F5AC7"
      dark: "#5d6974",
      // main: "#3087A8"
      background: "#1A1A1B",
      label: "#acaeb0",
      switch: "#5d6974",
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
    },
   type: 'dark',

    text:{
      primary: '#ffffff',
      secondary: "#acaeb0",
     // white: '#FFA441'
    }
  },
});
console.log(theme);
function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme2}>
        <Layout />
      </ThemeProvider>
    
      
    </div>
  );
}

export default App;

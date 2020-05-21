import React, { useState } from 'react';
import logo from './logo.svg';
//import './App.css';
import './style/App.scss'
import Layout from './container/Layout/index';

import { createMuiTheme, ThemeProvider}  from '@material-ui/core/styles';
import makeStyles from '@material-ui/core/styles/makeStyles';
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



const useStyles = makeStyles({
  base: {
      textAlign: "center",

  minHeight: "100vh",
  //background-color: #1A1A1B;
  //height: 100%;
//background-color: #e9e8ee;
  fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    backgroundColor: props => props.backgroundColor,
  },
  // secondStyle: {
  //   color: props => props.color,
  // },
});

console.log(theme);
function App() {
  
  const [currentTheme, setCurrentTheme] = useState({theme:theme});
  const themes = { 'light': theme, 'dark': theme2}
  const classes = useStyles({ backgroundColor: currentTheme.theme.palette.secondary.background});
  const toggleTheme = (theme)=> {
    setCurrentTheme({ theme: themes[theme]});
  }
  return (
   
    <div className={`App ${classes.base}`}>
      <ThemeProvider theme={currentTheme.theme}>
        <Layout toggleTheme={toggleTheme} styleName={currentTheme.name}/>
   
    
      </ThemeProvider >
    </div>
     
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import { ThemeProvider, injectGlobal } from 'styled-components';

injectGlobal`
  @font-face {
    font-family: 'Bellfair', serif;
    src: url('https://fonts.googleapis.com/css?family=Bellfair');
  }

  html * {
    font-family: 'Bellefair' !important;
  }
  
  .icon {
    font-family: Icons !important;
  }
`

const theme = {
  fg: 'white',
  bg: 'black',
}

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
registerServiceWorker();

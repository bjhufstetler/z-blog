import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ContextProvider } from './context'

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


/* 
rgba(10, 9, 8, 1) - black
rgba(34, 51, 59, 1) - blue
rgba(234, 224, 213, 1) - light
rgba(198, 172, 143, 1) - med
rgba(94, 80, 63, 1) - dark
*/
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Bar } from './components';
//import config from './config'
//const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

function App() {
  return (
    <>
      <Bar />
      <Routes>
        <Route path='/' element={<Bar />} />
      </Routes>
    </>
  );
}

export default App;

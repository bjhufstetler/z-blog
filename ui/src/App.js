import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Bar } from './components';

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

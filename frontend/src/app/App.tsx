import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import MainContainer from '../views/MainContainer';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <MainContainer />
    </BrowserRouter>
  );
}

export default App;

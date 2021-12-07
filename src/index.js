import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import MovieContextProvider from './component/context/MovieContextProvider';
import UserContextProvider from './component/context/UserContextProvider';

ReactDOM.render(
  <BrowserRouter>
    <UserContextProvider>
      <MovieContextProvider>
        <App />
      </MovieContextProvider>
    </UserContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

import React, { useState } from "react";
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from './styles/global-styles';
import HomePage  from './pages/Hompage';
import '../../../css/app.css'
import '../../../css/styleFX.css'

export interface IUser {
    name: string;
    age: number;
}
const App = () => {
  React.useEffect(() => {
    setTimeout(() => {
      document.body.className = '';
    }, 600);
  }, []);

    return (

      <div id="App">
        <HomePage/>
      </div>

    );
};

export default App;
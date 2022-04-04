import React, { useState } from "react";
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from './styles/global-styles';
import HomePage  from './pages/Hompage';
import '../../../css/app.css'
import '../../../css/styleFX.css'
import { useDispatch, useSelector } from 'react-redux'
import { depositMoney, withdrawtMoney, bankrupt, artActive, artDeactive } from './state/actions/index';
import { bindActionCreators } from "redux";
import { actions, State } from "./state";

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
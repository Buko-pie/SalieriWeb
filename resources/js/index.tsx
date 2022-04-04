import React from "react";
import * as ReactDOM from 'react-dom';
import { render } from "react-dom";
import App from "./components/App/index";
import { Provider } from "react-redux"
import { store } from "./components/App/state"

const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
, MOUNT_NODE);
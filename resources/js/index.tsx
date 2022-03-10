import React from "react";
import * as ReactDOM from 'react-dom';
import { render } from "react-dom";
import App from "./components/App/index";

const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(<App />, MOUNT_NODE);
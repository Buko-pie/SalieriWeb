import React from "react";
import { render } from "react-dom";
import App from "./components/App";

const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(<App />, MOUNT_NODE);
require('./components/Example');

import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/pages/App";
import * as serviceWorker from "./serviceWorker";
import "./styles/index.css";
import { HashRouter, Route } from "react-router-dom";

ReactDOM.render(
  <HashRouter>
    <Route exact path="/" component={App} />
  </HashRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

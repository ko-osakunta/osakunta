/* import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js"; */
import "./onepage/css/style.css"
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import RouteComponent from "./RouteComponent";
import registerServiceWorker from "./registerServiceWorker";
import store from './store'
import { BrowserRouter as Router, Route } from 'react-router-dom'

ReactDOM.render(
  <Provider store={store}>
      <RouteComponent />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
/* import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js"; */
import "./assets/css/styles.css"
import './assets/bootstrap/css/bootstrap.min.css'
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import RouteComponent from "./RouteComponent";
import registerServiceWorker from "./registerServiceWorker";
import store from './store'

ReactDOM.render(
  <Provider store={store}>
      <RouteComponent />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();

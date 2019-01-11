import "./assets/css/styles.css"
import './assets/bootstrap/css/bootstrap.min.css'
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { ConnectedRouter } from "connected-react-router"
import App from "./App"
import registerServiceWorker from "./registerServiceWorker"
import store, { history } from './store'

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById("root")
)

registerServiceWorker()

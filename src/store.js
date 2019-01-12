import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import topImageReducer from './reducers/topImageReducer'
import topNavReducer from './reducers/topNavReducer'
import pagesReducer from './reducers/pagesReducer'
import keyReducer from './reducers/keyReducer'
import contactReducer from './reducers/contactReducer'
import pageReducer from './reducers/pageReducer'
import authReducer from './reducers/authReducer'
import galleryReducer from './reducers/galleryReducer'
import bannerReducer from './reducers/bannerReducer'

const createReducer = history => combineReducers({
    router: connectRouter(history),
    topImage: topImageReducer,
    topNav: topNavReducer,
    pages: pagesReducer,
    pageKey: keyReducer,
    contact: contactReducer,
    page: pageReducer,
    auth: authReducer,
    images: galleryReducer,
    banners: bannerReducer
})

export const history = createBrowserHistory()

const store = createStore(
    createReducer(history),
    composeWithDevTools(
        applyMiddleware(
            routerMiddleware(history),
            thunk
        )
    )
)

export default store

import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import topImageReducer from './reducers/topImageReducer'
import topNavReducer from './reducers/topNavReducer'
import pagesReducer from './reducers/pagesReducer'
import keyReducer from './reducers/keyReducer'
import contactReducer from './reducers/contactReducer'
import pageReducer from './reducers/pageReducer'
import authReducer from './reducers/authReducer'
import galleryReducer from './reducers/galleryReducer'
import bannerReducer from './reducers/bannerReducer'

const reducer = combineReducers({
    topImage: topImageReducer,
    topNav: topNavReducer,
    pages: pagesReducer,
    pageKey: keyReducer,
    contact: contactReducer,
    page: pageReducer,
    auth: authReducer,
    images: galleryReducer,
    banner: bannerReducer
})

const store = createStore(
    reducer, composeWithDevTools(applyMiddleware(thunk))
)

export default store

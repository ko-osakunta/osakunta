import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import topImageReducer from './reducers/topImageReducer'
import topNavReducer from './reducers/topNavReducer'
import pagesReducer from './reducers/pagesReducer';
import keyReducer from './reducers/keyReducer';
import contactReducer from './reducers/contactReducer';
import pageReducer from './reducers/pageReducer';

const reducer = combineReducers({
    topImage: topImageReducer,
    topNav: topNavReducer,
    pages: pagesReducer,
    pageKey: keyReducer,
    contact: contactReducer,
    page: pageReducer
})

const store = createStore(
    reducer, composeWithDevTools(applyMiddleware(thunk))
)

export default store
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import pageTextReducer from './reducers/pageTextReducer'
import topImageReducer from './reducers/topImageReducer'
import topNavReducer from './reducers/topNavReducer'
import pagesReducer from './reducers/pagesReducer';
import keyReducer from './reducers/keyReducer';

const reducer = combineReducers({
    pageText: pageTextReducer,
    topImage: topImageReducer,
    topNav: topNavReducer,
    pages: pagesReducer,
    pageKey: keyReducer
})

const store = createStore(
    reducer, composeWithDevTools(applyMiddleware(thunk))
)

export default store
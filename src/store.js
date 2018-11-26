import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import pageReducer from './reducers/pageReducer'
import topImageReducer from './reducers/topImageReducer'
import topNavReducer from './reducers/topNavReducer'
import pagesReducer from './reducers/pagesReducer';

const reducer = combineReducers({
    page: pageReducer,
    topImage: topImageReducer,
    topNav: topNavReducer,
    pages: pagesReducer
})

const store = createStore(
    reducer, composeWithDevTools(applyMiddleware(thunk))
)

export default store
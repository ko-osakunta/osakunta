import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import textReducer from './reducers/textReducer'
import topImageReducer from './reducers/topImageReducer'
import topNavReducer from './reducers/topNavReducer'

const reducer = combineReducers({
    text: textReducer,
    topImage: topImageReducer,
    topNav: topNavReducer
})

const store = createStore(
    reducer, composeWithDevTools(applyMiddleware(thunk))
)

export default store
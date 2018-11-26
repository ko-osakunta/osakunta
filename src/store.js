import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import pageReducer from './reducers/pageReducer'
import topImageReducer from './reducers/topImageReducer'
import topNavReducer from './reducers/topNavReducer'
import pagesReducer from './reducers/pagesReducer';
import keyReducer from './reducers/keyReducer';
import editorStateReducer from './reducers/editorStateReducer';

const reducer = combineReducers({
    page: pageReducer,
    topImage: topImageReducer,
    topNav: topNavReducer,
    pages: pagesReducer,
    key: keyReducer,
    editorState: editorStateReducer
})

const store = createStore(
    reducer, composeWithDevTools(applyMiddleware(thunk))
)

export default store
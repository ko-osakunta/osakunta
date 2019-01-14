import { FETCH_IMAGES } from '../actions/types'

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_IMAGES:
            return action.payload
        default:
            return state
    }
}


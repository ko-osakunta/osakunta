import { FETCH_ANNOUNCEMENTS } from "../actions/types"

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_ANNOUNCEMENTS:
            return action.payload
        default:
            return state
    }
}

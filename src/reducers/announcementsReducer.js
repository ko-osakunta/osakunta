import { FETCH_ANNOUNCEMENTS } from "../actions/types"

export default (state = false, action) => {
    switch (action.type) {
        case FETCH_ANNOUNCEMENTS:
            return action.payload || null
        default:
            return state
    }
};
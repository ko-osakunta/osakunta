import { FETCH_BANNERS } from "../actions/types"

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_BANNERS:
            return action.payload
        default:
            return state
    }
}

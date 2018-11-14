import { FETCH_TOPIMAGE } from "../actions/types";

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_TOPIMAGE:
            return action.payload;
        default:
            return state;
    }
};
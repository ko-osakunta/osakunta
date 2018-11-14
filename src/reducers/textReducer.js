import { FETCH_TODOS, FETCH_HOMETEXT } from "../actions/types";

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_HOMETEXT:
            return action.payload;
        default:
            return state;
    }
};
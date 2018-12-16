import { FETCH_PAGE_BY_PATH } from "../actions/types";

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_PAGE_BY_PATH:
            return action.payload;
        default:
            return state;
    }
};
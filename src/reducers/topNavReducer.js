import { FETCH_TOPNAV } from "../actions/types";

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_TOPNAV:
            return action.payload;
        default:
            return state;
    }
};

import { FETCH_BANNER_IMAGES } from "../actions/types";

export default (state = false, action) => {
  switch (action.type) {
    case FETCH_BANNER_IMAGES:
      return action.payload
    default:
      return state;
  }
};
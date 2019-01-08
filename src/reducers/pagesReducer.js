import { FETCH_PAGES } from "../actions/types"
import ImageGallery from "../components/pagetypes/ImageGallery"

const local = [
    {
        component: ImageGallery,
        path: "/gallery",
        title: "Galleria"
    }
]

export default (state = { local, remote: [] }, action) => {
    switch (action.type) {
        case FETCH_PAGES:
            return { local: state.local, remote: action.payload }
        default:
            return state
    }
}

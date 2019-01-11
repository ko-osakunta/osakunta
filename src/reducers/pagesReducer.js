import { FETCH_PAGES } from "../actions/types"
import ImageGallery from "../components/pagetypes/ImageGallery"
import Admin from "../components/admin/Admin"
import Login from "../components/pagetypes/Login"
import requireAuth from "../components/helpers/requireAuth"

const local = [
    {
        component: ImageGallery,
        path: "/gallery",
        title: "Galleria"
    },
    {
        component: requireAuth(Admin),
        path: "/admin",
        title: "Admin"
    },
    {
        component: Login,
        path: "/login",
        title: "Kirjautuminen"
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

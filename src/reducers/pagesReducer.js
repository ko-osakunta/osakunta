import { FETCH_PAGES } from "../actions/types"
import ImageGallery from "../components/pagetypes/ImageGallery"
import Admin from "../components/admin/Admin"
import Login from "../components/pagetypes/Login"
import AdminCreatedPage from "../components/pagetypes/AdminCreatedPage"
import requireAuth from "../components/helpers/requireAuth"

const local = [
    {
        Component: ImageGallery,
        path: "/gallery",
        title: "Galleria"
    },
    {
        Component: requireAuth(Admin),
        path: "/admin",
        title: "Admin"
    },
    {
        Component: Login,
        path: "/login",
        title: "Kirjautuminen"
    }
]

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_PAGES:
            //console.log(action.payload)
            return action.payload
                .map(({ type, ...rest }) =>
                    ({ Component: AdminCreatedPage, ...rest }))
                .concat(local)
        default:
            return state
    }
}

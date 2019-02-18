import { FETCH_PAGES } from "../actions/types"
import ImageGallery from "../components/pagetypes/ImageGallery"
import Admin from "../components/admin/Admin"
import Login from "../components/pagetypes/Login"
import AdminCreatedPage from "../components/pagetypes/AdminCreatedPage"
import Announcements from "../components/pagetypes/Announcements"
import requireAuth from "../components/helpers/requireAuth"

const local = [
    {
        Component: Announcements,
        path: "/announcements",
        title: "Tiedotteita"
    },
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
            return action.payload
                .map(({ type, ...rest }) =>
                    ({ Component: AdminCreatedPage, ...rest }))
                .concat(local)
        default:
            return state
    }
}

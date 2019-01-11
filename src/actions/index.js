import { database, storage, firebaseAuth, googleProvider } from '../config/firebase'
import * as types from "./types"


export const fetchUser = () => dispatch => {
    firebaseAuth.onAuthStateChanged(user => {
        if (user) {
            dispatch({
                type: types.FETCH_USER,
                payload: user
            })
        } else {
            dispatch({
                type: types.FETCH_USER,
                payload: null
            })
        }
    })
}


export const createNewPage = (pagePath, value) => (dispatch, getState) => {
    const { pages } = getState()

    const pathUsed = pages
        .filter(({ path }) => path === pagePath)
        .length !== 0

    if (pathUsed) {
        throw "Sivu on jo olemassa tällä polulla!"
    }

    const titleUsed = pages
        .filter(({ title }) => title === value.toLowerCase())
        .length !== 0

    if (titleUsed) {
        throw "Sivu on jo olemassa tällä nimellä"
    }

    database.ref('pages').push().set({
        path: pagePath,
        text: "{\"blocks\":[{\"key\":\"2onp9\",\"text\":\"Uusi sivu luotu! Adminina voit muokata sitä oheisesta lomakkeesta.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
        title: value,
        deletable: true,
        type: 'adminCreated'
    })
}

export const fetchTopImage = (image) => dispatch => {
    storage.ref()
        .child(`${image}`)
        .getDownloadURL()
        .then((url) => {
            dispatch({
                type: types.FETCH_TOPIMAGE,
                payload: url
            })
        })
}

export const fetchBannerImages = (image) => dispatch => {
    storage.ref()
        .child(`banner/${image}`)
        .getDownloadURL()
        .then((url) => {
            dispatch({
                type: types.FETCH_BANNER_IMAGES,
                payload: url
            })
        })
}


export const fetchPages = () => dispatch => {
    database.ref('pages')
        .on('value', snapshot => {
            const pages = Object.entries(snapshot.val())
                .map(([, page]) => page)
            dispatch({
                type: types.FETCH_PAGES,
                payload: pages
            })
        })
}

export const fetchContact = () => dispatch => {
    database.ref('contact')
        .once('value')
        .then(snapshot => {
            dispatch({
                type: types.FETCH_CONTACT,
                payload: snapshot.val()
            })
        })
}

export const fetchPageTextByPath = (path) => dispatch => {
    database.ref('pages')
        .orderByChild('path')
        .equalTo(`${path}`)
        .once('value')
        .then(snapshot => {
            let data = null
            snapshot.forEach(snap => {
                data = snap.child('text').val()
            })
            dispatch({
                type: types.FETCH_PAGE_TEXT_BY_PATH,
                payload: data
            })
        })
}

export const fetchPageByPath = path => (dispatch, getState) => {
    const pages = getState().pages
    const page = pages.filter(page => page.path === path)[0]
    dispatch({
        type: types.FETCH_PAGE_BY_PATH,
        payload: page
    })
}

export const fetchPageTextByTitle = (page) => dispatch => {
    database.ref('pages')
        .orderByChild('page')
        .equalTo(`${page}`)
        .once('value')
        .then(snapshot => {
            let data = null
            snapshot.forEach(snap => {
                data = snap.child('text').val()
            })
            dispatch({
                type: types.FETCH_PAGE_TEXT_BY_TITLE,
                payload: data
            })
        })
}

export const fetchKeyByPath = (path) => dispatch => {
    database.ref('pages')
        .orderByChild('path')
        .equalTo(`${path}`)
        .once('value')
        .then(snapshot => {
            let key = ''
            snapshot.forEach(snap => {
                key = Object.keys(snapshot.val())[0]
            })
            dispatch({
                type: types.FETCH_KEY_BY_PATH,
                payload: key
            })
        })
}

export const removePageByKey = (pageKey) => () => {
    database.ref('/pages').child(`${pageKey}`).remove()
}
//currently the same as pages.. might have different functionality in the future
/*export const fetchTopNav = () => dispatch => {
    database.ref('pages')
        .once('value')
        .then(snapshot => {
            const pages = Object.entries(snapshot.val())
                .map(([, page]) => page)
            dispatch({
                type: types.FETCH_TOPNAV,
                payload: pages
            })
        })
}*/

export const fetchImages = () => dispatch => {
    dispatch({
        type: types.FETCH_IMAGES
    })
}

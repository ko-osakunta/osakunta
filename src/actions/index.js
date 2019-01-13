import { database, storage, firebaseAuth } from '../config/firebase'
import * as types from "./types"


export const fetchUser = () => dispatch => {
    firebaseAuth.onAuthStateChanged(user => {
        dispatch({
            type: types.FETCH_USER,
            payload: user ? user : null
        })
    })
}


export const createNewPage = (pagePath, value) => (dispatch, getState) => {
    const { pages } = getState()

    const pathUsed = pages
        .filter(({ path }) => path === pagePath)
        .length !== 0

    if (pathUsed) {
        throw new Error("Sivu on jo olemassa tällä polulla!")
    }

    const titleUsed = pages
        .filter(({ title }) => title === value.toLowerCase())
        .length !== 0

    if (titleUsed) {
        throw new Error("Sivu on jo olemassa tällä nimellä")
    }

    database.ref('pages').push().set({
        path: pagePath,
        text: JSON.stringify({
            blocks: [{
                key: "2onp9",
                text: "Uusi sivu luotu! Adminina voit muokata sitä oheisesta lomakkeesta.",
                type: "unstyled",
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
            }],
            entityMap: {}
        }),
        title: value,
        deletable: true,
        type: 'adminCreated'
    })
}

//Old banner, remove when safe
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

export const uploadBanner = (image) => dispatch => {
    const uploadTask = storage.ref(`banners/${image.name}`).put(image)
    uploadTask.on('state_changed', snapshot => {
        console.log("Kuvaa ladataan..")
    }, error => {
        console.log(error)
    }, () => {
        storage.ref('banners').child(image.name).getDownloadURL().then(url => {
            uploadBannerToDatabase(image.name, url)
        })
    })
}

export const uploadBannerToDatabase = (imageName, imageUrl) => {
    database.ref('banners').push().set({
        name: imageName,
        url: imageUrl
    })
}



export const fetchBanners = () => dispatch => {
    database.ref('banners')
        .on('value', snapshot => {
            const banners = Object.entries(snapshot.val())
                .map(([, banner]) => banner)

            dispatch({
                type: types.FETCH_BANNERS,
                payload: banners
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

export const fetchImages = () => dispatch => {
    dispatch({
        type: types.FETCH_IMAGES
    })
}

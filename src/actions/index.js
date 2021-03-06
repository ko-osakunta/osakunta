import { database, storage, firebaseAuth } from '../config/firebase'
import axios from 'axios'
import * as types from "./types"
import convertToRaw from 'draft-js'

export const fetchUser = () => dispatch => {
    firebaseAuth.onAuthStateChanged(user => {
        dispatch({
            type: types.FETCH_USER,
            payload: user ? user : null
        })
    })
}


export const createNewPage = (pagePath, newTitle, pageText) => (dispatch, getState) => {
    const { pages } = getState()

    const titleUsed = pages
        .filter(({ title }) => title === newTitle.toLowerCase())
        .length !== 0

    if (titleUsed) {
        throw new Error("Sivu on jo olemassa tällä nimellä")
    }

    const pathUsed = pages
        .filter(({ path }) => path === pagePath)
        .length !== 0

    if (pathUsed) {
        throw new Error("Sivu on jo olemassa tällä polulla!")
    }

    database.ref('pages').push().set({
        path: pagePath,
        text: pageText,
        title: newTitle,
        deletable: true,
        type: 'adminCreated',
        dateCreated: Date.now(),
        dateUpdated: Date.now()
    })
}

export const updateContent = (updatePath, pageText) => {
    let updates = {}
    updates[updatePath + '/text'] = pageText
    updates[updatePath + '/dateUpdated'] = Date.now()
    database.ref().update(updates)
}

export const createNewAnnouncement = (title, announcementText) => dispatch => {
    console.log(title)
    console.log(announcementText)
    database.ref('announcements').push().set({
        title: title,
        text: announcementText,
        dateCreated: Date.now(),
        dateUpdated: Date.now()
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
            uploadBannerToDb(url)
        })
    })
    alert("Banneri lisätty!")
}

export const uploadBannerToDb = url => {
    database.ref('banners').push().set({ url })
}

export const deleteBannerFromDb = key => {
    database.ref('banners').child(key).remove()
}

export const fetchBanners = () => dispatch => {
    database.ref('banners')
        .on('value', snapshot => {
            const banners = snapshot.val()
                ? Object.entries(snapshot.val()).map(([key, value]) => ({ key, ...value }))
                : []

            dispatch({
                type: types.FETCH_BANNERS,
                payload: banners
            })
        })
}

export const uploadImage = (image) => () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image)
    uploadTask.on('state_changed',
        snapshot => {
            console.log("Kuvaa ladataan..")
        }, error => {
            console.log(error)
        }, () => {
            storage.ref('images')
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    uploadImageToDatabase(image.name, url)
                })
        })
}

const uploadImageToDatabase = (name, url) => {
    database.ref('images').push().set({ name, url })
}

export const fetchImages = () => async dispatch => {
    const res = await axios.get('https://api.flickr.com/services/rest/', {
        params: {
            method: 'flickr.groups.pools.getPhotos',
            group_id: '1597656@N20',
            api_key: 'c5936e9f91f3c63e55e30d1d2ee372fb',
            per_page: 500,
            page: 1,
            format: 'json',
            nojsoncallback: 1
        }
    })

    const flickrUrls = res.data.photos.photo
        .map(({ farm, server, id, secret }) =>
            `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_b.jpg`
        )

    database.ref('images')
        .on('value', snapshot => {
            const dbUrls = snapshot.val()
                ? Object.values(snapshot.val()).map(({ url }) => url)
                : []

            dispatch({
                type: types.FETCH_IMAGES,
                payload: [...dbUrls, ...flickrUrls.slice(0, 20)]
            })
        })
}

export const fetchPages = () => dispatch => {
    database.ref('pages')
        .on('value', snapshot => {
            const pages = Object.entries(snapshot.val())
                .map(([key, page]) => ({ key, ...page }))
            dispatch({
                type: types.FETCH_PAGES,
                payload: pages
            })
        })
}

export const fetchAnnouncements = () => dispatch => {
    database.ref('announcements')
        .on('value', snapshot => {
            const announcements = Object.entries(snapshot.val())
                .map(([key, announcement]) => ({ key, ...announcement }))
            dispatch({
                type: types.FETCH_ANNOUNCEMENTS,
                payload: announcements
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

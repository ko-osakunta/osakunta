import { database, storage } from '../config/firebase'
import * as types from "./types"

export const createNewPage = (pagePath, value) => () => {
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

export const fetchPages = () => dispatch => {
    database.ref('pages')
        .once('value')
        .then(snapshot => {
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

export const fetchPageByPath = (path) => dispatch => {
    database.ref('pages')
        .orderByChild('path')
        .equalTo(`${path}`)
        .once('value')
        .then(snapshot => {
            let data = null
            snapshot.forEach(snap => {
                data = snap.val()
            })
            dispatch({
                type: types.FETCH_PAGE_BY_PATH,
                payload: data
            })
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
export const fetchTopNav = () => dispatch => {
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
}

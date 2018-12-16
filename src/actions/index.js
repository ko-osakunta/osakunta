import { database, storage } from '../config/firebase';
import * as types from "./types";

export const createNewPage = (pagePath, value) => async dispatch => {
	database.ref('pages').push().set({
		path: pagePath,
		text: "<p>Uusi sivu luotu! Adminina voit muokata sitä oheisesta lomakkeesta.</p>", 
		title: value,
		deletable: true,
		type: 'adminCreated'
	})
}

export const fetchTopImage = (image) => async dispatch => {
	storage.ref()
		.child(`${image}`)
		.getDownloadURL()
		.then((url) => {
			dispatch({
				type: types.FETCH_TOPIMAGE,
				payload: url
			})
		}
	)
}

export const fetchPages = () => async dispatch => {
	database.ref('pages')
		.once('value')
		.then(snapshot => {
			dispatch({
				type: types.FETCH_PAGES,
				payload: snapshot.val()
			})
        })
}

export const fetchContact = () => async dispatch => {
	database.ref('contact')
		.once('value')
		.then(snapshot => {
			dispatch({
				type: types.FETCH_CONTACT,
				payload: snapshot.val()
			})
        })
}

export const fetchPageTextByPath = (path) => async dispatch => {
	database.ref('pages')
		.orderByChild('path')
		.equalTo(`${path}`)
		.once('value')
		.then(snapshot => {
			var data = null
			snapshot.forEach(snap => {
				data = snap.child('text').val();
			});
			dispatch({
				type: types.FETCH_PAGE_TEXT_BY_PATH,
				payload: data
			})
		}
	)
}

export const fetchPageByPath = (path) => async dispatch => {
	database.ref('pages')
		.orderByChild('path')
		.equalTo(`${path}`)
		.once('value')
		.then(snapshot => {
			var data = null
			snapshot.forEach(snap => {
				data = snap.val();
			});
			dispatch({
				type: types.FETCH_PAGE_BY_PATH,
				payload: data
			})
		}
	)
}

export const fetchPageTextByTitle = (page) => async dispatch => {
	database.ref('pages')
		.orderByChild('page')
		.equalTo(`${page}`)
		.once('value')
		.then(snapshot => {
			var data = null
			snapshot.forEach(snap => {
				data = snap.child('text').val();
			});
			dispatch({
				type: types.FETCH_PAGE_TEXT_BY_TITLE,
				payload: data
			})
		}
	)
}

export const fetchKeyByPath = (path) => async dispatch => {
	database.ref('pages')
		.orderByChild('path')
		.equalTo(`${path}`)
		.once('value')
		.then(snapshot => {
			var key = '';
			snapshot.forEach(snap => {
				key = Object.keys(snapshot.val())[0];
			});
			dispatch({
				type: types.FETCH_KEY_BY_PATH,
				payload: key
			})
		}
	)
}
 
export const removePageByKey = (pageKey) => async dispatch => {
	database.ref('/pages').child(`${pageKey}`).remove();
}

//currently the same as pages.. might have different functionality in the future
export const fetchTopNav = () => async dispatch => {
	database.ref('pages')
		.once('value')
		.then(snapshot => {
			dispatch({
				type: types.FETCH_TOPNAV,
				payload: snapshot.val()
			})
        })
}
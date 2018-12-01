import React from 'react'
import { todosRef } from "../config/firebase";
import { database, storage } from '../config/firebase';
import { FETCH_TOPIMAGE, FETCH_PAGE_BY_PATH, FETCH_TOPNAV, FETCH_PAGES, FETCH_KEY_BY_PATH, FETCH_PAGE_BY_TITLE } from "./types";
import NavButton from '../components/NavButton'

/* export const addToDo = newToDo => async dispatch => {
  	todosRef.push().set(newToDo);
};

export const completeToDo = completeToDoId => async dispatch => {
 	todosRef.child(completeToDoId).remove();
}; */

export const fetchTopImage = (image) => async dispatch => {
	storage.ref()
		.child(`${image}`)
		.getDownloadURL()
		.then((url) => {
			dispatch({
				type: FETCH_TOPIMAGE,
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
				type: FETCH_PAGES,
				payload: snapshot.val()
			})
        })
}

export const fetchPageByPath = (path) => async dispatch => {
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
				type: FETCH_PAGE_BY_PATH,
				payload: data
			})
		}
	)
}

export const fetchPageByTitle = (page) => async dispatch => {
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
				type: FETCH_PAGE_BY_TITLE,
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
				type: FETCH_KEY_BY_PATH,
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
				type: FETCH_TOPNAV,
				payload: snapshot.val()
			})
        })
}
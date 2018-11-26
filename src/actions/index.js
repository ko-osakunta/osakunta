import React from 'react'
import { todosRef } from "../config/firebase";
import { database, storage } from '../config/firebase';
import { FETCH_TOPIMAGE, FETCH_PAGE_BY_PATH, FETCH_TOPNAV, UPDATE_EDITOR_STATE, FETCH_PAGES } from "./types";
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
			var data;
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


export const updateEditorState = (editorState) => async dispatch => {
	dispatch({
		type: UPDATE_EDITOR_STATE,
		payload: editorState
	})
}
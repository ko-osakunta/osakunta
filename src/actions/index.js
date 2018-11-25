import React from 'react'
import { todosRef } from "../config/firebase";
import { database, storage } from '../config/firebase';
import { FETCH_TODOS, FETCH_TOPIMAGE, FETCH_TEXT, FETCH_TOPNAV, UPDATE_EDITOR_STATE, FETCH_PAGES } from "./types";
import { convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import NavButton from '../components/NavButton'

export const addToDo = newToDo => async dispatch => {
  	todosRef.push().set(newToDo);
};

export const completeToDo = completeToDoId => async dispatch => {
 	todosRef.child(completeToDoId).remove();
};

export const fetchToDos = () => async dispatch => {
	todosRef.on("value", snapshot => {
		dispatch({
			type: FETCH_TODOS,
			payload: snapshot.val()
		});
	});
}

export const fetchHomeText = () => async dispatch => {
	database.ref('hometext')
		.once('value')
		.then(snapshot => {
			dispatch({
				type: FETCH_TEXT,
				payload: stateToHTML(convertFromRaw(JSON.parse(snapshot.val())))
			})
		}
	)
}

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
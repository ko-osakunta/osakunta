import { todosRef } from "../config/firebase";
import { database, storage } from '../config/firebase';
import { FETCH_TODOS, FETCH_TOPIMAGE, FETCH_HOMETEXT } from "./types";
import { convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

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
				type: FETCH_HOMETEXT,
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
			console.log(url)
			dispatch({
				type: FETCH_TOPIMAGE,
				payload: url
			})
		}
	)
}
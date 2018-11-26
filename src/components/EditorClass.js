import React from 'react'
import { Editor, EditorState, convertToRaw, RichUtils } from 'draft-js';
import { databaseRef, database } from '../config/firebase'
import { connect } from "react-redux";
import * as actions from "../actions";
import './EditorClass.css'

//This is an editor tool for the admin to change pages.
class EditorClass extends React.Component {
    
    constructor() {
        super();
        this.state = {
            editorState: EditorState.createEmpty(),
            key: ''
        }
    }

    componentWillMount() {
        const path = window.location.pathname
        database.ref('pages')
            .orderByChild('path')
            .equalTo(path)
            .once('value')
            .then(snapshot => {
                this.setState({key : Object.keys(snapshot.val())[0]})
            }
        )
        console.log(this.state.key)
    }

    onChange = (editorState) => {
        const contentState = editorState.getCurrentContent();
        this.setState({ editorState });
    }

    onUnderlineClick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
    }
    
    onBoldClick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))
    }

    onItalicClick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'))
    }

    onClick = () => {
        const contentState = this.state.editorState.getCurrentContent();
        console.log(contentState)
        console.log(convertToRaw(contentState))
        
        var updates = {}
        
        updates['pages/' + this.state.key + '/text'] = JSON.stringify(convertToRaw(contentState));
        databaseRef.update(updates);

        window.location.reload();
    }

    handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
        if (newState) {
            this.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }


    render() {
        console.log(this.state.key)
        return (
            <div>
                <button className="button" onClick={this.onUnderlineClick}>
                       U
                </button>
                <button className="button" onClick={this.onBoldClick}>
                    <b>B</b>
                </button>
                <button className="button" onClick={this.onItalicClick}>
                    <em>I</em>
                </button>
                <div className="editorclass">
                    <Editor 
                        editorState={this.state.editorState}
                        handleKeyCommand={this.handleKeyCommand}
                        onChange={this.onChange} 
                    />
                </div>
                    <button className="button" onClick={this.onClick}>
                        Vaihda teksti!
                    </button>
            </div>
            
        )
    }
}

export default EditorClass;
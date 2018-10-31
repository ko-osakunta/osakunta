import React from 'react'
import { Editor, EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { databaseRef } from '../config/firebase'
import './EditorClass.css'

class EditorClass extends React.Component {

    constructor() {
        super();
        this.state = {
            editorState: EditorState.createEmpty()
        }
    }

    onChange = (editorState) => {
        const contentState = editorState.getCurrentContent();
        console.log('content state', convertToRaw(contentState));
        this.setState({ editorState });
    }

    onClick = () => {
        const contentState = this.state.editorState.getCurrentContent();

        var updates = {}
        updates['/hometext/-LQA2RhvSlNJpoRpFv6Z'] = JSON.stringify(convertToRaw(contentState));
        databaseRef.update(updates);

        window.location.reload();
    }

    render() {
        return (
            <div>
                <div className="editorclass">
                    <Editor 
                        editorState={this.state.editorState} 
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
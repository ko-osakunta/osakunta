
import React from 'react'
import { Editor, EditorState, convertToRaw, convertFromRaw, RichUtils } from 'draft-js';
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
        updates['hometext'] = JSON.stringify(convertToRaw(contentState));
        
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
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
            editorState: EditorState.createEmpty()
        }
    }

    componentWillMount() {
        const path = window.location.pathname
        this.props.fetchKeyByPath(path)
    }

    onClick = (event) => {
        event.preventDefault();
        const contentState = this.state.editorState.getCurrentContent();
        console.log(contentState)
        console.log(convertToRaw(contentState))
        
        var updates = {}
        const { pageKey } = this.props

        updates['pages/' + pageKey + '/text'] = JSON.stringify(convertToRaw(contentState));
        databaseRef.update(updates);

        window.location.reload();
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

const mapStateToProps = ({ pageKey }) => {
    return {
        pageKey
    };
};

export default connect(mapStateToProps, actions)(EditorClass);
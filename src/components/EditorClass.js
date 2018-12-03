import React from 'react'
import { Editor, EditorState, convertToRaw, RichUtils } from 'draft-js';
import { databaseRef, database } from '../config/firebase'
import { connect } from "react-redux";
import * as actions from "../actions";
import './EditorClass.css'
import createStyles from 'draft-js-custom-styles';
import { stateToHTML } from 'draft-js-export-html';

const customStyleMap = {
    MARK: {
        backgroundColor: 'White',
        fontStyle: 'italic',
    },
};

const { styles, customStyleFn, exporter } = createStyles(['font-size', 'color', 'text-transform'], 'CUSTOM_', customStyleMap);
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

        const inlineStyles = exporter(this.state.editorState);
        updates['pages/' + pageKey + '/text'] = stateToHTML(contentState, { inlineStyles });
        databaseRef.update(updates);

        window.location.reload();
    }

    onChange = (editorState) => {
        const contentState = editorState.getCurrentContent();
        this.setState({ editorState });
    }

    toggleFontSize = fontSize => {
        const newEditorState = styles.fontSize.toggle(this.state.editorState, fontSize);
        return this.onChange(newEditorState);
    };

    removeFontSize = () => {
        const newEditorState = styles.fontSize.remove(this.state.editorState);
        
        return this.onChange(newEditorState);
    };
    
    addFontSize = val => () => {
        const newEditorState = styles.fontSize.add(this.state.editorState, val);
        return this.onChange(newEditorState);
    };
    
    toggleColor = color => {
        const newEditorState = styles.color.toggle(this.state.editorState, color);
        return this.onChange(newEditorState);
    };
    
    toggleTextTransform = color => {
        const newEditorState = styles.textTransform.toggle(this.state.editorState, color); 
        return this.onChange(newEditorState);
    };
     

    onStyleClick = (style) => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, style));
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
        const inlineStyles = exporter(this.state.editorState);
        console.log(JSON.stringify(inlineStyles))
        const options = x => x.map(fontSize => {
            return <option key={fontSize} value={fontSize}>{fontSize}</option>;
        })
        const html = stateToHTML(this.state.editorState.getCurrentContent(), { inlineStyles });
        return (
            <div>
                <select className="select" onChange={e => this.toggleFontSize(e.target.value)}>
                    {options(['12px', '24px', '36px', '50px', '72px'])}
                </select>
                <select className="select" onChange={e => this.toggleColor(e.target.value)}>
                    {options(['green', 'blue', 'red', 'purple', 'orange'])}
                </select>
                <select className="select" onChange={e => this.toggleTextTransform(e.target.value)}>
                    {options(['uppercase', 'capitalize'])}
                </select>
                <button className="button"
                    onClick={this.removeFontSize}
                >
                    Remove FontSize
                </button>
                <button className="button"
                    onClick={this.addFontSize('24px')}
                >
                    Add FontSize
                </button>
                <button className="button" onClick={() => this.onStyleClick('header-two')}>
                    H2
                </button>
                <button className="button" onClick={() => this.onStyleClick('UNDERLINE')}>
                    U
                </button>
                <button className="button" onClick={() => this.onStyleClick('BOLD')}>
                    <b>B</b>
                </button>
                <button className="button" onClick={() => this.onStyleClick('ITALIC')}>
                    <em>I</em>
                </button>
                <div className="editorclass">
                    <Editor 
                        customStyleFn={customStyleFn}
                        customStyleMap={customStyleMap}
                        editorState={this.state.editorState}
                        handleKeyCommand={this.handleKeyCommand}
                        onChange={this.onChange} 
                    />
                </div>
                    <button className="button" onClick={this.onClick}>
                        Vaihda teksti!
                    </button>

                <div>
                    {html}
                </div>
                    
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
import React from 'react';
import { convertToRaw, RichUtils } from 'draft-js';
import Editor,  { createEditorStateWithText } from 'draft-js-plugins-editor';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import createLinkPlugin from 'draft-js-anchor-plugin';
import { ItalicButton, BoldButton, UnderlineButton } from 'draft-js-buttons';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
import { databaseRef } from '../config/firebase'

import { connect } from "react-redux";
import * as actions from "../actions";
import { stateToHTML } from 'draft-js-export-html';
import createStyles from 'draft-js-custom-styles';

const linkPlugin = createLinkPlugin();
const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;
const plugins = [inlineToolbarPlugin, linkPlugin];
const text = 'Muokkaa sivun tekstiä..';

const customStyleMap = {
    MARK: {
        backgroundColor: 'White',
        fontStyle: 'italic',
    },
};

const { styles, customStyleFn, exporter } = createStyles(['font-size', 'color', 'text-transform'], 'CUSTOM_', customStyleMap);

class SecondaryEditorClass extends React.Component {
   
    constructor() {
        super();
        this.state = {
            editorState: createEditorStateWithText(text)
        }
    }

    componentWillMount() {
        const path = window.location.pathname
        this.props.fetchKeyByPath(path)
    }

    postNewPage = (event) => {
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

    onChange = (editorState) =>
        this.setState({ editorState });

    focus = () =>
        this.editor.focus();

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
                <div className="editorclass" onClick={this.focus}>
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        plugins={plugins}
                        ref={(element) => { this.editor = element; }}
                    />
                    <InlineToolbar>
                        {
                            // may be use React.Fragment instead of div to improve perfomance after React 16
                            (externalProps) => (
                                <div>
                                    <BoldButton {...externalProps} />
                                    <ItalicButton {...externalProps} />
                                    <UnderlineButton {...externalProps} />
                                    <linkPlugin.LinkButton {...externalProps} />
                                </div>
                            )
                        }
                    </InlineToolbar>
                </div>
                <button className="btn-primary" onClick={this.postNewPage}>
                    Vaihda teksti!
            </button>
            </div>
        );
    }
}

const mapStateToProps = ({ pageKey }) => {
    return {
        pageKey
    };
};

export default connect(mapStateToProps, actions)(SecondaryEditorClass);
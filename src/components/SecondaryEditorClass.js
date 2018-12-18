import React from 'react';
import { convertToRaw, RichUtils } from 'draft-js';
import { databaseRef } from '../config/firebase'
import { connect } from "react-redux";
import * as actions from "../actions";
import 'draft-js-alignment-plugin/lib/plugin.css';
import 'draft-js-focus-plugin/lib/plugin.css';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';

import Editor, { composeDecorators, createEditorStateWithText } from 'draft-js-plugins-editor';

import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import createLinkPlugin from 'draft-js-anchor-plugin';
import createImagePlugin from 'draft-js-image-plugin';
import createAlignmentPlugin from 'draft-js-alignment-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';
import createResizeablePlugin from 'draft-js-resizeable-plugin';
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';

import { ItalicButton, BoldButton, UnderlineButton } from 'draft-js-buttons';

import { stateToHTML } from 'draft-js-export-html';
import ImageAdd from './ImageAdd';

const linkPlugin = createLinkPlugin();
const inlineToolbarPlugin = createInlineToolbarPlugin();

const { InlineToolbar } = inlineToolbarPlugin;
const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
const alignmentPlugin = createAlignmentPlugin();

const decorator = composeDecorators(
    resizeablePlugin.decorator,
    alignmentPlugin.decorator,
    focusPlugin.decorator,
    blockDndPlugin.decorator
  );
const imagePlugin = createImagePlugin({ decorator });


const { AlignmentTool } = alignmentPlugin;

const plugins = [inlineToolbarPlugin, 
    linkPlugin,
    blockDndPlugin,
    focusPlugin,
    alignmentPlugin,
    resizeablePlugin, 
    imagePlugin];

class SecondaryEditorClass extends React.Component {

    constructor() {
        super();
        this.state = {
            editorState: createEditorStateWithText('Muokkaa sivun tekstiä..')
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
        updates['pages/' + pageKey + '/text'] = stateToHTML(contentState);
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
        const html = stateToHTML(this.state.editorState.getCurrentContent());
        return (
            <div>
                <div className="editor" onClick={this.focus}>
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        plugins={plugins}
                        ref={(element) => { this.editor = element; }}
                    />
                <AlignmentTool />
                </div>

                <ImageAdd
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    modifier={imagePlugin.addImage}
                />
                <button className="btn-primary" onClick={this.postNewPage}>
                    Vaihda teksti!
            </button>
                <div>
                    {html}
                </div>
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
import React from 'react';
import { EditorState, convertToRaw, RichUtils } from 'draft-js';
import { databaseRef } from '../../config/firebase'
import { connect } from "react-redux";
import { fetchKeyByPath } from "../../actions"
import 'draft-js-alignment-plugin/lib/plugin.css';
import 'draft-js-focus-plugin/lib/plugin.css';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';

import Editor, { composeDecorators } from 'draft-js-plugins-editor';

import createInlineToolbarPlugin, { Separator } from 'draft-js-inline-toolbar-plugin';
import createLinkPlugin from 'draft-js-anchor-plugin';
import createImagePlugin from 'draft-js-image-plugin';
import createAlignmentPlugin from 'draft-js-alignment-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';
import createResizeablePlugin from 'draft-js-resizeable-plugin';
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';

import {
    ItalicButton,
    BoldButton,
    UnderlineButton,
    CodeButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton
} from 'draft-js-buttons';

import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import ImageAdd from './ImageAdd';
import HeadlinesButton from './HeadlinesButton'

import styles from "./EditorClass.module.css"

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

let contentState = stateFromHTML('<p>Tämä on muokkauslomake. Voit muokata tällä oheista tekstiä. Korosta teksti niin voit tyylitellä sitä! Kuvien lisäys onnistuu alla olevasta napista.</p>');

class EditorClass extends React.Component {

    constructor() {
        super();
        this.state = {
            editorState: EditorState.createWithContent(contentState)
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

        var updates = {}
        const { pageKey } = this.props
        updates['pages/' + pageKey + '/text'] = JSON.stringify(convertToRaw(contentState))
        databaseRef.update(updates);
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
        if (this.props.auth) {
            return (
                <div>
                    <div className={styles.container}>
                        <div className={styles.editor} onClick={this.focus}>
                            <div className={styles.textBox}>
                                <Editor
                                    editorState={this.state.editorState}
                                    onChange={this.onChange}
                                    plugins={plugins}
                                    ref={(element) => { this.editor = element; }}
                                />

                                <AlignmentTool />
                                <InlineToolbar>
                                    {
                                        // may be use React.Fragment instead of div to improve perfomance after React 16
                                        (externalProps) => (
                                            <div>
                                                <BoldButton {...externalProps} />
                                                <ItalicButton {...externalProps} />
                                                <UnderlineButton {...externalProps} />
                                                <linkPlugin.LinkButton {...externalProps} />
                                                <Separator {...externalProps} />
                                                <HeadlinesButton {...externalProps} />
                                                <UnorderedListButton {...externalProps} />
                                                <OrderedListButton {...externalProps} />
                                            </div>
                                        )
                                    }
                                </InlineToolbar>
                            </div>
                        </div>
                    </div>
                    <div className={styles.imageAdd}>
                        <ImageAdd
                            editorState={this.state.editorState}
                            onChange={this.onChange}
                            modifier={imagePlugin.addImage}
                        />
                        <button className="btn-primary" onClick={this.postNewPage}>
                            Vaihda teksti!
                </button>
                    </div>
                    <div className={styles.imageAdd}>
                            {html}
                        </div>
                </div>
            )
        }
        return null
    }
}

const mapStateToProps = ({ auth, pageKey }) => ({ auth, pageKey }) // Not an identity function!

export default connect(mapStateToProps, { fetchKeyByPath })(EditorClass);

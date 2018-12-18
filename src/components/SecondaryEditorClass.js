import React from 'react';
import { convertToRaw, RichUtils } from 'draft-js';
import { databaseRef } from '../config/firebase'
import { connect } from "react-redux";
import * as actions from "../actions";
import 'draft-js-alignment-plugin/lib/plugin.css';
import 'draft-js-focus-plugin/lib/plugin.css';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';

import Editor, { composeDecorators, createEditorStateWithText } from 'draft-js-plugins-editor';

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
    HeadlineOneButton,
    HeadlineTwoButton,
    HeadlineThreeButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CodeBlockButton,
  } from 'draft-js-buttons';

import { stateToHTML } from 'draft-js-export-html';
import ImageAdd from './ImageAdd';

class HeadlinesPicker extends React.Component {
    componentDidMount() {
      setTimeout(() => { window.addEventListener('click', this.onWindowClick); });
    }
  
    componentWillUnmount() {
      window.removeEventListener('click', this.onWindowClick);
    }
  
    onWindowClick = () =>
      // Call `onOverrideContent` again with `undefined`
      // so the toolbar can show its regular content again.
      this.props.onOverrideContent(undefined);
  
    render() {
      const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];
      return (
        <div>
          {buttons.map((Button, i) => // eslint-disable-next-line
            <Button key={i} {...this.props} />
          )}
        </div>
      );
    }
  }
  
  class HeadlinesButton extends React.Component {
    // When using a click event inside overridden content, mouse down
    // events needs to be prevented so the focus stays in the editor
    // and the toolbar remains visible  onMouseDown = (event) => event.preventDefault()
    onMouseDown = (event) => event.preventDefault()
  
    onClick = () =>
      // A button can call `onOverrideContent` to replace the content
      // of the toolbar. This can be useful for displaying sub
      // menus or requesting additional information from the user.
      this.props.onOverrideContent(HeadlinesPicker);
  
    render() {
      return (
        <div onMouseDown={this.onMouseDown} className={'headlineButtonWrapper'}>
          <button onClick={this.onClick} className={'headlineButton'}>
            H
          </button>
        </div>
      );
    }
  }

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
                    <InlineToolbar>
                        {
                            // may be use React.Fragment instead of div to improve perfomance after React 16
                            (externalProps) => (
                                <div>
                                    <BoldButton {...externalProps} />
                                    <ItalicButton {...externalProps} />
                                    <UnderlineButton {...externalProps} />
                                    <CodeButton {...externalProps} />
                                    <Separator {...externalProps} />
                                    <HeadlinesButton {...externalProps} />
                                    <UnorderedListButton {...externalProps} />
                                    <OrderedListButton {...externalProps} />
                                    <BlockquoteButton {...externalProps} />
                                    <CodeBlockButton {...externalProps} />
                                </div>
                            )
                        }
                    </InlineToolbar>
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
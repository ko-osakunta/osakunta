import React, { useState } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { updateContent } from "../../actions"
import EditorClass from '../editor/EditorClass'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'

const UpdateContent = ({ type, content }) => {
    const [editorState, setEditorState] = useState(EditorState.createWithContent(convertFromRaw(JSON.parse(content.text))))

    const onClick = () => {
        try {
            updateContent(type + '/' + content.key, JSON.stringify(convertToRaw(editorState.getCurrentContent())))
            push(content.path)
        } catch (error) {
            console.log(error)
            window.alert(error.message)
        }
    }
    
    return <div>
        Päivitä sivun sisältö:
        <EditorClass editorState={editorState} changeValue={editorState => setEditorState(editorState)} updatePath={'pages/daasdaafff'} />
        <button className="btn-primary" onClick={onClick}>Päivitä sisältö</button>
    </div>
}

const mapStateToProps = ({ pages }) => ({ pages }) // Not an identity function!

export default connect(mapStateToProps, { updateContent, push })(UpdateContent)

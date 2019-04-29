import React, { useState } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { createNewAnnouncement } from "../../actions"
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import EditorClass from '../editor/EditorClass'

const AddNewAnnouncement = ({ createNewAnnouncement, push }) => {
    const [title, setTitle] = useState("")
    const [editorState, setEditorState] = useState(EditorState.createWithContent(convertFromRaw({
        blocks: [{
            key: "2onp9",
            text: "Uuden julkaisun teksti. Voit muokata sitä tällä lomakkeella. Kun korostat tekstiä niin voit tyylitellä sitä! Myös kuvien lisäys onnistuu!",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
        }],
        entityMap: {}
    })))

    const onClick = () => {
        try {
            createNewAnnouncement(title, JSON.stringify(convertToRaw(editorState.getCurrentContent())))
            push("/announcements")
        } catch (error) {
            console.log(error)
            window.alert(error.message)
        }
    }
    return <div>
        Uuden ilmoituksen nimi:
        <input type="text" name="text" value={title} onChange={e => setTitle(e.target.value)} />
        <EditorClass editorState={editorState} changeValue={editorState => setEditorState(editorState)} />
        <button className="btn-primary" onClick={onClick}>Lisää uusi tapahtuma</button>
    </div>
}

const mapStateToProps = ({ announcements }) => ({ announcements }) // Not an identity function!

export default connect(mapStateToProps, { createNewAnnouncement, push })(AddNewAnnouncement)

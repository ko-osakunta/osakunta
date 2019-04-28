import React, { useState } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { createNewPage } from "../../actions"
import EditorClass from '../editor/EditorClass'
import { EditorState, convertFromRaw,convertToRaw } from 'draft-js'

const AddNewPage = ({ createNewPage, push }) => {
    const [input, setInput] = useState("")
    const [editorState, setEditorState] = useState(EditorState.createWithContent(convertFromRaw({
        blocks: [{
            key: "2onp9",
            text: "Uuden sivun teksti. Voit muokata sitä oheisesta lomakkeesta. Kun korostat tekstiä niin voit tyylitellä sitä! Myös kuvien lisäys onnistuu!",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
        }],
        entityMap: {}
    })))

    const onClick = () => {
        const pagePath = convertValueToPath(input)
        
        try {
            createNewPage(pagePath, input, JSON.stringify(convertToRaw(editorState.getCurrentContent())))
            push(pagePath)
        } catch (error) {
            console.log(error)
            window.alert(error.message)
        }
    }
    
    return <div>
        Uuden sivun nimi:
        <input type="text" name="text" value={input} onChange={e => setInput(e.target.value)} />
        <EditorClass editorState={editorState} changeValue={editorState => setEditorState(editorState)} updatePath={'pages/daasdaafff'} />
        <button className="btn-primary" onClick={onClick}>Lisää uusi sivu</button>
    </div>
}

const convertValueToPath = (input) => {
    let pagePath = input.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    pagePath = '/' + pagePath.replace(/[^a-zA-Z0-9]+/g, "")
    return pagePath.toLowerCase()
}

const mapStateToProps = ({ pages }) => ({ pages }) // Not an identity function!

export default connect(mapStateToProps, { createNewPage, push })(AddNewPage)

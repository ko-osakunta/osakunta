import React, { useState } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { createNewPage } from "../../actions"

const AddNewPage = ({ createNewPage, push }) => {
    const [input, setInput] = useState("")

    const onClick = () => {
        const pagePath = convertValueToPath(input)

        try {
            createNewPage(pagePath, input)
            push(pagePath)
        } catch (error) {
            window.alert(error.message)
        }
    }

    return <div>
        Uuden sivun nimi:
        <input type="text" name="text" value={input} onChange={e => setInput(e.target.value)} />
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

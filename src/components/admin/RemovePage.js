import React from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { removePageByKey } from "../../actions"

const RemovePage = ({ page: { key }, auth, removePageByKey, push }) => {
    const remove = () => {
        removePageByKey(key)
        push("/")
    }

    if (auth) {
        return <button className="btn-primary" onClick={remove}>
            Poista nykyinen sivu
        </button>
    } else {
        return null
    }
}

const mapStateToProps = ({ auth }) => ({ auth }) // Not an identity function!

export default connect(mapStateToProps, { removePageByKey, push })(RemovePage)

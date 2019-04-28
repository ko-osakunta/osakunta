import React from 'react'
import { createNewAnnouncement } from "../../actions"

const AddNewAnnouncement = () => {

    const onClick = () => {
        try {
            createNewAnnouncement()
        } catch (error) {
            window.alert(error.message)
        }
    }
    return <button className="btn-primary" onClick={onClick}>Lisää uusi tapahtuma</button>
}

export default AddNewAnnouncement

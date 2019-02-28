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

    return (
        <div>
            <button className="btn-primary" onClick={onClick}>Lisää uusi tapahtuma</button>
        </div>
    )
}

export default AddNewAnnouncement

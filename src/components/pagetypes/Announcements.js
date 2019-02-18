import React from "react"
import PageText from "../structure/PageText"
import EditorClass from "../editor/EditorClass"
import RemovePage from "../admin/RemovePage"
import { connect } from 'react-redux'

const Announcements = ({ announcements }) =>
    <div>
        {announcements !== undefined && announcements.map(announcement =>
            <PageText text={announcement.text} />
        )}
    </div>
    
const mapStateToProps = ({ announcements }) => ({ announcements })

export default connect(mapStateToProps)(Announcements)

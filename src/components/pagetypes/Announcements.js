import React from "react"
import PageText from "../structure/PageText"
import EditorClass from "../editor/EditorClass"
import RemovePage from "../admin/RemovePage"
import { connect } from 'react-redux'

const Announcements = ({ announcements }) =>
    <div>
        {announcements !== false && announcements.map(announcement =>
            <div>
                <PageText text={announcement.text} />
                <EditorClass text={announcement.text} updatePath={'announcements/' + announcement.key+ '/text'}/>
            </div>
        )}
    </div>
    
const mapStateToProps = ({ announcements }) => ({ announcements })

export default connect(mapStateToProps)(Announcements)
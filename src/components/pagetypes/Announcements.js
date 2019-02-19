import React from "react"
import PageText from "../structure/PageText"
import EditorClass from "../editor/EditorClass"
import RemovePage from "../admin/RemovePage"
import { connect } from 'react-redux'
import moment from 'moment'

const Announcements = ({ announcements }) =>
    <div>
        {announcements !== false && announcements.map(announcement =>
            <div>
                <p>Luotu: {moment(announcement.dateCreated).format('LLL')} Päivitetty: {moment(announcement.dateUpdated).format('LLL')}</p>
                <PageText text={announcement.text} />
                <EditorClass text={announcement.text} updatePath={'announcements/' + announcement.key} />
            </div>
        ).reverse()}
    </div>

const mapStateToProps = ({ announcements }) => ({ announcements })

export default connect(mapStateToProps)(Announcements)
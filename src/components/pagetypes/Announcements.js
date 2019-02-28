import React from "react"
import PageText from "../structure/PageText"
import EditorClass from "../editor/EditorClass"
import { connect } from 'react-redux'
import moment from 'moment'

const Announcements = ({ announcements }) =>
    <div>
        {announcements.sort((a, b) => b.dateUpdated - a.dateUpdated)
            .map(({ dateCreated, dateUpdated, text, key }) =>
                <div key={key}>
                    <p>Luotu: {moment(dateCreated).format('LLL')} Päivitetty: {moment(dateUpdated).format('LLL')}</p>
                    <PageText text={text} />
                    <EditorClass text={text} updatePath={'announcements/' + key} />
                </div>
            )}
    </div>

const mapStateToProps = ({ announcements }) => ({ announcements })

export default connect(mapStateToProps)(Announcements)

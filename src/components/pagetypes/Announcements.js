import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import PageText from "../structure/PageText"
import EditorClass from "../editor/EditorClass"
import styles from "./Announcements.module.css"


const Announcements = ({ announcements }) => <>
    {announcements.sort((a, b) => b.dateUpdated - a.dateUpdated)
        .map(({ dateCreated, dateUpdated, text, title, key }) =>
            <div key={key}>
                <div className={styles.container}>
                    <div className={styles.announcementData}>
                        <h3>{title}</h3>                    
                        <p>Luotu: {moment(dateCreated).format('LLL')}</p>
                        <i>Päivitetty: {moment(dateUpdated).format('LLL')}</i>
                        <div className={styles.text}>
                            <PageText text={text} />
                        </div>
                        <hr className={styles.hr} />
                    </div>
                </div>
                <EditorClass text={text} updatePath={'announcements/' + key} />
            </div>
        )
    }
    </>

const mapStateToProps = ({ announcements }) => ({ announcements })

export default connect(mapStateToProps)(Announcements)

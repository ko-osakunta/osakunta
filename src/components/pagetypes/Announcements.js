import React, { useState } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import PageText from "../structure/PageText"
import EditorClass from "../editor/EditorClass"
import styles from "./Announcements.module.css"
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import UpdateContent from '../admin/UpdateContent';

const Announcements = ({ announcements }) => <>
    {announcements.sort((a, b) => b.dateUpdated - a.dateUpdated)
        .map((content) =>

            <div key={content.key}>
                <div className={styles.container}>
                    <div className={styles.announcementData}>
                        <h3>{content.title}</h3>
                        <p>Luotu: {moment(content.dateCreated).format('LLL')}</p>
                        <i>Päivitetty: {moment(content.dateUpdated).format('LLL')}</i>
                        <div className={styles.text}>
                            <PageText text={content.text} />
                        </div>
                        <hr className={styles.hr} />
                    </div>
                </div>
                <UpdateContent type={'announcements'} content={content} />
            </div>
        )
    }
    </>

const mapStateToProps = ({ announcements }) => ({ announcements })

export default connect(mapStateToProps)(Announcements)

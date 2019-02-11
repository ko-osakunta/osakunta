import React from 'react'
import { connect } from "react-redux"
import { fetchPageByPath } from "../../actions"

import { stateToHTML } from 'draft-js-export-html'
import { convertFromRaw } from 'draft-js'
import styles from "./PageText.module.css"

const PageText = ({ text }) =>
    <div className={styles.container} >
        <div className={styles.pageText}>
            <hr className={styles.hr} />
            <div dangerouslySetInnerHTML={{ __html: textToHtml(text) }} />
            <hr className={styles.hr} />
        </div>
    </div >

const textToHtml = (text) =>
    stateToHTML(convertFromRaw(JSON.parse(text)), options)

const options = {
    entityStyleFn: (entity) => {
        const entityType = entity.get('type').toLowerCase()
        if (entityType === 'image') {
            const data = entity.getData()

            console.log(typeof data.width === "undefined")
            return {
                element: 'img',
                attributes: {
                    src: data.src,
                    align: getAlign(data.alignment),
                    className: 'img-' + data.alignment,
                    width: getWidth(data.width)
                }
            }
        }
    }
}

// These two are kinda bubblegum, but it'll work for now for our purposes

const getWidth = width => (typeof width === "undefined") ? "40%" : width + '%'

const getAlign = alignment => alignment === 'center' || (typeof alignment === "undefined") ? "middle" : alignment

const mapStateToProps = ({ page }) => ({ page }) // Not an identity function!

export default connect(mapStateToProps, { fetchPageByPath })(PageText)

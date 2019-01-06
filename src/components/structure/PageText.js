import React from 'react'
import { connect } from "react-redux"
import { fetchPageByPath } from "../../actions"

import { stateToHTML } from 'draft-js-export-html'
import { convertFromRaw } from 'draft-js'
import styles from "./PageText.module.css"

const PageText = ({ text }) =>
    <div className={styles.pageText}>
        <div dangerouslySetInnerHTML={{ __html: textToHtml(text) }} />
    </div>
    
const textToHtml = (text) =>
    stateToHTML(convertFromRaw(JSON.parse(text)), options)

const options = {
    entityStyleFn: (entity) => {
        const entityType = entity.get('type').toLowerCase()
        if (entityType === 'image') {
            const data = entity.getData()
            return {
                element: 'img',
                attributes: {
                    src: data.src,
                    align: getAlign(data.alignment),
                    className: 'img-' + data.alignment,
                    width: data.width + '%'
                }
            }
        }
    }
}

const getAlign = alignment => alignment === 'center' ? "middle" : alignment

const mapStateToProps = ({ page }) => ({ page }) // Not an identity function!

export default connect(mapStateToProps, {fetchPageByPath})(PageText)

import React from 'react'
import { connect } from "react-redux"
import styles from "./Footer.module.css"

const Footer = ({ contact }) =>
    Object.keys(contact).length !== 0 &&
            <div className={styles.footer}>
                <div>
                    {renderAsHtml(contact.nation)}
                    {renderAsHtml(contact.HYnation)}
                    {renderAsHtml(contact.Ytieto)}
                </div>
                <div>
                    {renderAsHtml(contact.socialMedia)}
                    {renderAsHtml(contact.fb)}
                    {renderAsHtml(contact.ig)}
                </div>
                <div>
                    {renderAsHtml(contact.address)}
                    {renderAsHtml(contact.apartment)}
                    {renderAsHtml(contact.postalCodeAndCity)}
                </div>
            </div>

const renderAsHtml = text => <div dangerouslySetInnerHTML={{ __html: text }} />

const mapStateToProps = ({ contact }) => ({ contact }) // Not an identity function!

export default connect(mapStateToProps)(Footer)

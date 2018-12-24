import React from 'react'
import { connect } from "react-redux"

const Footer = ({ contact }) =>
    <div className="footer">
        {
            Object.keys(contact).length !== 0 &&
                <table className="footer">
                    <tr className="row">
                        <td className="col-lg-3 offset-lg-1 offset-xl-0">
                            {renderAsHtml(contact.nation)}
                        </td>
                        <td className="col-lg-2 col-xl-3 offset-lg-2 offset-xl-3">
                            {renderAsHtml(contact.socialMedia)}
                        </td>
                    </tr>
                    <tr className="row">
                        <td className="col-lg-3 offset-lg-1 offset-xl-0">
                            {renderAsHtml(contact.address)}
                        </td>
                        <td className="col-lg-2 col-xl-3 offset-lg-0">
                            {renderAsHtml(contact.HYnation)}
                        </td>
                        <td className="col-lg-2 col-xl-3">
                            {renderAsHtml(contact.fb)}
                        </td>
                    </tr>
                    <tr className="row">
                        <td className="col-lg-3 offset-lg-1 offset-xl-0">
                            {renderAsHtml(contact.apartment)}
                        </td>
                        <td className="col-lg-2 col-xl-3 offset-lg-0">
                            {renderAsHtml(contact.Ytieto)}
                        </td>
                        <td className="col-lg-2 col-xl-3 offset-xl-0">
                            {renderAsHtml(contact.ig)}
                        </td>
                    </tr>
                    <tr className="row">
                        <td className="col-xl-3 offset-xl-0">
                            {renderAsHtml(contact.postalCodeAndCity)}
                        </td>
                    </tr>
                </table>
        }
    </div>

const renderAsHtml = text => <div dangerouslySetInnerHTML={{ __html: text }} />

const mapStateToProps = ({ contact }) => ({ contact }) // Not an identity function!

export default connect(mapStateToProps)(Footer)

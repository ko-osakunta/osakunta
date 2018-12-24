import React from "react"
import Page from "./components/Page"
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { fetchPages, fetchContact } from "./actions"
import { connect } from "react-redux"


class App extends React.Component {

    componentDidMount() {
        this.props.fetchPages()
        this.props.fetchContact()
    }
    
    render() {
        const { pages } = this.props
        return (
            <Router>
                <div>
                    {
                        pages.length !== 0
                            ? [<Route key={pages[0].path} path={pages[0].path} component={Page} />]
                            : []
                    }
                </div>
            </Router>
        )
    }
}

const mapStateToProps = ({ pages }) => ({ pages }) // Not an identity function!

export default connect(mapStateToProps, {fetchPages, fetchContact})(App)

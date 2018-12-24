import React from "react"
import Page from "./components/Page"
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { fetchPages } from "./actions"
import { connect } from "react-redux"


class App extends React.Component {

    componentDidMount() {
        this.props.fetchPages()
    }
    
    renderRoutes() {
        let routes = []
        const { pages } = this.props
        if (!(Object.keys(pages).length === 0)) {
            //fetchPages() returns index path as well when not in index, but indexing it to 0 fixes it
            const key = Object.keys(pages)[0]
            routes.push(<Route key={pages[key].path} path={pages[key].path} component={Page} />)
        }
        return routes
    }

    render() {
        return (
            <Router>
                <div>
                    {this.renderRoutes()}
                </div>
            </Router>
        )
    }
}

const mapStateToProps = ({ pages }) => ({ pages })

export default connect(mapStateToProps, {fetchPages})(App)

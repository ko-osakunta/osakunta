import React from "react";
import Page from "./components/Page";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import * as actions from "./actions";
import { connect } from "react-redux";


class App extends React.Component {

	componentDidMount() {
		this.props.fetchPages();
	}

	renderRoutes() {
		var routes = []
		const { pages } = this.props
		console.log(pages)
		if (!(Object.keys(pages).length === 0)) {
			//fetchPages() returns index path as well when not in index, but indexing it to 0 fixes it
			var key = Object.keys(pages)[0]
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
		);
	}
}

const mapStateToProps = ({ pages }) => {
	return {
		pages
	};
};

export default connect(mapStateToProps, actions)(App);

import React from "react";
import Page from "./components/Page";

class App extends React.Component {
	
  render() {
    const { page } = this.props
    return (
      <div className="container">
        <Page />
      </div>
    );
  }
}

export default App;
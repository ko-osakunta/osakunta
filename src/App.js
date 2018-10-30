import React from "react";
import ToDoList from "./components/ToDoList";
import Home from "./components/Home";

class App extends React.Component {

  render() {
    return (
      <div className="container">
        {/* <ToDoList /> */}
        <Home />
      </div>
    );
  }
}

export default App;
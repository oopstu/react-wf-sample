import * as React from "react";
import "./App.css";
import TaskList from "./components/TaskList";
import logo from "./logo.svg";


class App extends React.Component {

  // private sessionId : string;

  public componentDidMount() {
    // // tslint:disable-next-line
    // debugger;
    // this.GetSessionAndGetTasks();
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Based Workflow Task Example</h1>
        </header>

        {/* <TaskList tasks={contacts} /> */}
        <TaskList />
      </div>
    );
  }

  
  
 
}

export default App;
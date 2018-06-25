import * as React from "react";
import "./App.css";
import TaskList from "./components/TaskList";
import logo from "./logo.svg";



const contacts = [
  { id: 1, name: "Leanne Graham" },
  { id: 2, name: "Ervin Howell" },
  { id: 3, name: "Clementine Bauch" },
  { id: 4, name: "Patricia Lebsack" }
];

class App extends React.Component {

  

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Based Workflow Task Example</h1>
        </header>

        <TaskList tasks={contacts} />
      </div>
    );
  }
}

export default App;
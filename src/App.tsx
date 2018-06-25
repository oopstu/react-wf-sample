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

  private sessionId : string;

  public componentDidMount() {
    // // tslint:disable-next-line
    // debugger;
    this.GetSessionAndGetTasks();
  }

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

  
  private GetSessionAndGetTasks() {
    // Start the fetch!
    fetch("http://localhost/decisions/Primary/REST/AccountService/LoginUser?userid=admin@decisions.com&password=admin&outputType=JSON", {
      // headers:{
      //   "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
      //   "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
      //   'Access-Control-Allow-Origin':'*',
      //   }, 
      // mode: "cors",
    }).then(response => {
      return response.json();
    }).then(LoginUserResult => {
      this.sessionId = this.GetSessionIdFromResult(LoginUserResult);
      // tslint:disable-next-line
      console.log(this.sessionId);
    }).catch(err => {
        // tslint:disable-next-line
        console.log(err);
      });
  }

  private GetSessionIdFromResult(LoginUserResult: any) : string {
    // // tslint:disable-next-line
    // console.log(LoginUserResult);
    return LoginUserResult.SessionValue;
    
  }

 
}

export default App;

import * as React from "react";
import DecisionsIFrame from './DecisionsIFrame';
// import the Task component
import './Task.css';

interface ITaskState { tasks: any[], clicked: boolean, iFrameURL: string };
class TaskList extends React.Component<{}, ITaskState> {

  private sessionId: string;

  constructor(props: any) {

    super(props);
    this.handleBtnClick = this.handleBtnClick.bind(this);
    this.state = {
      clicked: false,
      iFrameURL: "",
      tasks: []
      
    }
  }

  public componentDidMount() {
    // // tslint:disable-next-lines
    // debugger;
    this.GetSessionAndGetTasks();
  }

  public render() {
    const { tasks } = this.state;
    const clicked = this.state.clicked;
    let button;

    if (clicked) {
       button = <DecisionsIFrame  />;
    }

    return (
      <div className="task-list">
          
          {tasks.map((c: any) => 
            // tslint:disable-next-line jsx-no-lambda
            <div className="internal-tasks" 
              key={c.AssignmentId} 
              onClick={ e => this.handleBtnClick(e) }>
                  Item: {c.EntityName} (Created by: {c.CreatedBy} on {c.CreatedOnDate})
            </div>            
          )}
        
        <div className="task-count"><span>Task Count: {this.state.tasks.length}</span></div>    

        {button}

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
      // tslint:disable-next-line
      // console.log("Getting session id from result: " + JSON.stringify(LoginUserResult));
      this.sessionId = this.GetSessionIdFromResult(LoginUserResult);
      // tslint:disable-next-line
      console.log(this.sessionId);
      this.GetTasksWithSessionId();

    }).catch(err => {
      // tslint:disable-next-line
      console.log(err);
    });
  }

  private GetSessionIdFromResult(ResponseData: any): string {
    // // tslint:disable-next-line
    // console.log(LoginUserResult);
    return ResponseData.LoginUserResult.SessionValue;

  }

  private GetTasksWithSessionId() {
    fetch("http://localhost/decisions/Primary/REST/Assignment/GetMyCurrentAssignments?sessionId=" + this.sessionId + "&outputType=JSON", {
      // headers:{
      //   "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
      //   "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
      //   'Access-Control-Allow-Origin':'*',
      //   }, 
      // mode: "cors",
    }).then(response => {
      return response.json();
    }).then(CurrentTasksResult => {
      // tslint:disable-next-line
      console.log("CurrentTasks result: " + JSON.stringify(CurrentTasksResult.GetMyCurrentAssignmentsResult));
      this.setState( { tasks: CurrentTasksResult.GetMyCurrentAssignmentsResult } );
      // tslint:disable-next-line
      console.log("State: " + JSON.stringify(this.state.tasks[0]));
    }).catch(err => {
      // tslint:disable-next-line
      console.log(err);
    });

  }

  private handleBtnClick(event: any) : void {	 
      // tslint:disable-next-line
      
    this.setState( { clicked: !this.state.clicked, iFrameURL: "" } );
  }
 
}
export default TaskList;
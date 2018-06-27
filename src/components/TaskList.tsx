
import * as React from "react";
// import the Task component
import './Task.css';

interface ITaskState { tasks: any[], iFrameURL: string };

class TaskList extends React.Component<{}, ITaskState> {

  private sessionId: string;

  constructor(props: any) {

    super(props);
    this.handleBtnClick = this.handleBtnClick.bind(this);
    this.state = {
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

    return (
      <div className="task-list">

        {tasks.map((task: any) =>
          // tslint:disable-next-line jsx-no-lambda
          <div className="internal-tasks"
            key={task.AssignmentId}
            // tslint:disable-next-line jsx-no-lambda
            onClick={e => this.handleBtnClick(e, task.AssignmentId)}>
            Item: {task.EntityName} (Created by: {task.CreatedBy} on {task.CreatedOnDate})
            </div>
        )}

        <div className="task-count"><span>Task Count: {this.state.tasks.length}</span></div>

        {
          // tslint:disable-next-line jsx-no-lambda
          (this.state.iFrameURL.length || this.state.iFrameURL.length > 1) ? <iframe src={this.state.iFrameURL} onLoad={ev => this.doMyFrameLoad} className={"task-present"} /> : ''
        }
      </div>
    );
  }

  private doMyFrameLoad(frame: any) {
    // This is the really important bit
    // that detects when the flow engine sends 
    // a flowExecutionCompleted event without any 
    // special end step at all.
    frame.contentWindow.$("div[id^='formWrapper']").on("flowExecutionCompleted", () => {
      // alert("Flow completed!!");
      // document.getElementById('iframeworkflowchild').style.display = 'none';
      this.setState( { iFrameURL: "" } );
    });

    // When second form in set is different size...
    // frame needs to resize at that moment.
    frame.contentWindow.$(frame.contentWindow.document).on("FormLoadComplete",  (resizeObj: any) => {
      if (false === resizeObj.isResized) {
        alert("height:" + resizeObj.FormSurfaceElem.height() + " width:" + resizeObj.FormSurfaceElem.width())
      }
    });
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
    // 
    fetch("http://localhost/decisions/Primary/REST/Assignment/GetMyCurrentAssignments?sessionId=" + this.sessionId + "&outputType=JSON")
      .then(response => {
        return response.json();
      }).then(CurrentTasksResult => {
        // tslint:disable-next-line
        console.log("CurrentTasks result: " + JSON.stringify(CurrentTasksResult.GetMyCurrentAssignmentsResult));
        this.setState({ tasks: CurrentTasksResult.GetMyCurrentAssignmentsResult });
        // tslint:disable-next-line
        console.log("State: " + JSON.stringify(this.state.tasks[0]));
      }).catch(err => {
        // tslint:disable-next-line
        console.log(err);
      });

  }

  private handleBtnClick(event: any, taskId: string): void {
    // tslint:disable-next-line

    const url = `http://localhost/decisions/?assignmentId=${taskId}&sessionid=${this.sessionId}&chrome=off&border=true`
    this.setState({ iFrameURL: url });
  }

}
export default TaskList;
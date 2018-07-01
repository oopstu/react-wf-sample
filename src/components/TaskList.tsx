import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import * as React from "react";

import { TaskApi } from '../task.api';
import Task from './Task';
import './Task.css';

interface ITaskState {
  isDialogOpen: boolean
  iFrameURL: string,
  tasks: any[],
};

class TaskList extends React.Component<{}, ITaskState> {

  private sessionId: string;

  constructor(props: any) {

    super(props);

    this.state = {
      iFrameURL: "",
      isDialogOpen: false,
      tasks: [],
    }

    this.handleDialogClose.bind(this);
  }

  public componentDidMount() {
    TaskApi.login().then((sessionId) => {
      TaskApi.fetchCurrent(sessionId).then((tasks) => {
        this.setState({ tasks });
      });
    });
  }

  public render() {
    const { tasks } = this.state;

    return (
      <div className="task-list">

        {tasks.map((task: any) =>
          // tslint:disable-next-line jsx-no-lambda
          <Task key={task.AssignmentId} id={task.AssignmentId} name={task.EntityName} onClick={() => this.handleBtnClick(task.id)}
            createdBy={task.CreatedBy} createdOnDate={task.CreatedOnDate}
            priority={task.Priority} />
        )}

        <div className="task-count"><span>Task Count: {this.state.tasks.length}</span></div>

        <Dialog
          open={this.state.isDialogOpen}
          onClose={this.handleDialogClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Task Page</DialogTitle>
          <DialogContent>
            {
              // tslint:disable-next-line jsx-no-lambda
              (this.state.iFrameURL.length || this.state.iFrameURL.length > 1) ?
                <iframe src={this.state.iFrameURL} onLoad={this.doMyFrameLoad} className={"task-present"} /> : ''
            }
          </DialogContent>
          <DialogActions>              
            <Button onClick={this.handleDialogClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  private handleDialogClose = () => {
    this.setState({ isDialogOpen: false });
  };


  private doMyFrameLoad(event: any) {
    // This is the really important bit
    // that detects when the flow engine sends 
    // a flowExecutionCompleted event without any 
    // special end step at all.
    // const frame = event.currentTarget;
    // TODO: here is the cross-origin error appears...  
    // // Uncaught DOMException: Blocked a frame with origin "http://localhost:3000" from accessing a cross-origin frame.
    // frame.contentWindow.$("div[id^='formWrapper']").on("flowExecutionCompleted", () => {
    //   // alert("Flow completed!!");
    //   // document.getElementById('iframeworkflowchild').style.display = 'none';
    //   this.setState({ iFrameURL: "" });
    // });

    // When second form in set is different size...
    // frame needs to resize at that moment.
    // $(frame.contentWindow.document).on("FormLoadComplete",  (resizeObj: any) => {
    //   if (false === resizeObj.isResized) {
    //     alert("height:" + resizeObj.FormSurfaceElem.height() + " width:" + resizeObj.FormSurfaceElem.width())
    //   }
    // });
  }

  private handleBtnClick(taskId: string): void {
    // tslint:disable-next-line

    const url = `http://localhost/decisions/?assignmentId=${taskId}&sessionid=${this.sessionId}&chrome=off&border=true`
    this.setState({
      iFrameURL: url,
      isDialogOpen: true
    });
  }

}


export default TaskList;
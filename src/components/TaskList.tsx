import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import * as React from "react";

import { TaskApi } from '../task.api';

import Task from './Task';
import TaskCard from './Card';

import './Task.css';

import NavBar from './NavBar';

interface ITaskListState {
  sessionId: string,
  isDialogOpen: boolean
  iFrameURL: string,
  tasks: any[],
  currentView: number
};

class TaskList extends React.Component<{}, ITaskListState> {

  constructor(props: any) {

    super(props);

    this.state = {
      currentView: 0,
      sessionId: "",
      iFrameURL: "",
      isDialogOpen: false,
      tasks: [],
    }

    this.setView = this.setView.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
  }

  public componentDidMount() {
    TaskApi.login().then((sessionId) => {
      this.setState({ sessionId });
      TaskApi.fetchCurrent(sessionId).then((tasks) => {
        this.setState({ tasks });
      });
    });
  }

  public render() {
    const { tasks } = this.state;
    const sortedTasks = tasks.sort(this.sortTasks).reverse();

    return (
      <div className="task-list">
        <NavBar value={this.state.currentView} onChange={this.setView} />

        <div className="task-count"><span>Task Count: {this.state.tasks.length}</span></div>

        {sortedTasks.map((task: any) =>
          (this.state.currentView === 0) ?
            <Task key={task.AssignmentId} id={task.AssignmentId} name={task.EntityName} onClick={this.handleBtnClick.bind(this, task.AssignmentId)}
              createdBy={task.CreatedBy} createdOnDate={task.CreatedOnDate}
              priority={task.Priority} /> :
            <TaskCard key={task.AssignmentId} id={task.AssignmentId} name={task.EntityName}
              createdBy={task.CreatedBy} createdOnDate={task.CreatedOnDate}
              priority={task.Priority} onClick={this.handleBtnClick.bind(this, task.AssignmentId)}
              description={task.EntityDescription} />
        )}
        
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

  private setView(view: number) {
    this.setState({ currentView: view });
  }

  private sortTasks(a: any, b: any) {
    if (!a.Priority && !b.Priority) { return 0; }
    if (a.Priority && !b.Priority) { return 1; }
    if (!a.Priority && b.Priority) { return -1; }

    return a.Priority.localeCompare(b.Priority);
  }

  private handleDialogClose = () => {
    this.setState({ isDialogOpen: false });
  };

  private handleBtnClick(taskId: string): void {
    const url = `http://localhost/decisions/?assignmentId=${taskId}&sessionid=${this.state.sessionId}&chrome=off&border=true`
    this.setState({
      iFrameURL: url,
      isDialogOpen: true
    });
  }

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



}


export default TaskList;
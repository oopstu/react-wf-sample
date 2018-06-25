
import * as React from "react";

// import the Contact component
import Task from "./Task";

function TaskList(props:any) {
  return (
    <div>{props.tasks.map((c: any) => <Task key={c.id} name={c.name} />)}</div>
  );
}


export default TaskList;

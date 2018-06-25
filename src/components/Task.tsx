import * as React from "react";
import "./Task.css";

function Task(props:any) {
  return (
    <div className="contact">
      <span>{props.name}</span>
    </div>
  );
}


export default Task;

import * as React from "react";
import "./Contact.css";

function Contact(props:any) {
  return (
    <div className="contact">
      <span>{props.name}</span>
    </div>
  );
}


export default Contact;

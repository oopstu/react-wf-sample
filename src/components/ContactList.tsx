
import * as React from "react";

// import the Contact component
import Contact from "./Contact";

function ContactList(props:any) {
  return (
    <div>{props.contacts.map((c: any) => <Contact key={c.id} name={c.name} />)}</div>
  );
}


export default ContactList;

import React from "react";

const List = props => {
  return (
    <div>
      <h5>{props.payload.fields.header.stringValue}</h5>
      <p style={{ textAlign: "justify" }}>
        {props.payload.fields.text.stringValue}
      </p>
    </div>
  );
};

export default List;

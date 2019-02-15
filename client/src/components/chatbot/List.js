import React from "react";

const List = props => {
  return (
    <div className="row">
      <div className="col s12 m6">
        <div className="card">
          <div className="card-content">
            <span className="card-title">
              {props.payload.fields.header.stringValue}
            </span>
            <p>{props.payload.fields.text.stringValue}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;

import React from "react";

const List = props => {
  return (
    <div className="row">
      <div className="col s12 m6">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
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

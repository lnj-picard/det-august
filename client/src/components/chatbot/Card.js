import React from "react";

const Card = props => {
  return (
    <div style={{ height: 300 }}>
      <div className="card">
        <div className="card-image waves-effect waves-block waves-light">
          <img
            alt={props.payload.fields.header.stringValue}
            src={props.payload.fields.image.stringValue}
          />
        </div>
        <div className="card-content">
          <span className="card-title activator grey-text text-darken-4">
            {props.payload.fields.header.stringValue}
          </span>
        </div>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">
            {props.payload.fields.header.stringValue}
            <i className="material-icons right">close</i>
          </span>
          <p>{props.payload.fields.description.stringValue}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;

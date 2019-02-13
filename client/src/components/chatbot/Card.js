import React from "react";

const Card = props => {
  return (
    <div>
      <div className="card">
        <div className="card-image" style={{ width: 240 }}>
          <img
            alt={props.payload.fields.header.stringValue}
            src={props.payload.fields.image.stringValue}
          />
          <span className="card-title">
            {props.payload.fields.header.stringValue}
          </span>
        </div>
        <div className="card-content">
          {props.payload.fields.description.stringValue}
        </div>
      </div>
    </div>
  );
};

export default Card;

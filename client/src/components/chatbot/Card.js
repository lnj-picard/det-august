import React, { Component } from "react";

const Card = props => {
  return (
    <div style={{ width: 270, paddingRight: 30, height: 270, float: "left" }}>
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

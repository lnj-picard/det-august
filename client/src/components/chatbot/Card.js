import React from "react";

//card answers styling
const Card = props => {
  return (
    <div style={{ height: 530, paddingRight: 30, width: 300, float: "left" }}>
      <div className="card" style={{ height: "100%" }}>
        <div className="card-image" style={{ width: "100%" }}>
          <img
            src={props.payload.fields.image.stringValue}
            alt="exposition clues for august"
          />
          <span className="card-title">
            {props.payload.fields.header.stringValue}
          </span>
        </div>
        <div className="card-content">
          <p style={{ textAlign: "justify" }}>
            {props.payload.fields.description.stringValue}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;

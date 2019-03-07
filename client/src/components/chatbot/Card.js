import React from "react";

//card answers styling
const Card = props => {
  return (
    <div className="card" style={{ width: "30%" }}>
      <div className="card-image">
        <img src={props.payload.fields.image.stringValue} />
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
  );
};

export default Card;

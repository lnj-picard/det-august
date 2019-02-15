import React from "react";

const Message = props => {
  return (
    <div className="col s12 m8 offset-m2 l6 offset-l3">
      <div className="card-panel z-depth-0" style={{ padding: 0 }}>
        {props.speaks === "August" && (
          <div className="col s12">
            <p className="center-align">{props.speaks}</p>
          </div>
        )}
        {props.speaks === "User" && (
          <div className="col s12">
            <p className="center-align">{props.speaks}</p>
          </div>
        )}
        <div className="col s10 offset-s2">
          <p className="black-text center-align">{props.text}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;

import React from "react";

const Message = props => {
  return (
    <div className="col s12 m8 offset-m2 l6 offset-l3">
      <div className="card-panel z-depth-0" style={{ padding: 0 }}>
        {props.speaks === "August" && (
          <div className="col s12">
            <img
              style={{ width: 70 }}
              src="https://i.postimg.cc/8kXtpgDp/logo.png"
              alt="august-logo"
            />
          </div>
        )}
        {props.speaks === "User" && (
          <div className="col s12">
            <img
              className="right"
              style={{ width: 60, marginBottom: 10 }}
              src="https://i.postimg.cc/gjczN6rW/Asset-2.png"
              alt="user-logo"
            />
          </div>
        )}
        <div className="col s10 offset-s2" style={{ clear: "both" }}>
          <p
            className={
              "black-text " +
              (props.speaks === "August" ? "left-align" : "right-align")
            }
          >
            {props.text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Message;

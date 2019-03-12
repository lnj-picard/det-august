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
              alt="logo August"
            />
          </div>
        )}
        {props.speaks === "User" && (
          <div className="col s12">
            <img
              className="right"
              style={{ width: 70, marginBottom: "7px" }}
              src="https://i.postimg.cc/jqDHxr01/585e4bf3cb11b227491c339a.png"
              alt="logo user"
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

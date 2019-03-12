import React from "react";

//return quickreplies from df
const QuickReply = props => {
  if (props.reply.structValue.fields.payload) {
    return (
      <button
        href=""
        style={{ width: "100%", marginBottom: 3, height: "auto" }}
        className="btn z-depth-0 grey darken-3"
        onClick={() =>
          props.click(
            props.reply.structValue.fields.payload.stringValue,
            props.reply.structValue.fields.text.stringValue
          )
        }
      >
        {props.reply.structValue.fields.text.stringValue}
      </button>
    );
  } else {
    return (
      <a
        style={{ margin: 3 }}
        className="btn"
        href={props.reply.structValue.fields.link.stringValue}
      >
        {props.reply.structValue.fields.text.stringValue}
      </a>
    );
  }
};

export default QuickReply;

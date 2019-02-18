import React from "react";

const QuickReply = props => {
  if (props.reply.structValue.fields.payload) {
    return (
      <a
        style={{ margin: 3, backgroundColor: "#b2c6c5" }}
        className="btn z-depth-0"
        onClick={() =>
          props.click(
            props.reply.structValue.fields.payload.stringValue,
            props.reply.structValue.fields.text.stringValue
          )
        }
      >
        {props.reply.structValue.fields.text.stringValue}
      </a>
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

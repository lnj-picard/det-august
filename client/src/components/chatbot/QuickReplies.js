import React, { Component } from "react";
import QuickReply from "./QuickReply";

class QuickReplies extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(payload, text) {
    this.props.replyClick(payload, text);
  }

  renderQuickReply(reply, i) {
    return <QuickReply key={i} click={this.handleClick} reply={reply} />;
  }

  renderQuickReplies(quickReplies) {
    if (quickReplies) {
      return quickReplies.map((reply, i) => {
        return this.renderQuickReply(reply, i);
      });
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="col s12 m8 offset-m2 l6 offset-l3">
        <div className="card-panel z-depth-0" style={{ padding: 0 }}>
          <div className="col s12">
            <img
              style={{ width: 70 }}
              src="https://i.postimg.cc/8kXtpgDp/logo.png"
              alt="logo august"
            />
          </div>
          <div className="col s10 offset-s2">
            {this.props.text && <p>{this.props.text.stringValue}</p>}
            <div>{this.renderQuickReplies(this.props.payload)}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default QuickReplies;

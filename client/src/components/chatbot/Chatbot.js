import React, { Component } from "react";
import axios from "axios/index";

import Message from "./Message";
import Card from "./Card";
import List from "./List";
import QuickReplies from "./QuickReplies";

class Chatbot extends Component {
  messagesEnd;
  talkInput;

  constructor(props) {
    super(props);

    this.handleQuickReplyPayload = this.handleQuickReplyPayload.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);

    this.state = {
      messages: [],
      count: 10
    };
  }

  //handle text input from user
  async df_text_query(queryText) {
    let msg;
    let says = {
      speaks: "User",
      msg: {
        text: {
          text: queryText
        }
      }
    };

    this.setState({ messages: [...this.state.messages, says] });
    const res = await axios.post("api/df_text_query", {
      text: queryText
    });

    if (
      res.data.action !== "DefaultWelcomeIntent.DefaultWelcomeIntent-yes" &&
      res.data.action !== "input.unknown"
    ) {
      this.setState({ count: this.state.count - 1 });
    }

    if (res.data.fulfillmentMessages) {
      for (let i = 0; i < res.data.fulfillmentMessages.length; i++) {
        msg = res.data.fulfillmentMessages[i];
        says = {
          speaks: "August",
          msg: msg
        };
        this.setState({ messages: [...this.state.messages, says] });
      }
    }
  }

  //handle events from user
  async df_event_query(eventName) {
    const res = await axios.post("/api/df_event_query", {
      event: eventName
    });
    let msg,
      says = {};
    if (res.data.fulfillmentMessages) {
      for (let i = 0; i < res.data.fulfillmentMessages.length; i++) {
        msg = res.data.fulfillmentMessages[i];
        says = {
          speaks: "August",
          msg: msg
        };
        this.setState({ messages: [...this.state.messages, says] });
      }
    }
  }

  //set up welcome message
  componentDidMount() {
    this.df_event_query("Welcome");
  }

  //update chatbot visual after answer
  componentDidUpdate() {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });

    if (this.talkInput) {
      this.talkInput.focus();
    }
  }

  handleQuickReplyPayload(payload, text) {
    this.df_text_query(text);
  }

  renderCards(cards) {
    return cards.map((card, i) => <Card key={i} payload={card.structValue} />);
  }

  renderLists(lists) {
    return lists.map((list, i) => <List key={i} payload={list.structValue} />);
  }

  renderOneMessage(message, i) {
    if (message.msg && message.msg.text && message.msg.text.text) {
      return (
        <Message key={i} speaks={message.speaks} text={message.msg.text.text} />
      );
    } else if (message.msg && message.msg.payload.fields.cards) {
      return (
        <div key={i}>
          <div className="card-panel z-depth-0">
            <div style={{ overflow: "hidden" }}>
              <div className="col s2">
                <a className="btn-floating btn-large waves-effect waves-light red">
                  {message.speaks}
                </a>
              </div>
              <div style={{ overflow: "auto", overflowY: "scroll" }}>
                <div
                  style={{
                    width: "80%"
                  }}
                >
                  {this.renderCards(
                    message.msg.payload.fields.cards.listValue.values
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (message.msg && message.msg.payload.fields.lists) {
      return (
        <div key={i}>
          <div className="card-panel z-depth-0">
            <div style={{ overflow: "hidden" }}>
              <div className="col s2">
                <a className="btn-floating btn-large waves-effect waves-light red">
                  {message.speaks}
                </a>
              </div>
              <div style={{ overflow: "auto", overflowY: "scroll" }}>
                <div
                  style={{
                    height: "auto",
                    width: "80%"
                  }}
                >
                  {this.renderLists(
                    message.msg.payload.fields.lists.listValue.values
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (
      message.msg &&
      message.msg.payload &&
      message.msg.payload.fields &&
      message.msg.payload.fields.quick_replies
    ) {
      return (
        <QuickReplies
          text={
            message.msg.payload.fields.text
              ? message.msg.payload.fields.text
              : null
          }
          key={i}
          replyClick={this.handleQuickReplyPayload}
          speaks={message.speaks}
          payload={message.msg.payload.fields.quick_replies.listValue.values}
        />
      );
    }
  }

  //handle messages
  renderMessages(returnedMessages) {
    if (returnedMessages) {
      return returnedMessages.map((message, i) => {
        return this.renderOneMessage(message, i);
      });
    } else {
      return null;
    }
  }

  handleKeyPress(e) {
    if (e.key === "Enter") {
      if (this.state.count > 0) {
        this.df_text_query(e.target.value);
        e.target.value = "";
      } else {
        this.df_event_query("Gameover");
      }
    }
  }

  render() {
    return (
      <div className="">
        <div
          id="chatbot"
          style={{
            height: "100%",
            width: "100%",
            overflow: "auto"
          }}
        >
          {this.renderMessages(this.state.messages)}
          <div
            style={{ float: "left", clear: "both" }}
            ref={el => {
              this.messagesEnd = el;
            }}
          />
        </div>
        <div className=" col s12">
          <input
            style={{
              margin: 0,
              paddingLeft: "1%",
              paddingRight: "1%",
              width: "90%"
            }}
            ref={input => {
              this.talkInput = input;
            }}
            placeholder="type a message:"
            onKeyPress={this.handleKeyPress}
            id="user_says"
            type="text"
          />
          <span style={{ float: "right", marginRight: "3%" }}>
            <p>{this.state.count}</p>
          </span>
        </div>
      </div>
    );
  }
}

export default Chatbot;

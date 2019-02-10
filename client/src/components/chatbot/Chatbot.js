import React, { Component } from "react";
import axios from "axios/index";
import Cookies from "universal-cookie";
import { v4 as uuid } from "uuid";

import Message from "./Message";
import Card from "./Card";
import QuickReplies from "./QuickReplies";

//set up cookies
const cookies = new Cookies();

class Chatbot extends Component {
  messagesEnd;
  talkInput;

  constructor(props) {
    super(props);

    this.handleQuickReplyPayload = this.handleQuickReplyPayload.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);

    this.state = {
      messages: []
    };

    if (cookies.get("userID") === undefined) {
      cookies.set("userID", uuid(), { path: "/" });
    }
  }

  //handle text input from user
  async df_text_query(queryText) {
    let msg;
    let says = {
      speaks: "user",
      msg: {
        text: {
          text: queryText
        }
      }
    };

    this.setState({ messages: [...this.state.messages, says] });
    const res = await axios.post("api/df_text_query", {
      text: queryText,
      userID: cookies.get("userID")
    });

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
      event: eventName,
      userID: cookies.get("userID")
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

  renderOneMessage(message, i) {
    if (message.msg && message.msg.text && message.msg.text.text) {
      return (
        <Message key={i} speaks={message.speaks} text={message.msg.text.text} />
      );
    } else if (message.msg && message.msg.payload.fields.cards) {
      return (
        <div key={i}>
          <div className="card-panel grey lighten-5 z-depth-1">
            <div style={{ overflow: "hidden" }}>
              <div className="col s2">
                <a className="btn-floating btn-large waves-effect waves-light red">
                  {message.speaks}
                </a>
              </div>
              <div style={{ overflow: "auto", overflowY: "scroll" }}>
                <div
                  style={{
                    height: 300,
                    width:
                      message.msg.payload.fields.cards.listValue.values.length *
                      270
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
      this.df_text_query(e.target.value);
      e.target.value = "";
    }
  }

  render() {
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          bottom: 0,
          right: 0
        }}
      >
        <nav>
          <div className="nav-wrapper">
            <a className="brand-logo">August</a>
          </div>
        </nav>

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
              width: "98%"
            }}
            ref={input => {
              this.talkInput = input;
            }}
            placeholder="type a message:"
            onKeyPress={this.handleKeyPress}
            id="user_says"
            type="text"
          />
        </div>
      </div>
    );
  }
}

export default Chatbot;

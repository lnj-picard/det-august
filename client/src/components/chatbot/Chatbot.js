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
      count: 7
    };
  }

  //get df answer after user text query
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

    //update count if users ask relevent q about the murder
    if (
      res.data.action !== "DefaultWelcomeIntent.DefaultWelcomeIntent-yes" &&
      res.data.action !== "input.unknown" &&
      res.data.action !== "investigation_over.investigation_over-custom"
    ) {
      this.setState({ count: this.state.count - 1 });
    }

    //empty messages when user guesses a culprit
    if (res.data.action === "investigation_over.investigation_over-custom") {
      this.setState({ messages: [] });
    }

    //update state with bot message
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

  //trigger df event
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

    //trigger gameover event when count hits 0
    if (this.state.count === 0) {
      this.df_event_query("Gameover");
      this.setState({ count: this.state.count - 1 });
    }
  }

  //send queries when user choses one of the quick reply options
  handleQuickReplyPayload(payload, text) {
    /* le dernier evenement avant gameover va être envoyé avec l'option des différents indices à poursuivre.
    je suis pas sure de comment enlever cette partie d'une réponse parce que le tout (texte + options) est envoyé ensemble.
    du coup soit je dois repenser la façon dont je compose l'obj réponse dans df ou trouver un moyen d'intercepter les options avant qu'elles soient affichées ?
    en attendant j'ai mis une alert + une manip de state.count pour empêcher le user de cliquer (et donc tricher) quand le nbr de questions est épuisé */

    //block the game when gameover event is triggered
    if (
      this.state.count === -1 &&
      payload !== "guess_culprit" &&
      payload !== "guess_right"
    ) {
      alert(
        "You failed this round, August is very disappointed. Refresh the page to start again."
      );
      //keep the game going if user gets the right culprit
    } else if (payload === "guess_right") {
      this.setState({ count: this.state.count - 1 });
      this.df_text_query("Lord Ragland killed Courtney Allen");
    } else {
      this.df_text_query(text);
    }
  }

  //render different types of custom payload from df
  renderCards(cards) {
    return cards.map((card, i) => <Card key={i} payload={card.structValue} />);
  }

  renderLists(lists) {
    return lists.map((list, i) => <List key={i} payload={list.structValue} />);
  }

  renderMessages(returnedMessages) {
    if (returnedMessages) {
      return returnedMessages.map((message, i) => {
        return this.renderOneMessage(message, i);
      });
    } else {
      return null;
    }
  }

  renderOneMessage(message, i) {
    if (message.msg && message.msg.text && message.msg.text.text) {
      return (
        <Message key={i} speaks={message.speaks} text={message.msg.text.text} />
      );
    } else if (message.msg && message.msg.payload.fields.cards) {
      return (
        <div key={i}>
          <div
            className="card-panel z-depth-0"
            style={{ paddingLeft: 0, paddingRight: 0 }}
          >
            <div style={{ overflow: "hidden" }}>
              <div className="col s12">
                <img
                  style={{ width: 70 }}
                  src="https://i.postimg.cc/8kXtpgDp/logo.png"
                  alt="logo august"
                />
              </div>
              <div
                style={{
                  overflow: "auto",
                  overflowY: "scroll",
                  height: "630px"
                }}
              >
                <div
                  style={{
                    width:
                      message.msg.payload.fields.cards.listValue.values.length *
                      300
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
          <div
            className="card-panel z-depth-0"
            style={{ paddingLeft: 0, paddingRight: 0 }}
          >
            <div style={{ overflow: "hidden" }}>
              <div className="col s12">
                <img
                  style={{ width: 70 }}
                  src="https://i.postimg.cc/8kXtpgDp/logo.png"
                  alt="logo august"
                />
              </div>
              <div style={{ overflow: "auto", overflowY: "scroll" }}>
                {this.renderLists(
                  message.msg.payload.fields.lists.listValue.values
                )}
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

  //send queries when user presses enter
  handleKeyPress(e) {
    if (e.key === "Enter" && e.target.value !== "") {
      this.df_text_query(e.target.value);
    }
  }

  //send queries to df when send btn clicked
  sendQuery = () => {
    if (this.talkInput.value !== "") {
      this.df_text_query(this.talkInput.value);
    }
  };

  //send the exposition at the begining of the game
  getOgClues = () => {
    this.df_event_query("exposition");
    this.talkInput.value = "";
  };

  render() {
    return (
      <div className="container" style={{ marginBottom: 50 }}>
        <div
          id="chatbot"
          style={{
            height: "100%",
            width: "100%",
            overflow: "auto",
            marginTop: 20
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
        {this.state.count > 0 ? (
          <>
            <div className=" col s12">
              <input
                style={{ borderBottom: "2px solid #ffff8d" }}
                ref={input => {
                  this.talkInput = input;
                }}
                placeholder="type a message:"
                onKeyPress={this.handleKeyPress}
                id="user_says"
                type="text"
              />

              <div className="col s12">
                {this.state.count === 1 ? (
                  <h6>This is your very last question, use it wisely</h6>
                ) : (
                  ""
                )}
                <p>{this.state.count} questions left</p>
                <button
                  className="btn waves-effect waves-light black"
                  style={{ margin: 3 }}
                  onClick={this.sendQuery.bind(this)}
                >
                  Send
                  <i className="material-icons right">send</i>
                </button>
                <button
                  className="btn waves-effect waves-light black"
                  onClick={this.getOgClues.bind(this)}
                >
                  Tell me the clues again
                  <i className="material-icons right">send</i>
                </button>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Chatbot;

import React, { Component } from 'react';
import axios from "axios/index";
import Cookies from 'universal-cookie';
import { v4 as uuid } from 'uuid';

import Message from './Message';

const cookies = new Cookies();


class Chatbot extends Component {
	messagesEnd;
	talkInput;

	constructor(props) {
		super(props);

		this.handleKeyPress = this.handleKeyPress.bind(this);

		this.state = {
			messages: []
		}

		if (cookies.get('userID') === undefined) {
			cookies.set('userID', uuid(), { path: '/' });
		}
	}

	async df_text_query(queryText) {
		let msg;
		let says = {
			speaks: 'user',
			msg: {
				text: {
					text: queryText
				}
			}
		};

		this.setState({messages: [...this.state.messages, says]});
		const res = await axios.post('api/df_text_query', {text: queryText, userID: cookies.get('userID')});

		if (res.data.fulfillmentMessages ) {
			for (let i = 0; i < res.data.fulfillmentMessages.length; i++) {
				msg = res.data.fulfillmentMessages[i];
				says = {
					speaks: 'August',
					msg: msg
				}
				this.setState({ messages: [...this.state.messages, says]});
			}
		}
	}


    async df_event_query(eventName) {
        const res = await axios.post('/api/df_event_query',  {event: eventName, userID: cookies.get('userID')});
        let msg, says = {};
        if (res.data.fulfillmentMessages ) {
            for (let i=0; i<res.data.fulfillmentMessages.length; i++) {
                msg = res.data.fulfillmentMessages[i];
                says = {
                    speaks: 'August',
                    msg: msg
                }
                this.setState({ messages: [...this.state.messages, says]});
            }
        }
    };

	componentDidMount() {
		this.df_event_query('Welcome');
	}

	componentDidUpdate() {
		this.messagesEnd.scrollIntoView({ behavior: "smooth" });

		if ( this.talkInput ) {
				this.talkInput.focus();
		}
	}

	renderMessages(stateMessages) {
		if(stateMessages) {
			return stateMessages.map((message, i) => {
				return <Message key={i} speaks={message.speaks} text={message.msg.text.text} />;
			});
		} else {
			return null;
		}
	}

	handleKeyPress(e) {
		if(e.key === 'Enter') {
			this.df_text_query(e.target.value);
			e.target.value = '';
		}
	}

	render() {
		return (
			<div style={{ height: 400, width:400, float: 'right'}}>
				<div id="chatbot"  style={{ height: '100%', width:'100%', overflow: 'auto'}}>
					<h2>Chatbot</h2>
					{this.renderMessages(this.state.messages)}
					<div style={{ float:"left", clear: "both" }} ref={(el) => { this.messagesEnd = el; }}></div>
				</div>
				<input type="text" ref={(input) => { this.talkInput = input; }} onKeyPress={this.handleKeyPress} />
			</div>
		);
	}
}

export default Chatbot;

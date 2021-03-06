import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./Header";
import About from "./pages/About";
import Rules from "./pages/Rules";
import Chatbot from "./chatbot/Chatbot";

//front end app
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <>
            <Header />
            <Route exact path="/" component={Chatbot} />
            <Route path="/about" component={About} />
            <Route path="/rules" component={Rules} />
          </>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

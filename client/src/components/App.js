import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./Header";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Chatbot from "./chatbot/Chatbot";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <div>
            <Header />
            <Route exact path="/" component={Chatbot} />
            <Route path="/about" component={About} />
          </div>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

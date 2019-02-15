import React, { Component } from "react";
import M from "../../node_modules/materialize-css/dist/js/materialize.min.js";
import { Link, NavLink } from "react-router-dom";

//header component
class Header extends Component {
  componentDidMount() {
    const elem = document.querySelector(".sidenav");
    const instance = M.Sidenav.init(elem, {
      edge: "left",
      inDuration: 250
    });
  }

  render() {
    return (
      <>
        <nav>
          <div className="nav-wrapper">
            <a href="#" className="brand-logo">
              August
            </a>
            <a href="#" data-target="mobile-demo" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <a href="">Home</a>
              </li>
              <li>
                <a href="">About the game</a>
              </li>
              <li>
                <a href="">Notes</a>
              </li>
            </ul>
          </div>
        </nav>
        <ul className="sidenav" id="mobile-demo">
          <li>
            <a href="">Home</a>
          </li>
          <li>
            <a href="">About the game</a>
          </li>
          <li>
            <a href="">Notes</a>
          </li>
        </ul>
      </>
    );
  }
}

export default Header;

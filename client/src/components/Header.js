import React, { Component } from "react";
import M from "../../node_modules/materialize-css/dist/js/materialize.min.js";
import { Link } from "react-router-dom";

class Header extends Component {
  //mobile navigation
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
        <nav className="z-depth-0">
          <div className="nav-wrapper yellow darken-3">
            <a href="#" className="brand-logo">
              August
            </a>
            <a href="#" data-target="mobile-demo" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <Link to="/">August</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </div>
        </nav>
        <ul className="sidenav" id="mobile-demo">
          <li>
            <Link to="/">August</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </>
    );
  }
}

export default Header;

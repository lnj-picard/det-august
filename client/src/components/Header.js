import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

//header component
class Header extends Component {
	render() {
		return (
      <nav className="nav-wrapper">
				<Link to={'/'} className="brand-logo">August</Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
					<li><NavLink to={'/'}>Home</NavLink></li>
          <li><NavLink to={'/about'}>About the game</NavLink></li>
        </ul>
			</nav>
		)
	}
}

export default Header;
